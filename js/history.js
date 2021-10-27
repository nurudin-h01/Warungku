let history = localStorage.getItem('History')
history = JSON.parse(history)




const getProductById = async (productId) => {
    const url = `https://6172fc04110a740017222f15.mockapi.io/products/${productId}`
    let response = await fetch(url)
    let data = await response.json()
    return data
}

function renderHistory(){
    let number = 1
    for (const items in history){
        let item = history[items].buah
        for (const fruit in item){
            let table = document.querySelector('.table_body')
            let quantity = item[fruit].quantity
            let date = item[fruit].tanggal
            let renderItems = async() => {
                let idItems = item[fruit].idItem
                let detailapi = await getProductById(idItems)
                let detailTable = await renderimage(detailapi,quantity, number, date)
                table.appendChild(detailTable)
                number += 1
            }
            renderItems()
        }
    }
}
renderHistory()

function renderimage(detail, quantity, id, datenow){
    let div = `
        <td>${id}</td>
            <td><img src="${detail.img}" width="100px">
                  <p>${detail.name}</p>
            </td>
            <td>${quantity}</td>
        <td>${detail.harga}</td>
        <td>${datenow}</td>
   
    `
    let div2 = document.createElement('tr')
    div2.className = 'text-center'
    div2.insertAdjacentHTML('beforeend', div)
    return div2
}
