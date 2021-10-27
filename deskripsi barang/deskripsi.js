import { isLogin, getProductById, setKeranjang, getTestimoniByPordId } from "/js/helpers.js";

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
const modalEl = new bootstrap.Modal(document.getElementById('shouldLoginModal'), {
  keyboard: false
})
const deskripiProdukEl = document.getElementById("deskripsiProduk")
const notFoundEl = document.getElementById("notFound")
const testimoniEl = document.getElementById("testimoni-section")
const testimoniRow = document.getElementById("testimoni")

const renderProduct = async () => {
  const product = await getProductById(params)

  if(product !== "Not found" && product.length === undefined) {
    deskripiProdukEl.classList.remove("d-none")
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

    const testimoni = await getTestimoniByPordId(product.id)
    if(testimoni.length > 0) {
      testimoniEl.classList.remove("d-none")
      testimoni.forEach(element => renderTestimoni(element));
    }
  } else {
    notFoundEl.classList.remove("d-none")
  }
  
}

function renderTestimoni(testimoni) {
  const colEl = document.createElement("div")
  colEl.classList.add("col-12", "col-md-6", "col-lg-4")

  function createRating() {
    let ratingEl = '';
    for(let i=1; i<=5; i++) {
      if(i <= testimoni.rating) {
        ratingEl = ratingEl.concat('<i class="fas fa-star me-1"></i>')
      } else {
        ratingEl = ratingEl.concat('<i class="far fa-star me-1"></i>')
      }
    }
    return ratingEl
  }

  let star = createRating()

  const testimoniCard = `
    <div class="card p-2">
      <div class="card-body">
        <div class="row align-items-center">
          <div class="col-lg-2 col-3">
            <img src="https://cahsi.utep.edu/wp-content/uploads/kisspng-computer-icons-user-clip-art-user-5abf13db5624e4.1771742215224718993529.png" alt="User Profile"class="img-fluid">
          </div>
          <div class="col-lg-10 col-9">
            <h5 class="card-title">${testimoni.name}</h5>
            <p class="card-text text-muted fs-6"><small>${testimoni.createdDate}</small></p>
          </div>
        </div>
        <div class="row mt-3">
          <div class="col-12">
            <p class="fs-6">${testimoni.review}</p>
            <p class="text-orange mb-1 fs-6"><small>${star}</p>
          </div>
        </div>
      </div>
    </div>
  `

  colEl.insertAdjacentHTML('beforeend', testimoniCard)
  testimoniRow.append(colEl)
}

renderProduct()