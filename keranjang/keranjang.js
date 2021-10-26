import { getKeranjang, getProducts, getProductById, delTempData, setTempData } from "../js/helpers.js";

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


const tblProductListEl = document.getElementById("tbl-product-list")

const createProductEl = (product, count, qty) => {
  const tblRow = document.createElement("tr")
  tblRow.setAttribute("data-id", product.id)

  const rowData = `
    <th scope="row">${count}</th>
    <td>${product.name}</td>
    <td>
      <div class="quantity buttons_added">
        <input type="button" value="-" class="minus" /><input type="number" step="1" min="1" max=""
          name="quantity" value="${qty}" title="Qty" class="input-text qty text" size="4" pattern=""
          inputmode="" /><input type="button" value="+" class="plus" />
    </td>
    <td>Rp. ${new Intl.NumberFormat("id-ID").format(product.harga*qty)}</td>
    <td>
      <form action="/action_page.php">
        <input type="checkbox" class="chooseProduct" />
      </form>
    </td>
  `

  tblRow.insertAdjacentHTML('beforeend', rowData)
  tblProductListEl.append(tblRow)
}

const renderKeranjang = async () => {
  let products = await getProducts()
  let allKeranjang = getKeranjang()
  let count = 0

  allKeranjang.map(row => {
    let keranjang = products.find(product => product.id == row.productId)
    
    count +=1
    createProductEl(keranjang, count, row.qty)
  })

  // let allQtyEl = document.querySelectorAll(".qty")
  // allQtyEl.forEach(qtyEl => addEventClickPlus(qtyEl))
  let beliSekarang = document.getElementById("beli-sekarang")
  beliSekarang.addEventListener('click', () => {
    let allCheckbox = document.querySelectorAll(".chooseProduct")
    productToBuy(allCheckbox)

    location.href = "/pembayaran/"
  })

  // allCheckbox.forEach(checkbox => addCheckboxEvent(checkbox))
  
}

const productToBuy = (allCheckbox) => {
  allCheckbox.forEach(checkbox => {
    if(checkbox.checked === true) {
      let data = {
        productId: checkbox.parentElement.parentElement.parentElement.dataset.id,
        qty: checkbox.parentElement.parentElement.parentElement.querySelector(".qty").value
      }
      setTempData(data)
    }
  })
}

// const addCheckboxEvent = (checkbox) => {
//   checkbox.addEventListener('click', () => {
//     if(checkbox.checked == true) {
//       let data = {
//         productId: checkbox.dataset.id,
//         qty: checkbox.parentElement.parentElement.parentElement.querySelector(".qty").value
//       }
//       console.log(data);
//     } else {
//       // delTempData(checkbox.dataset.id)
//       console.log(checkbox.dataset.id);
//     }
//   })
// }

// const addEventClickPlus = (qtyEl) => {
//   qtyEl.addEventListener('change', () => {
//     console.log(qtyEl.value)
//   })
// }

renderKeranjang()