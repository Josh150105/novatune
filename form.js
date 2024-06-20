let cart = [];
let totalPrice = 0;

function addToCart(id, name, price) {
    const product = { id, name, price };
    cart.push(product);
    updateCart();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    cartItems.innerHTML = '';
    totalPrice = 0;

    cart.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.name} - $${item.price}`;
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.onclick = () => removeFromCart(index);
        listItem.appendChild(removeButton);
        cartItems.appendChild(listItem);

        totalPrice += item.price;
    });

    totalPriceElement.textContent = totalPrice;
}

function showOrderForm() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
    } else {
        document.getElementById('order-form').style.display = 'block';
    }
}

function submitOrder(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const phone = document.getElementById('phone').value;

    // Simulating sending an SMS
    alert(`"Hello ${username}, your order has been processed. Total amount: $${totalPrice}"`);
    
    // Clear cart and form
    cart = [];
    updateCart();
    document.getElementById('order-form').style.display = 'none';
    event.target.reset();
}
