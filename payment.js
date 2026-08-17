// payment.js

const paymentType = localStorage.getItem("paymentType");
const currentUser = JSON.parse(localStorage.getItem("loggedInUser"));

if (!currentUser) {

    alert("Please login first.");

    localStorage.setItem("redirectAfterLogin", "payment.html");

    window.location.href = "login.html";

}

const historyKey = currentUser.email + "_history";

const codOption = document.getElementById("codOption");

if (paymentType === "extend") {
    codOption.disabled = true;
    codOption.checked = false;

    // Hide the whole Cash on Delivery option
    codOption.closest(".payment-option").style.display = "none";
}

const paymentForm = document.getElementById("paymentForm");

const methods = document.querySelectorAll(
'input[name="paymentMethod"]'
);

const upiFields = document.getElementById("upiFields");
const cardFields = document.getElementById("cardFields");
const bankFields = document.getElementById("bankFields");
const walletFields = document.getElementById("walletFields");
const codOptionFields = document.getElementById("codOption");

// Show only selected payment fields
methods.forEach(method => {

    method.addEventListener("change", function(){

        upiFields.style.display = "none";
        cardFields.style.display = "none";
        bankFields.style.display = "none";
        walletFields.style.display = "none";

        if(this.value === "UPI"){
            upiFields.style.display = "block";
        }

        if(this.value === "Card"){
            cardFields.style.display = "block";
        }

        if(this.value === "Net Banking"){
            bankFields.style.display = "block";
        }

        if(this.value === "Wallet"){
            walletFields.style.display = "block";
        }

    

    });

});

paymentForm.addEventListener("submit", function(e){

    e.preventDefault();

    const paymentMethod = document.querySelector(
    'input[name="paymentMethod"]:checked'
    ).value;

    localStorage.setItem(
        currentUser.email + "_paymentMethod",
        paymentMethod
    );

    if(paymentMethod === "UPI"){

        const upi = document.getElementById("upiId").value.trim();

        if(upi === ""){

            alert("Please enter your UPI ID.");

            return;
        }

    }

    if(paymentMethod === "Card"){

        const name = document.getElementById("cardName").value.trim();

        const number = document.getElementById("cardNumber").value.trim();

        const expiry = document.getElementById("expiry").value.trim();

        const cvv = document.getElementById("cvv").value.trim();

        if(name==="" || number==="" || expiry==="" || cvv===""){

            alert("Please fill all card details.");

            return;
        }

        if(number.length!==16 || isNaN(number)){

            alert("Enter a valid 16-digit card number.");

            return;
        }

        if(cvv.length!==3 || isNaN(cvv)){

            alert("Enter a valid 3-digit CVV.");

            return;
        }

    }

    if(paymentMethod === "Net Banking"){

        if(document.getElementById("bankName").value===""){

            alert("Please select a bank.");

            return;
        }

    }

    if(paymentMethod === "Wallet"){

        if(document.getElementById("walletName").value===""){

            alert("Please select a wallet.");

            return;
        }

    }

    if(paymentType==="extend"){

    const orderId=localStorage.getItem("extendOrderId");

    const productIndex=Number(
        localStorage.getItem("extendProductIndex")
    );

    const months=Number(
        localStorage.getItem("extendMonths")
    );

    let history=JSON.parse(
        localStorage.getItem(historyKey)
    ) || [];

    history.forEach(order=>{

        if(order.orderId===orderId){

            order.items[productIndex].duration+=months;

            order.total=order.items.reduce((sum,item)=>{

                return sum+(item.price*item.qty*item.duration);

            },0);

        }

    });

    localStorage.setItem(
        historyKey,
        JSON.stringify(history)
    );

    localStorage.removeItem("extendOrderId");
    localStorage.removeItem("extendProductIndex");
    localStorage.removeItem("extendMonths");
    localStorage.removeItem("paymentType");

    alert("Rental Extended Successfully!");

    window.location.href="history.html";

}
else{

    localStorage.removeItem("paymentType");

    if(paymentMethod==="Cash on Delivery"){

        alert("Cash on Delivery selected!\nPlease pay when your order is delivered.");

    }else{

        alert("Payment Successful!");

    }

    window.location.href="order.html";

}


});


window.addEventListener("pageshow", function () {

    if (performance.navigation.type === 2) {
        localStorage.removeItem("paymentType");
    }

});