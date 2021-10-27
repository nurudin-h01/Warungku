
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
  location.href = window.location.origin
}



// WEB STORAGE SET AND GET
export const setLocalStorage = (key, value) => {
  localStorage.setItem(key, value)
}

export const getLocalStorage = (key) => {
  return localStorage.getItem(key)
}


// GET USER DATA
export const getUser = () => {
  let email = getLocalStorage("login")
  let users = JSON.parse(getLocalStorage("users"))
  let user = users.find(user => user.email === email)
  return user
}

// GET KERANJANG DATA
export const getKeranjang = () => {
  let keranjang = getLocalStorage("keranjang")
  keranjang = JSON.parse(keranjang)
  return keranjang
}

export const setKeranjang = (products) => {
  let allKeranjang = getKeranjang()
  let keranjangValue;
  if(allKeranjang) {
    let productIndex = allKeranjang.findIndex(element => element.productId === products.productId)
    if(productIndex >= 0) {
      allKeranjang[productIndex].qty += products.qty
    } else {
      allKeranjang.push(products)
    }
    keranjangValue = allKeranjang
  } else {
    keranjangValue = [products]
  }

  setLocalStorage("keranjang", JSON.stringify(keranjangValue))
}

export const updateKeranjang = products => {
  let allKeranjang = getKeranjang()
  
  let productIndex = allKeranjang.findIndex(element => element.productId === products.productId)
  allKeranjang[productIndex].qty = products.qty
  
  setLocalStorage("keranjang", JSON.stringify(allKeranjang))
}

// TEMPORARY DATA AFTER KERANJANG CHOOSE
export const getTempData = () => {
  let tempData = getLocalStorage("tempData")
  tempData = JSON.parse(tempData)
  return tempData
}

export const setTempData = (data) => {
  // let allTempData = getTempData()
  // let tempDataValue;
  
  // if(allTempData) {
    // let productIndex = allTempData.findIndex(element => element.productId === data.productId)
    
    // if(productIndex >= 0) {
    //   allTempData[productIndex].qty = data.qty
    // } else {
    //   allTempData.push(data)
    // }
    // tempDataValue = allTempData
  // } else {
    // tempDataValue = [data]
  // }
  
  setLocalStorage("tempData", JSON.stringify(data))
}

export const delTempData = (id) => {
  let allTempData = getTempData()
  let productIndex = allTempData.findIndex(element => element.productId === id)
  
  allTempData.slice(productIndex, 1)
  
  setLocalStorage("tempData", JSON.stringify(allTempData))
}

// FETCH API
export const getProducts = async () => {
  // EDIT HERE
  const url = "https://6172fc04110a740017222f15.mockapi.io/products"
  let response = await fetch(url)
  let data = await response.json()
  return data
};

export const getProductById = async (productId) => {
  const url = `https://6172fc04110a740017222f15.mockapi.io/products/${productId}`
  let response = await fetch(url)
  let data = await response.json()
  return data
}

export const getTestimoniByPordId = async(productId) => {
  const url = 'https://6172fc04110a740017222f15.mockapi.io/userReview'
  let response = await fetch(url)
  let data = await response.json()
  let testimoni = data.filter(value => value.prodID == productId)
  return testimoni
}