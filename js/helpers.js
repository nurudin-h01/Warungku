
// VALIDATION FUNCTION

// Email validation
export const validateEmail = (email) => {
  const validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

  return validEmail.test(email) ? true : false

}

// Password validation
export const validatePassword = (password) => {
  const validPassword = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}/

  return validPassword.test(password)? true : false
}

// Check for registered email
export const checkRegisteredEmail = (email) => {
  let users = getLocalStorage("users")
  
  if(users) {
    users = JSON.parse(users)
    let isEmailexist = users.find(user => user.email === email)
    
    if(isEmailexist) {
      return true
    } else {
      return false
    }
  } else {
    return false
  }
}

// Check password
export const checkPassword = (email, password) => {
  let users = getLocalStorage("users")
  users = JSON.parse(users)
  
  let user = users.find(user => user.email === email)
  return (user.password === password) ? true : false
}


export const isLogin = () => {
  const isExist = getLocalStorage("login")
  
  return isExist
}

// LOGOUT
export const logout = () => {
  localStorage.removeItem('login')
  window.location.href = "../login.html"
}



// WEB STORAGE SET AND GET
export const setLocalStorage = (key, value) => {
  localStorage.setItem(key, value)
}

export const getLocalStorage = (key) => {
  return localStorage.getItem(key)
}
