let products = [
    {name: "Помідори", quantity: 2},
    {name: "Печиво", quantity: 2},
    {name: "Сир", quantity: 2}
];

function addProducts() {
    let productName = document.getElementById("productName").value;
    if (productName === "") {
        alert("Будь ласка, введіть назву товару");
        return;
    }
    for (let i = 0; i < products.length; i++) {
        if (products[i].name === productName) {
            alert("Товар з такою назвою вже існує");
            return;
        }
    }
    products.push({name: productName, quantity: 1});
    renderTable();
    renderPurchasedTable();
}

function renderTable() {
    let table = document.querySelector(".table1 tbody");
    table.innerHTML = "";
    let firstRow = `
        <tr>
            <td colspan="3">
                <input id="productName" type="text" placeholder="Назва товару">
                <button onclick="addProducts()" data-tooltip="Кнопка 'Додати'" class="add-button"><b>Додати</b></button>
            </td>
        </tr>
    `;
    table.insertAdjacentHTML('beforeend', firstRow);
    for (let i = 0; i < products.length; i++) {
        let row = `
            <tr>
                <td>
                    <input class="edit-name" type="text" value="${products[i].name}" oninput="editName(${i}, event)">
                </td>
                <td>
                    <div class="row-container">
                        <button class="button-minus" data-tooltip="Кнопка відняти" onclick="decreaseQuantity(${i})"><b>–</b></button>
                        <span class="number">${products[i].quantity}</span>
                        <button class="button-plus" data-tooltip="Кнопка додати" onclick="increaseQuantity(${i})"><b>+</b></button>
                    </div>
                </td>
                <td>
                    <div class="right-container">
                        <button class="button-near-cancel" onclick="buyProduct(${i})" data-tooltip="Кнопка купити">Купити</button>
                        <button class="button-cancel" data-tooltip="Кнопка відміни" onclick="removeProduct(${i})"><b>×</b></button>
                    </div>
                </td>
            </tr>
        `;
        table.insertAdjacentHTML('beforeend', row);
    }
    renderPurchasedTable();
}

function decreaseQuantity(index) {
    if (products[index].quantity === 1) {
        removeProduct(index);
    } else {
        products[index].quantity--;
        renderTable();
    }
    renderPurchasedTable();
}

function increaseQuantity(index) {
    products[index].quantity++;
    renderTable();
    renderPurchasedTable();
}

function removeProduct(index) {
    products.splice(index, 1);
    renderTable();
    renderPurchasedTable();
}

function editName(index, event) {
    let newName = event.target.value;
    for (let i = 0; i < products.length; i++) {
        if (i !== index && products[i].name === newName) {
            alert("Товар з такою назвою вже існує");
            renderTable();
            return;
        }
    }
    products[index].name = newName;
    renderPurchasedTable();
}

let purchasedProducts = [];

function buyProduct(index) {
    let product = products[index];
    let purchasedProductIndex = purchasedProducts.findIndex(p => p.name === product.name);
    if (purchasedProductIndex === -1) {
        purchasedProducts.push({name: product.name, quantity: 1});
    } else {
        purchasedProducts[purchasedProductIndex].quantity++;
    }
    if (product.quantity === 1) {
        removeProduct(index);
    } else {
        product.quantity--;
        renderTable();
    }
    renderPurchasedTable();
}

function renderPurchasedTable() {
    let table = document.querySelector(".table2 tbody");
    table.innerHTML = `
        <tr>
            <td class="name"><b>Залишилося</b></td>
        </tr>
        <tr>
            <td></td>
        </tr>
        <tr>
            <td class="name"><b>Куплено</b></td>
        </tr>
        <tr>
            <td></td>
        </tr>
    `;
    let remainingRow = table.rows[1].cells[0];
    for (let i = 0; i < products.length; i++) {
        let span = document.createElement("span");
        span.className = "name";
        span.innerHTML = `${products[i].name} <span class="number">${products[i].quantity}</span>`;
        remainingRow.appendChild(span);
    }
    let purchasedRow = table.rows[3].cells[0];
    for (let i = 0; i < purchasedProducts.length; i++) {
        let span = document.createElement("span");
        span.className = "name";
        span.innerHTML = `${purchasedProducts[i].name} <span class="number">${purchasedProducts[i].quantity}</span>`;
        purchasedRow.appendChild(span);
    }
}





renderTable();
