// Toggle cart visibility
function toggleCart() {
    const cartWindow = document.getElementById("cart-window");
    cartWindow.style.display = cartWindow.style.display === "none" ? "block" : "none";
    loadCart();
}

// Close cart
function closeCart() {
    document.getElementById("cart-window").style.display = "none";
}

// Add item to cart
function addToCart(name, price, imageUrl) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id: Date.now(), name, price, imageUrl, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

// Remove item from cart
function removeFromCart(id) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    loadCart();
}

// Clear entire cart
function clearCart() {
    localStorage.removeItem("cart");
    updateCartCount();
    loadCart();
}

// Update cart count icon
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const itemCount = cart.reduce((count, item) => count + item.quantity, 0);
    document.getElementById("cart-count").innerText = itemCount;
}

// Calculate cart total
function calculateTotal(cart) {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

// Load cart items into cart window
function loadCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartItemsContainer = document.getElementById("cart-items");
    cartItemsContainer.innerHTML = "";

    cart.forEach(item => {
        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";
        cartItem.innerHTML = `
            <img src="${item.imageUrl}" alt="${item.name}" class="cart-item-img">
            <div class="cart-item-details">
                <span>${item.name} x${item.quantity}</span><br>
                <span>$${(item.price * item.quantity).toFixed(2)}</span>
            </div>
            <div  class="cart-delete">
             <button onclick="removeFromCart(${item.id})" class="delete-button">
                <i class="fa-solid fa-trash"></i>
            </button
           </div>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    document.getElementById("cart-total").innerText = `Total: $${calculateTotal(cart).toFixed(2)}`;
}

// Checkout function
function checkout() {
    alert("Proceeding to checkout...");
    clearCart();
}

// Initialize cart count on page load
document.addEventListener("DOMContentLoaded", updateCartCount);
