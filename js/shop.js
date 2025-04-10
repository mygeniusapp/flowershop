$(document).ready(function () {
    // Event listener for "Add to Cart" button
    $(".add-to-cart-btn").on("click", function (event) {
        event.preventDefault(); // Prevent default form submission

        // Get product details from data attributes
        const product = {
            name: $(this).data("name"),
            price: $(this).data("price"),
            image: $(this).data("image"),
            quantity: 1, // Default quantity
        };

        // Print product info in an alert
        alert('Product Added to Cart! ');

        // Add product to cart
        addToCart(product);

        // Redirect to cart page (optional)
        //window.location.href = "cart.html";
    });

    // Function to add product to cart
    function addToCart(product) {
        let cart = JSON.parse(localStorage.getItem("cart")) || []; // Get existing cart or initialize empty array

        // Check if product already exists in cart
        const existingProductIndex = cart.findIndex((item) => item.name === product.name);

        if (existingProductIndex !== -1) {
            // If product exists, update quantity
            cart[existingProductIndex].quantity += 1;
        } else {
            // If product doesn't exist, add it to cart
            cart.push(product);
        }

        // Save updated cart back to localStorage
        localStorage.setItem("cart", JSON.stringify(cart));

        // Update cart quantity in the header
        updateCartQuantity();
    }

    // Function to update cart quantity in the header
    function updateCartQuantity() {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
        $(".cart-quantity").text(`(${totalQuantity})`);
    }

    // Initialize cart quantity on page load
    updateCartQuantity();
});