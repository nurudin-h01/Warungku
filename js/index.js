// 

// IMPORT FROM helpers.js
import { isLogin, logout, getUser, getProducts } from "./helpers.js";

const loginBtnEl = document.getElementById("loginBtn")
const logoutBtnEl = document.getElementById("confirmLogout")
const accountMenuEl = document.getElementById("account-menu")
const belanjaBtnEl = document.querySelectorAll(".belanja")
const beliBtnEl = document.querySelectorAll(".beli")
const modalEl = new bootstrap.Modal(document.getElementById('shouldLoginModal'), {
  keyboard: false
})

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

beliBtnEl.forEach(beliBtn => {
  beliBtn.addEventListener('click', () => {
    if(!isLogin()) {
      modalEl.toggle()
    }
  })
})

const renderproducts = async () => {
  // EDIT HERE
  let products = await getProducts()
  products.map(async (value) => {
    console.log(value);
  })
  
};

renderproducts()