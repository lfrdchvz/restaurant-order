import { menuArray } from "./data.js"

const menuContainer = document.getElementById("menu-item")
const orderSection = document.getElementById("order-section")
const orderItemsContainer = document.getElementById("order-items")
const totalPriceEl = document.getElementById("total-price")
const modal = document.getElementById("payment-modal")
const paymentForm = document.getElementById("payment-form")
const placeOrderBtn = document.getElementById("place-order")

let orderArray = []

menuContainer.addEventListener("click", function(e) {
    if (e.target.dataset.id) {
        handleAddClick(Number(e.target.dataset.id))
    }
})

orderItemsContainer.addEventListener("click", function(e) {
    if (e.target.dataset.remove !== undefined) {
        handleRemoveClick(Number(e.target.dataset.remove))
    }
})

// Abrir modal
placeOrderBtn.addEventListener("click", function() {
    modal.classList.remove("hidden")
})

// Validar y procesar formulario
paymentForm.addEventListener("submit", function(e) {
    e.preventDefault()

    const paymentFormData = new FormData(paymentForm)
    const fullName = paymentFormData.get("fullName")

    modal.classList.add("hidden")
    orderArray = [] // Reiniciar carrito

    // Mostrar mensaje final
    orderSection.classList.remove("hidden")
    orderSection.innerHTML = `
        <div class="order-confirmation">
            <p>Thanks, ${fullName}! Your order is on its way!</p>
        </div>
    `
})

function handleAddClick(productId) {
    const targetProductObj = menuArray.find(item => item.id === productId)
    if (targetProductObj) {
        orderArray.push(targetProductObj)
        renderOrder()
    }
}

function handleRemoveClick(index) {
    orderArray.splice(index, 1)
    renderOrder()
}

function renderOrder() {
    if (orderArray.length > 0) {
        orderSection.classList.remove("hidden")
    } else {
        orderSection.classList.add("hidden")
        return
    }

    orderItemsContainer.innerHTML = orderArray.map((item, index) => `
        <div class="order-item">
            <div class="order-item-title">
                <h3>${item.name}</h3>
                <button class="remove-btn" data-remove="${index}">remove</button>
            </div>
            <span class="order-item-price">$${item.price}</span>
        </div>
    `).join("")

    const totalPrice = orderArray.reduce((total, item) => total + item.price, 0)
    totalPriceEl.textContent = totalPrice.toFixed(2)
}

function getMenuHtml() {
    return menuArray.map(function(item) {
        return `
            <article class="menu-item">
                <img class="product-image" src="${item.img}" alt="${item.alt || item.name}">
                <div class="product-content">
                    <h3>${item.name}</h3>
                    <p class="ingredients">${item.ingredients.join(", ")}</p>
                    <p class="price">$${item.price.toFixed(2)}</p>
                </div>
                <button class="add" data-id="${item.id}">+</button>
            </article>
        `
    }).join("")
}

function render(element, content) {
    element.innerHTML = content
}

render(menuContainer, getMenuHtml())