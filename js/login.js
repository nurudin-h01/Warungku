
// IMPORT LOGIN MODULE FROM helpers.js
import { 
  isLogin, validateEmail, validatePassword, checkRegisteredEmail, checkPassword, setLocalStorage, getLocalStorage 
} from "./helpers.js";

// IMPORT REGISTER MODULE FROM helpers.js


// CHECK IF USER ALRREADY LOGIN
if(isLogin()) {
  window.location.href = "../index.html"
}

// LOGIN EVENT LISTENER
const formLogin = document.getElementById("loginForm")

if(formLogin) {
  const email = document.getElementById("email")
  const password = document.getElementById("password")

  let elements = {
    email: email,
    password: password,
  }
  
  formLogin.addEventListener("submit", (e) => {
    e.preventDefault()
  
    const isValid = loginValidation(elements)

    if(isValid === true) {
      window.location.href = "index.html"
    }
  })
}

// FUNCTION TO VALIDATE LOGIN
const loginValidation = (elements) => {
  let email = elements.email.value.trim()
  let password = elements.password.value.trim()
  let emailPrevSib = elements.email.previousElementSibling
  let passwordPrevSib = elements.password.previousElementSibling
  
  if(validateEmail(email)) {

    // change input to valid
    elements.email.classList.remove("is-invalid")
    emailPrevSib.classList.remove("border-danger")
    elements.email.classList.add("is-valid")
    emailPrevSib.classList.add("border", "border-success")
    elements.email.parentElement.nextElementSibling.classList.add("d-none")

    if(validatePassword(password)) {

      elements.password.classList.remove("is-invalid")
      passwordPrevSib.classList.remove("border-danger")
      elements.password.parentElement.nextElementSibling.classList.remove("text-danger")
      elements.password.classList.add("is-valid")
      passwordPrevSib.classList.add("border-success")

      if(checkRegisteredEmail(email)) {
        if(checkPassword(email, password)) {
          setLocalStorage("login", email)
          return true
        } else {
          const alert = document.querySelector(".alert")
          alert.insertAdjacentHTML('afterbegin', '<span>Password salah.</span>')
          alert.classList.remove("d-none")
        }
      } else {
        const alert = document.querySelector(".alert")
        alert.insertAdjacentHTML('afterbegin', '<span>Email anda belum terdaftar.</span>')
        alert.classList.remove("d-none")
      }
    } else {
      elements.password.classList.add("is-invalid")
      passwordPrevSib.classList.add("border", "border-danger")
      elements.password.parentElement.nextElementSibling.classList.add("text-danger")
    }
  }
  else {
    elements.email.classList.add("is-invalid")
    emailPrevSib.classList.add("border", "border-danger")
    elements.email.parentElement.nextElementSibling.classList.remove("d-none")
  }
}

// REGISTER EVENT LISTENER
const registFormEl = document.getElementById("registForm")

if(registFormEl) {
  const name = document.getElementById("name")
  const email = document.getElementById("email")
  const password = document.getElementById("password")
  const confirmPass = document.getElementById("konfirmasiPassword")

  const elements = {
    name: name,
    email: email,
    password: password,
    confirmPass: confirmPass,
  }
  
  registFormEl.addEventListener("submit", (e) => {
    e.preventDefault()
    
    let data = {
      name: name.value.trim(),
      email: email.value.trim(),
      password: password.value.trim(),
    }
    
    let isValid = validateRegister(elements, data)

    if(isValid) {
      register(data)
    }
  })
}

const showPasswordEl = document.getElementById("showPassword")
showPasswordEl.addEventListener('click', () => {
  (showPasswordEl.checked)? password.type = "text" : password.type = "password"
})


const register = (data) => {
  let users = getLocalStorage("users")
  
  if(users) {
    users = JSON.parse(users)
    users.push(data)
  } else {
    users = [data]
  }
  
  users = JSON.stringify(users)
  
  setLocalStorage("users", users)
  setLocalStorage("login", data.email)
  window.location.href = '../index.html'
}

const validateRegister = (elements, data) => {
  // GET ALL ELEMENTS NEEDED
  let namePrevSib = elements.name.previousElementSibling
  let emailPrevSib = elements.email.previousElementSibling
  let passwordPrevSib = elements.password.previousElementSibling
  let confirmPassPrevSib = elements.confirmPass.previousElementSibling
  const validName = /.+/

  if(validName.test(data.name)) {
    if(validateEmail(data.email)) {
      
      if(checkRegisteredEmail(data.email)) {
        const alert = document.querySelector(".alert")
        alert.insertAdjacentHTML('afterbegin', '<span>Email ini sudah terdaftar. Silakan login</span>')
        alert.classList.remove("d-none")
        return false
      } else {
        if(validatePassword(data.password)) {
          return true
        } else {
          elements.password.classList.add("is-invalid")
          passwordPrevSib.classList.add("border", "border-danger")
          elements.password.parentElement.nextElementSibling.classList.add("text-danger")
          return false
        }
      }
      
    } else {
      elements.email.classList.add("is-invalid")
      emailPrevSib.classList.add("border", "border-danger")
      elements.email.parentElement.nextElementSibling.classList.remove("d-none")
      return false
    }
  } else {
    elements.name.classList.add("is-invalid")
    namePrevSib.classList.add("border", "border-danger")
    elements.name.parentElement.nextElementSibling.classList.remove("d-none")
    return false
  }
  
}
