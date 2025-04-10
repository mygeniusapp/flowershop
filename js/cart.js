// cart.js
// Clear localStorage - FOR TESTING PURPOSES ONLY
//localStorage.clear();
//console.log("LocalStorage has been cleared for testing!");
$(document).ready(function () {
    // Load cart items from localStorage
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Display cart items
    displayCartItems(cart);

    // Event listener for quantity changes
    $(".qty-minus, .qty-plus").on("click", function () {
        const productName = $(this).closest("tr").find("h5").text();
        const input = $(this).siblings(".qty-text");
        let quantity = parseInt(input.val());

        if ($(this).hasClass("qty-minus") && quantity > 1) {
            quantity -= 1;
        } else if ($(this).hasClass("qty-plus")) {
            quantity += 1;
        }

        input.val(quantity);

        // Update cart in localStorage
        updateCartQuantity(productName, quantity);
    });

    // Event listener for removing items
    $(".action a").on("click", function (event) {
        event.preventDefault();
        const productName = $(this).closest("tr").find("h5").text();

        // Remove item from cart
        removeFromCart(productName);

        // Reload cart items
        cart = JSON.parse(localStorage.getItem("cart")) || [];
        displayCartItems(cart);
    });

    // Function to display cart items
    function displayCartItems(cart) {
        const cartTableBody = $(".cart-table tbody");
        cartTableBody.empty(); // Clear existing items

        let totalPrice = 0;

        cart.forEach((item) => {
            const row = `
                <tr>
                    <td class="cart_product_img">
                        <a href="#"><img src="${item.image}" alt="${item.name}"></a>
                        <h5>${item.name}</h5>
                    </td>
                    <td class="qty">
                        <div class="quantity">
                            <a href="" class="qty-minus"><i class="fa fa-minus" aria-hidden="true"></i></a>
                            <input type="number" class="qty-text" value="${item.quantity}" min="1">
                            <a href="" class="qty-plus"><i class="fa fa-plus" aria-hidden="true"></i></a>
                        </div>
                    </td>
                    <td class="price"><span>SAR ${item.price}</span></td>
                    <td class="total_price"><span>SAR ${(item.price * item.quantity).toFixed(2)}</span></td>
                    <td class="action"><a href=""><i class="icon_close"></i></a></td>
                </tr>
            `;
            cartTableBody.append(row);

            totalPrice += item.price * item.quantity;
        });

        // Update total price
        $(".total h5").last().text(`SAR ${totalPrice.toFixed(2)}`);
		$(".subtotal h5").last().text(`SAR ${totalPrice.toFixed(2)}`);
    }

    // Function to update cart quantity in localStorage
    function updateCartQuantity(productName, quantity) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        const productIndex = cart.findIndex((item) => item.name === productName);

        if (productIndex !== -1) {
            cart[productIndex].quantity = quantity;
            localStorage.setItem("cart", JSON.stringify(cart));
            displayCartItems(cart); // Refresh cart display
        }
    }

    // Function to remove item from cart
    function removeFromCart(productName) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart = cart.filter((item) => item.name !== productName);
        localStorage.setItem("cart", JSON.stringify(cart));
    }
});