// Initialize the cart from localStorage or start with an empty array
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Add event listeners to the "Add to Cart" buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const item = button.getAttribute('data-item');
        const price = parseFloat(button.getAttribute('data-price'));
        addToCart(item, price);
        updateCartDisplay(); // Update the cart display after adding an item
    });
});

// Function to add an item to the cart
function addToCart(item, price) {
    // Check if item already exists in the cart
    const existingItem = cart.find(cartItem => cartItem.item === item);

    if (existingItem) {
        // If the item already exists, increment its quantity
        existingItem.quantity += 1;
    } else {
        // Otherwise, add a new item with quantity 1
        cart.push({ item, price, quantity: 1 });
    }

    // Store the updated cart in localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    alert(item + ' added to cart!');
}

// Function to update the cart display on the Cart page
function updateCartDisplay() {
    const cartItems = document.getElementById('cart-items');
    const totalCost = document.getElementById('total-cost');
    
    // Clear the current cart display
    cartItems.innerHTML = '';

    // Calculate the total cost
    let total = 0;
    
    // Display each item in the cart
    cart.forEach(cartItem => {
        const li = document.createElement('li');
        li.textContent = `${cartItem.item} - $${cartItem.price.toFixed(2)} x ${cartItem.quantity}`;
        cartItems.appendChild(li);

        // Add to the total cost
        total += cartItem.price * cartItem.quantity;
    });

    // Update the total cost in the HTML
    totalCost.textContent = total.toFixed(2);
}

// When the Cart page loads, update the display
document.addEventListener('DOMContentLoaded', () => {
    updateCartDisplay();
});

// Function to handle checkout
function checkout() {
    alert('Thank you for your order! Your total is: $' + document.getElementById('total-cost').textContent);
    localStorage.removeItem('cart'); // Clear the cart after checkout
    window.location.href = 'checkout.html';
}
