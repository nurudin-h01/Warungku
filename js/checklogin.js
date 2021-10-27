import { isLogin, logout } from "./helpers.js";

const loginBtnEl = document.getElementById("loginBtn")
const logoutBtnEl = document.getElementById("confirmLogout")
const accountMenuEl = document.getElementById("account-menu")

//Login
loginBtnEl.addEventListener('click', () => {window.location.href = "../login.html"})
const checkLogin = () => {
  if(isLogin()) {
    loginBtnEl.classList.add('d-none')
    accountMenuEl.classList.remove('d-none')
  }
}

window.onload = checkLogin()

// LOGOUT
logoutBtnEl.addEventListener('click', () => {
    logout()
  })