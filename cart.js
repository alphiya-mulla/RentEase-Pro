// 

const cartItems = document.getElementById("cart-items");
const grandTotal = document.getElementById("grand-total");
const placeOrder = document.getElementById("place-order");

const currentUser = JSON.parse(localStorage.getItem("loggedInUser"));

const cartKey = currentUser
    ? currentUser.email + "_cart"
    : "_cart";

let cart = JSON.parse(localStorage.getItem(cartKey)) || [];
// Display Cart
function displayCart() {

    cartItems.innerHTML = "";

    let total = 0;

    if(cart.length === 0){

        cartItems.innerHTML = `
        <tr>
            <td colspan="5" class="empty-cart">
                Your Cart is Empty 🛒
            </td>
        </tr>`;

        grandTotal.innerHTML = "₹0";
        return;
    }

    cart.forEach((item,index)=>{

       let itemTotal = item.isBuy
    ? item.price * item.qty
    : item.price * item.qty * item.duration;

        total += itemTotal;

        cartItems.innerHTML += `

        <tr>

            <td>${item.name}</td>

            <td>
    ${item.isBuy ? `₹${item.price}` : `₹${item.price}/month`}
</td>

<td>
    ${item.isBuy ? `-` : `${item.duration} Month(s)`}
</td>

            <td>

                <button class="qty-btn"
                onclick="decreaseQty(${index})">-</button>

                <span class="qty">${item.qty}</span>

                <button class="qty-btn"
                onclick="increaseQty(${index})">+</button>

            </td>

            <td>₹${itemTotal}</td>

            <td>

                <button class="remove-btn"
                onclick="removeItem(${index})">

                Remove

                </button>

            </td>

        </tr>

        `;

    });

    grandTotal.innerHTML = "₹" + total;

}

// Increase Quantity
function increaseQty(index){

    cart[index].qty++;

    localStorage.setItem(cartKey,JSON.stringify(cart));
    

    displayCart();
    updateCartBadge();

}

// Decrease Quantity
function decreaseQty(index){

    if(cart[index].qty > 1){

        cart[index].qty--;

    }

    else{

        cart.splice(index,1);

    }

    localStorage.setItem(cartKey,JSON.stringify(cart));
   

    displayCart();
     updateCartBadge();

}

// Remove Item
function removeItem(index){

    cart.splice(index,1);

    localStorage.setItem(cartKey,JSON.stringify(cart));
    

    displayCart();
    updateCartBadge();

}

// Place Order
placeOrder.addEventListener("click",function(){

    if(cart.length===0){

        alert("Your cart is empty!");

        return;

    }

const user = JSON.parse(localStorage.getItem("loggedInUser"));

if(!user){

    alert("Please login first.");

    localStorage.setItem("redirectAfterLogin","cart.html");

    window.location.href = "login.html";

    return;

}

window.location.href = "delivery.html";

});

// Initial Load
displayCart();