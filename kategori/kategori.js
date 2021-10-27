import { isLogin, getProducts, getKeranjang, setKeranjang } from "../js/helpers.js";

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


const sayuranProductCardEl = document.getElementById("kategori-sayuran")
const sembakoProductCardEl = document.getElementById("kategori-sembako")

const createProductElement = (product) => {

  const colEl = document.createElement('div')
  colEl.classList.add("col-lg-3", "col-md-4", "col-10")

  const productEl = `
    <div class="card">
      <img
        src="${product.img}"
        height="200rem" class="card-img-top" alt="${product.name}">
      <div class="card-body" data-id=${product.id}>
        <h5 class="card-title"><a class="text-decoration-none text-dark" href="/deskripsi barang/deskripsi.html?data-id=${product.id}">${product.name}</a></h5>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="far fa-star checked"></span>
        <p class="card-text">Rp. ${new Intl.NumberFormat("id-ID").format(product.harga)}</p>
        <!-- quantity -->
        <div class="quantity buttons_added">
          <input type="button" value="-" class="minus"><input type="number" step="1" min="1" max="" name="quantity"
            value="1" title="Qty" class="input-text qty text" size="4" pattern="" inputmode=""><input type="button"
            value="+" class="plus">
        </div>
        <br></br>
        <a class="btn btn-success addKeranjang">Tambah ke Keranjang</a>
      </div>
    </div>
  `

   colEl.insertAdjacentHTML('beforeend', productEl)
   return colEl
}

const modalEl = new bootstrap.Modal(document.getElementById('shouldLoginModal'), {
  keyboard: false
})

const renderproducts = async () => {
  let allProducts = await getProducts()
  let allSayuran = allProducts.filter(product => product.kategori === "Sayuran")
  let allSembako = allProducts.filter(product => product.kategori === "Sembako")

  allSayuran.map((productSayuran) => {
    let productSayuranEl = createProductElement(productSayuran)
    sayuranProductCardEl.append(productSayuranEl)
  });
  allSembako.map((productSembako) => {
    let productSembakoEl = createProductElement(productSembako)
    sembakoProductCardEl.append(productSembakoEl)
  });

  const btnKeranjangEl = document.querySelectorAll(".addKeranjang")

  btnKeranjangEl.forEach(btnKeranjang => {
    btnKeranjang.addEventListener('click', () => {
      if(!isLogin()) {
        modalEl.toggle()
      } else {
        let parent = btnKeranjang.parentNode
        let newKeranjang = {
          productId: Number(parent.getAttribute("data-id")),
          qty: Number(parent.querySelector(".qty").value)
        }

        setKeranjang(newKeranjang)

        let toast = document.querySelector(".toast-container")
        toast.classList.remove("d-none")
        new bootstrap.Toast(document.querySelector('#basicToast')).show();

        // console.log(getKeranjang());
        let badgeEl = document.getElementById("isiKeranjang")
        badgeEl.classList.remove("d-none")
        
      }
    })
  })
}

renderproducts()