// 

// IMPORT FROM helpers.js
import { isLogin, logout } from "./helpers.js";

const loginBtnEl = document.getElementById("loginBtn")
const logoutBtnEl = document.getElementById("logoutBtn")

const checkLogin = () => {
  if(isLogin()) {
    loginBtnEl.classList.add('d-none')
    logoutBtnEl.classList.remove('d-none')
  }
}

window.onload = checkLogin()

loginBtnEl.addEventListener('click', () => {window.location.href = "../login.html"})

logoutBtnEl.addEventListener('click', () => {
  let isTrue = confirm("Anda yakin ingin logout?");
  if(isTrue) {
    logout()
  }
})