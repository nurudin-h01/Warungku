import { isLogin, getProductById, setKeranjang } from "/js/helpers.js";

function wcqib_refresh_quantity_increments() {
  jQuery("div.quantity:not(.buttons_added), td.quantity:not(.buttons_added)").each(function (a, b) {
    var c = jQuery(b);
    c.addClass("buttons_added"), c.children().first().before('<input type="button" value="-" class="minus" />'), c.children().last().after('<input type="button" value="+" class="plus" />');
  });
}
String.prototype.getDecimals ||
  (String.prototype.getDecimals = function () {
    var a = this,
      b = ("" + a).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
    return b ? Math.max(0, (b[1] ? b[1].length : 0) - (b[2] ? +b[2] : 0)) : 0;
  }),
  jQuery(document).ready(function () {
    wcqib_refresh_quantity_increments();
  }),
  jQuery(document).on("updated_wc_div", function () {
    wcqib_refresh_quantity_increments();
  }),
  jQuery(document).on("click", ".plus, .minus", function () {
    var a = jQuery(this).closest(".quantity").find(".qty"),
      b = parseFloat(a.val()),
      c = parseFloat(a.attr("max")),
      d = parseFloat(a.attr("min")),
      e = a.attr("step");
    (b && "" !== b && "NaN" !== b) || (b = 0),
      ("" !== c && "NaN" !== c) || (c = ""),
      ("" !== d && "NaN" !== d) || (d = 0),
      ("any" !== e && "" !== e && void 0 !== e && "NaN" !== parseFloat(e)) || (e = 1),
      jQuery(this).is(".plus") ? (c && b >= c ? a.val(c) : a.val((b + parseFloat(e)).toFixed(e.getDecimals()))) : d && b <= d ? a.val(d) : b > 0 && a.val((b - parseFloat(e)).toFixed(e.getDecimals())),
      a.trigger("change");
  });


// GET PARAMETER FROM URL
const queryString = window.location.search
const urlParams = new URLSearchParams(queryString);
const params = urlParams.get('data-id'); // tempat menampung parameter yang ada

// get ELEMENT HTML
const productNameEl = document.getElementById("judul")
const productImageEl = document.getElementById("product-image")
const productDescEl = document.getElementById("desc")
const productHargaEl = document.getElementById("product-harga")
const productStockEl = document.getElementById("product-stock")
const beliBtnEl = document.getElementById("beli-sekarang")

const renderProduct = async () => {
  const product = await getProductById(params)
  
  productNameEl.textContent = product.name
  productImageEl.setAttribute("src", product.img)
  productDescEl.textContent = product.desc
  productHargaEl.textContent = `Rp ${new Intl.NumberFormat("id-ID").format(product.harga)}`
  productStockEl.append(product.stock)

  beliBtnEl.addEventListener('click', () => {
    if(!isLogin()) {
      modalEl.toggle()
    } else {
      let newKeranjang = {
        productId: Number(product.id),
        qty: Number(document.querySelector("input.qty").value)
      }

      setKeranjang(newKeranjang)

      document.location.href = "/keranjang/keranjang.html"
      
    }
  })
}

renderProduct()