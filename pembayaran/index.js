
// element form
let elNama = document.querySelector('#namaLengkap')
let elAlamat = document.querySelector('#alamat')
let elNomorTelepon = document.querySelector("#nomorTelepon")
let elkirim = document.querySelector('#pengiriman')
let deliveryPrice = document.querySelector('.delivery-price')
let delivery = document.querySelector('.delivery')
let alertshow = document.querySelector('.alert-danger')
let subtotal = document.querySelector('.subtotal')

// element button
let elBtnpage1 = document.querySelector('#btnSubmit1')
let elBtnpage2 = document.querySelector("#btnSubmit2")
let btnToast = document.querySelector('#basicToastBtn')
let elbtnpre1 = document.querySelector('#previous1')
let elbtnpre2 = document.querySelector('#previous2')
let elbtnpre3 = document.querySelector('#previous3')

// element button tab
let elTabMetode = document.querySelector('#metodePembayaran')
let elTabPengiriman = document.querySelector('#dataPengiriman')
let elReview = document.querySelector('#review')

// element content tiap tab
let elTabData = document.querySelector('#tabDataPengiriman')
let elTabMetodePembayaran = document.querySelector('#tabMetodePembayaran')



// element content tab 2
let elTabEWallet = document.querySelector('#e-wallet')
let elTabAtm = document.querySelector('#atm')
let elEwalletContent = document.querySelector("#tabE-wallet")
let elAtmContent = document.querySelector("#tabatm")


// element content tab 1
let cart1 = document.querySelectorAll('.card-items')
let amount = document.querySelectorAll('.amount')


// element content tab 3
let image = document.querySelector('.metode')
let provider_image = document.querySelector('#metodebayar')

// element toast
let btnHideToast = document.querySelector('#toastButton')

let methods = document.querySelectorAll('.method')

// untuk tampung total
let temp_total = 0

// Untuk simpan ke local
let local = []
let localhistory = localStorage.getItem('History')
if(localhistory){
    let lasthistory = JSON.parse(localhistory)
    local = lasthistory
}

let transaction = {
    nama: "",
    email: "",  
    alamat: "",
    noTelepon: "",
    buah: {},
    total: "",
    tanggal:"",
}
let temp = []


// fungsi untuk form pengiriman
elkirim.addEventListener('change', function() {
    if (parseInt(elkirim.value) == 1) {
        elAlamat.disabled = true
        elNomorTelepon.disabled = true

    } else {
        elAlamat.disabled = false
        elNomorTelepon.disabled = false

    }
})

// fungsi tambah ongkir
elAlamat.addEventListener('blur', function() {
    if (elAlamat.value) {
        delivery.classList.remove('d-none')
        deliveryPrice.classList.remove('d-none')
        deliveryPrice.innerHTML = 10000
        subtotal.innerHTML = parseInt(subtotal.textContent) + 10000
    } else {
        delivery.classList.add('d-none')
        deliveryPrice.classList.add('d-none')
        deliveryPrice.innerHTML = 0
        subtotal.innerHTML = parseInt(subtotal.textContent) - 10000
    }
})


// fungsi untuk submit page 1
elBtnpage1.addEventListener('click', function() {

    if (parseInt(elkirim.value) == 1) {
        if (elNama.value && elkirim.value) {
            elNama.setAttribute('value', elNama.value)
            elkirim.setAttribute('value', elkirim.value)
            activatedpage2()
        } else {
            alertshow.classList.remove('d-none')
            alertshow.classList.add('show')
            let message = alertshow.querySelector('p')
            message.innerHTML = "Mohon isikan nama"

        }
    } else if (parseInt(elkirim.value) == 2) {
        if (elNama.value && elkirim.value && elAlamat.value && elNomorTelepon.value) {
            elNama.setAttribute('value', elNama.value)
            elkirim.setAttribute('value', elkirim.value)
            elAlamat.setAttribute('value', elAlamat.value)
            elNomorTelepon.setAttribute('value', elNomorTelepon.value)
            activatedpage2()
        } else {
            if (!elNama.value) {
                alertshow.classList.remove('d-none')
                alertshow.classList.add('show')
                let message = alertshow.querySelector('p')
                message.innerHTML = "Mohon isikan nama"

            } else if (!elAlamat.value) {
                alertshow.classList.remove('d-none')
                alertshow.classList.add('show')
                let message = alertshow.querySelector('p')
                message.innerHTML = "Mohon isikan alamat"

            } else if (!elNomorTelepon.value) {
                alertshow.classList.remove('d-none')
                alertshow.classList.add('show')
                let message = alertshow.querySelector('p')
                message.innerHTML = "Mohon isikan nomor telepon"
            }
        }
    } else {
        if (!elNama.value) {
            alertshow.classList.remove('d-none')
            alertshow.classList.add('show')
            let message = alertshow.querySelector('p')
            message.innerHTML = "Mohon isikan nama"
        } else if (elkirim.value == 0) {
            alertshow.classList.remove('d-none')
            alertshow.classList.add('show')
            let message = alertshow.querySelector('p')
            message.innerHTML = "Pilih metode pengambilan"
        }
    }
});

// fungsi membuka page 2
function activatedpage2() {
    let lock = document.querySelector(".lock-1")
    lock.classList.add('d-none')
    elTabMetode.classList.remove('disabled')
    elTabMetode.classList.add('active')
    elTabPengiriman.classList.remove('active')
    elTabData.classList.remove('show', 'active')
    elTabMetodePembayaran.classList.add('show', 'active')
    elTabMetodePembayaran.classList.remove('d-none', 'disabled')
}

// fungsi tab 1
elTabPengiriman.addEventListener('click', function() {

    activatedcart()
    elTabPengiriman.classList.add('active')
    elTabData.classList.add('show', 'active')
    elTabMetode.classList.remove('active')
    elTabMetodePembayaran.classList.remove('show', 'active')
    image.classList.add('d-none')
    btnToast.classList.add('d-none')
    elbtnpre3.classList.add('d-none')
    elbtnpre1.classList.remove('d-none')
    elBtnpage1.classList.remove('d-none')
})

// fungsi tab 2
elTabMetode.addEventListener('click', function() {
    elTabData.classList.remove('show', 'active')
    elTabMetode.classList.add('show', 'active')
    elTabMetodePembayaran.classList.add('show', 'active')
})

elbtnpre3.addEventListener('click', function() {
    elTabData.classList.remove('show', 'active')
    elTabMetode.classList.add('show', 'active')
    elTabMetodePembayaran.classList.add('show', 'active')
})

elbtnpre2.addEventListener('click', function() {
    activatedcart()
    elTabPengiriman.classList.add('active')
    elTabData.classList.add('show', 'active')
    elTabMetode.classList.remove('active')
    elTabMetodePembayaran.classList.remove('show', 'active')
    image.classList.add('d-none')
    btnToast.classList.add('d-none')
    elbtnpre3.classList.add('d-none')
    elbtnpre1.classList.remove('d-none')
    elBtnpage1.classList.remove('d-none')
})

// fungsi tab e wallet pada page 2
elTabEWallet.addEventListener('click', function() {
    elTabAtm.classList.remove('active')
    elTabEWallet.classList.add('active')
    elAtmContent.classList.remove('active', 'show')
    elEwalletContent.classList.add('active', 'show')
})

// fungsi tab atm pada page 2
elTabAtm.addEventListener('click', function() {
    elTabEWallet.classList.remove('active')
    elTabAtm.classList.add('active')
    elAtmContent.classList.add('show', 'active')
    elEwalletContent.classList.remove('show', 'active')
})

// fungsi menambahkan border pada pembayaran
methods.forEach(function(method) {
    method.addEventListener('click', function() {
        image.classList.remove('d-none')
        let img = method.querySelector('img')
        provider_image.setAttribute('src', img.getAttribute('src'))
        btnToast.classList.remove('d-none')
        elBtnpage1.classList.add('d-none')
        removeborder()
        method.classList.add('border-success')
    })
})


// fungsi untuk submit page 2
elBtnpage2.addEventListener('click', function(){
    methods.forEach(function(method) {
        if (method.getAttribute('class').includes('border-success')){
            elReview.classList.add('active')
            elReview.classList.remove('disabled')
            elTabData.classList.add('show', 'active')
            elTabMetode.classList.remove('active')
            elTabMetodePembayaran.classList.remove('show', 'active')
            alertshow.classList.add('d-none')
            let lock = document.querySelector(".lock-2")
            lock.classList.add('d-none')
            disabledcart()
        }
    })
})


// fungsi disabled form
function disabledcart(){
    elNama.disabled = true
    elAlamat.disabled = true
    elNomorTelepon.disabled = true
    elkirim.disabled = true
}

// fungsi aktivasi form
function activatedcart(){
    elNama.disabled = false
    elAlamat.disabled = false
    elNomorTelepon.disabled = false
    elkirim.disabled = false
}

// fungsi untuk mengubah status border
function removeborder() {
    methods.forEach(function(method) {
        if (method.getAttribute('class').includes('border-success'))
            method.classList.remove('border-success')
    })
}



// fungsi tab 3
elReview.addEventListener('click', function() {
    elReview.classList.add('show', 'active')
    elTabData.classList.add('show', 'active')
    elTabPengiriman.classList.remove('active')
    btnToast.classList.remove('d-none')
    elBtnpage1.classList.add('d-none')
    elTabMetode.classList.remove('active')
    elTabMetodePembayaran.classList.remove('show', 'active')
    image.classList.remove('d-none')
    elbtnpre3.classList.remove('d-none')
    elbtnpre1.classList.add('d-none')
    disabledcart()
})




// fungsi memanggil toast dan set local
document.querySelector("#basicToastBtn").onclick = function() {
    let modal = document.querySelector('.toast-container')
    modal.classList.remove('d-none')
    new bootstrap.Toast(document.querySelector('#basicToast')).show();
    transaction.email = localStorage.getItem("login");
    transaction.nama = elNama.value
    transaction.alamat = elAlamat.value
    transaction.noTelepon = elNomorTelepon.value
    local.push(transaction)
    localStorage.setItem(`History`, JSON.stringify(local));
    transaction = {
        nama: "",
        email: "",  
        alamat: "",
        noTelepon: "",
        buah: {},
        total: "",
        tanggal: "",
    }
}

// fungsi menyembunyikan toast
btnHideToast.addEventListener('click', function() {
    let basic = document.querySelector('#basicToast')
    basic.classList.add('fade', 'hide')
    let modal = document.querySelector('.toast-container')
    modal.classList.add('d-none')
})



const getProductById = async (productId) => {
    const url = `https://6172fc04110a740017222f15.mockapi.io/products/${productId}`
    let response = await fetch(url)
    let data = await response.json()
    return data
}

// fungsi ambil data untuk pesanan
function cartItem(){
    let ulcard = document.querySelector('.list-item')
    let id =  localStorage.getItem('keranjang')
    let subtotal = document.querySelector('.subtotal')
    id = JSON.parse(id)
    temp_total = 0
    let temp = []
    let today = new Date();
    let todaydate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    const renderItem = async() => {
        for (let property in id) {
            let idProduct = id[property].productId
            let qtyProduct = id[property].qty
            let detail = await getProductById(idProduct)
            let render = await renderCart(detail, qtyProduct)
            ulcard.appendChild(render)
            let subtotal_price = qtyProduct * detail.harga
            let history = {
                namaItem : detail.name,
                harga: detail.harga,
                quantity: qtyProduct,
                idItem: detail.id,
                tanggal: todaydate
            }
            temp.push(history)
            temp_total += subtotal_price
            subtotal.innerHTML = temp_total
        }
        transaction.buah = temp
        transaction.total = temp_total
    
    }
    renderItem()    
}
cartItem()


function renderCart(product, productqty){
    let div =`
    <div class="card-body card-items">
        <div class="row">
            <h6 class="fw-bold fruit">${product.name}</h6>
            <div class="col-3">
                <img src="${product.img}" width="80px" height="80px"
                style="object-fit: cover" alt="..." />
            </div>
            <div class="col-5">
                <div class="d-flex ms-auto me-auto mt-4 justify-content-center ">
                    <p class="amount">${productqty}</p>
                </div>
            </div>
            <div class="col-4">
                <h6 class="mt-4 price fw-normal text-center">${product.harga}</h6>
            </div>
        </div>
    </div>`
    let div2 = document.createElement('div')
    div2.insertAdjacentHTML('beforeend', div)
    return div2
}