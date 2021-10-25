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
    if(!isLogin()) {
      modalEl.toggle()
    }
  })
})


// RENDER PRODUCT TO INDEX
const createProductElement = (product) => {
  const colEl = document.createElement('div')
  colEl.classList.add("col-lg-3")
  
  const productCardEl = `
  <div class="card">
    <div class="card-body text-center">
      <small class="d-none" id="idProduct" data-id=${product.id}></small>
      <img src="${product.img}" class="card-img-top rounded-3" alt="Tomatoes">
      <h5 class="card-title text-center mt-3 mb-2">${product.name}</h5>
      <h6 class="mb-2">Rp${new Intl.NumberFormat("id-ID").format(product.harga)}</h6>
      <p class="text-primary"><small><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="far fa-star"></i></small></p>
      <a class="btn btn-sm btn-success beli">Beli</a>
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
      }
    })
  })

};

renderproducts()
  
