
// element form
let elNama = document.querySelector('#namaLengkap')
let elAlamat = document.querySelector('#alamat')
let elNomorTelepon = document.querySelector("#nomorTelepon")
let elkirim = document.querySelector('#pengiriman')
let deliveryPrice = document.querySelector('.delivery-price')
let delivery = document.querySelector('.delivery')
let alertshow = document.querySelector('.alert-danger')

// element button
let elBtnpage1 = document.querySelector('#btnSubmit1')
let elBtnpage2 = document.querySelector("#btnSubmit2")
let btnToast = document.querySelector('#basicToastBtn')

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
let price2 = document.querySelectorAll('.price')
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
let transaction = {
    nama: "",
    alamat: "",
    noTelepon: "",
    kota: "",
    buah: {},
    total: "",
}
temp = []
let count = 1


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

// perhitungan total harga load awal
for (let i = 0; i < price2.length; i++) {
    let total = price2[i].textContent * amount[i].textContent
    temp_total += total
}
let subtotal = document.querySelector('.subtotal')
subtotal.innerHTML = temp_total


// fungsi untuk submit page 1
elBtnpage1.addEventListener('click', function() {
    console.log(alertshow.childNodes)
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
    console.log('test')
    activatedcart()
    elTabPengiriman.classList.add('active')
    elTabData.classList.add('show', 'active')
    elTabMetode.classList.remove('active')
    elTabMetodePembayaran.classList.remove('show', 'active')
    image.classList.add('d-none')
    btnToast.classList.add('d-none')
    elBtnpage1.classList.remove('d-none')
})

// fungsi tab 2
elTabMetode.addEventListener('click', function() {
    elTabData.classList.remove('show', 'active')
    elTabMetode.classList.add('show', 'active')
    elTabMetodePembayaran.classList.add('show', 'active')
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
    cart1.forEach(function(cart) {
        let plus = cart.querySelector('.plus-btn')
        let minus = cart.querySelector('.minus-btn')
        plus.disabled = true
        minus.disabled = true
        
    })
}

// fungsi aktivasi form
function activatedcart(){
    elNama.disabled = false
    elAlamat.disabled = false
    elNomorTelepon.disabled = false
    elkirim.disabled = false
    cart1.forEach(function(cart) {
        let plus = cart.querySelector('.plus-btn')
        let minus = cart.querySelector('.minus-btn')
        plus.disabled = false
        minus.disabled = false
    })
}

// fungsi untuk mengubah status border
function removeborder() {
    methods.forEach(function(method) {
        if (method.getAttribute('class').includes('border-success'))
            method.classList.remove('border-success')
    })
}

// fungsi perhitungan belanja
cart1.forEach(function(cart) {
    let amount = cart.querySelector('.amount')
    let plus = cart.querySelector('.plus-btn')
    let minus = cart.querySelector('.minus-btn')
    let subtotal = document.querySelector('.subtotal')
    let price = cart.querySelector('.price')
    let sisa = cart.querySelector(".ms-1")
    plus.addEventListener('click', function() {
        if (parseInt(sisa.textContent) != 0) {
            amount.innerHTML = parseInt(amount.textContent) + 1
            sisa.innerHTML = parseInt(sisa.textContent) - 1
            subtotal.innerHTML = parseInt(subtotal.textContent) + (parseInt(price.textContent))
        }
    })
    minus.addEventListener('click', function() {
        if (parseInt(amount.textContent) != 0) {
            amount.innerHTML = parseInt(amount.textContent) - 1
            sisa.innerHTML = parseInt(sisa.textContent) + 1
            subtotal.innerHTML = parseInt(subtotal.textContent) - (parseInt(price.textContent))
        }
    })
})


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
    disabledcart()
})




// fungsi memanggil toast dan set local
document.querySelector("#basicToastBtn").onclick = function() {
    let modal = document.querySelector('.toast-container')
    modal.classList.remove('d-none')
    new bootstrap.Toast(document.querySelector('#basicToast')).show();
    transaction.nama = elNama.value
    transaction.alamat = elAlamat.value
    transaction.noTelepon = elNomorTelepon.value
    let subtotal = document.querySelector('.subtotal')
    cart1.forEach(function(cart) {
        let fruit = cart.querySelector('.fruit')  
        let price = cart.querySelector('.price')
        let history = {
            nama_buah : fruit.textContent,
            harga: price.textContent,
        }
        temp.push(history)
    })
    transaction.buah = temp
    transaction.total = subtotal.textContent
    localStorage.setItem(`${transaction.nama}_${count}`, JSON.stringify(transaction));
    count += 1
    console.log(transaction)
    // for (var i = 0; i < localStorage.length; i++) {
    //     var key = localStorage.key(i);
    //     var value = localStorage.getItem(key);
    //     key = key.split('_')
    //         // console.log(key[0], typeof(JSON.parse(value)))
    //     if (key[0] === elNama.value) {
    //         if (count < key[1]) {
    //             count = parseInt(key[1])
    //         }
    //     }
    // }
    // console.log(count)
}

// fungsi menyembunyikan toast
btnHideToast.addEventListener('click', function() {
    let basic = document.querySelector('#basicToast')
    basic.classList.add('fade', 'hide')
    let modal = document.querySelector('.toast-container')
    modal.classList.add('d-none')
})