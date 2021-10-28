// 

// IMPORT FROM helpers.js
import { isLogin, logout, getUser, getProducts } from "./helpers.js";

const loginBtnEl = document.getElementById("loginBtn")
const logoutBtnEl = document.getElementById("confirmLogout")
const accountMenuEl = document.getElementById("account-menu")
const belanjaBtnEl = document.querySelectorAll(".belanja")
const modalEl = new bootstrap.Modal(document.getElementById('shouldLoginModal'), {
  keyboard: false
})
const newProdductListEl = document.getElementById("newProductList")

const checkLogin = () => {
  if(isLogin()) {
    let user = getUser()
    loginBtnEl.classList.add('d-none')
    accountMenuEl.classList.remove('d-none')
  }
}

window.onload = checkLogin()

// LOGIN BUTTON CLICK
loginBtnEl.addEventListener('click', () => {window.location.href = "../login.html"})

// LOGOUT
logoutBtnEl.addEventListener('click', () => {
  logout()
})

belanjaBtnEl.forEach(belanjaBtn => {
  belanjaBtn.addEventListener('click', () => {
    // if(!isLogin()) {
    //   modalEl.toggle()
    // } else {
      let dest = belanjaBtn.getAttribute("data-kategori")
      location.href = `kategori/kategori.html#${dest}`
    // }
  })
})


// RENDER PRODUCT TO INDEX
const createProductElement = (product) => {
  const colEl = document.createElement('div')
  colEl.classList.add("col-lg-3", "col-md-4", "col-10")
  
  const productCardEl = `
  <div class="card">
    <img src="${product.img}" class="card-img-top" alt="${product.name}" height="200rem">
    <div class="card-body text-center" data-id="${product.id}">
      <h5 class="card-title text-center my-2"><a href="deskripsi barang/deskripsi.html?data-id=${product.id}" class="text-dark text-decoration-none">${product.name}</a></h5>
      <p class="text-orange mb-2"><small><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="far fa-star"></i></small></p>
      <p>Rp${new Intl.NumberFormat("id-ID").format(product.harga)}</p>
      <a class="btn btn-sm btn-success beli w-25 my-1">Beli</a>
    </div>
  </div>
    `

  colEl.insertAdjacentHTML('beforeend', productCardEl)
  newProdductListEl.append(colEl)
}

const renderproducts = async () => {
  // EDIT HERE
  let products = await getProducts()
  products.slice(-5,-1).map(async (product) => {
    createProductElement(product);
  })
  
  const beliBtnEl = document.querySelectorAll(".beli")
  
  beliBtnEl.forEach(beliBtn => {
    beliBtn.addEventListener('click', () => {
      if(!isLogin()) {
        modalEl.toggle()
      } else {
        let id = beliBtn.parentNode.getAttribute("data-id")
        location.href = `deskripsi barang/deskripsi.html?data-id=${id}`
      }
    })
  })

};

renderproducts()
  
