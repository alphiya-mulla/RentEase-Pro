// const notificationList = document.getElementById("notificationList");

// let notifications = [];

// // ---------------- ORDER NOTIFICATIONS ----------------

// const history = JSON.parse(localStorage.getItem("history")) || [];

// history.forEach(order=>{

//     notifications.push({

//         icon:"fa-box",

//         title:"Order Placed Successfully",

//         message:`Your order #RE${order.orderId} has been placed successfully.`,

//         time:order.date

//     });

// });

// // ---------------- SUPPORT NOTIFICATIONS ----------------

// const supportRequests = JSON.parse(localStorage.getItem("supportRequests")) || [];

// supportRequests.forEach(request=>{

//     notifications.push({

//         icon:"fa-screwdriver-wrench",

//         title:"Support Request Submitted",

//         message:`Support request for ${request.product} is ${request.status}.`,

//         time:request.date

//     });

// });

// // ---------------- OFFERS ----------------

// notifications.push({

//     icon:"fa-gift",

//     title:"Special Offer",

//     message:"Get 10% OFF when you extend your rental period.",

//     time:"Today"

// });

// // ---------------- RENTAL REMINDER ----------------

// notifications.push({

//     icon:"fa-clock",

//     title:"Rental Reminder",

//     message:"Your rented products may be nearing their end date. Check your orders to extend your rental if needed.",

//     time:"Today"

// });

// localStorage.setItem("notificationCount",notifications.length);
// // ---------------- SHOW NOTIFICATIONS ----------------

// if(notifications.length===0){

//     notificationList.innerHTML=`

//     <div class="empty">

//         <i class="fa-solid fa-bell-slash"></i>

//         <h2>No Notifications</h2>

//         <p>You're all caught up!</p>

//     </div>

//     `;

// }

// else{

//     notifications.reverse();

//     notifications.forEach(notification=>{

//         notificationList.innerHTML+=`

//         <div class="notification">

//             <div class="icon">

//                 <i class="fa-solid ${notification.icon}"></i>

//             </div>

//             <div class="content">

//                 <h3>${notification.title}</h3>

//                 <p>${notification.message}</p>

//                 <div class="time">${notification.time}</div>

//             </div>

//         </div>

//         `;

//     });

// }

// localStorage.setItem("notificationSeen",notifications.length);
// updateNotificationBadge();


const notificationList = document.getElementById("notificationList");

let notifications = [];

// ---------------- ORDER NOTIFICATIONS ----------------

const history = JSON.parse(localStorage.getItem("history")) || [];

history.forEach(order => {

    notifications.push({

        icon: "fa-box",

        title: "Order Placed Successfully",

        message: `Your order #RE${order.orderId} has been placed successfully.`,

        time: order.date

    });

});

// ---------------- SUPPORT NOTIFICATIONS ----------------

const supportRequests =
JSON.parse(localStorage.getItem("supportRequests")) || [];

supportRequests.forEach(request => {

    notifications.push({

        icon: "fa-screwdriver-wrench",

        title: "Support Request Submitted",

        message: `Support request for ${request.product} is ${request.status}.`,

        time: request.date

    });

});

// ---------------- SAVED NOTIFICATIONS ----------------

const savedNotifications =
JSON.parse(localStorage.getItem("notifications")) || [];

notifications.push(...savedNotifications);

// ---------------- SAVE TOTAL COUNT ----------------

const total =
    Number(localStorage.getItem("notificationCount")) || 0;

if (total === 0) {

    localStorage.setItem(
        "notificationCount",
        notifications.length
    );

}

// ---------------- SHOW NOTIFICATIONS ----------------

if (notifications.length === 0) {

    notificationList.innerHTML = `

    <div class="empty">

        <i class="fa-solid fa-bell-slash"></i>

        <h2>No Notifications</h2>

        <p>You're all caught up!</p>

    </div>

    `;

}

else {

    notifications.reverse();

    notifications.forEach(notification => {

        notificationList.innerHTML += `

        <div class="notification">

            <div class="icon">

                <i class="fa-solid ${notification.icon}"></i>

            </div>

            <div class="content">

                <h3>${notification.title}</h3>

                <p>${notification.message}</p>

                <div class="time">${notification.time}</div>

            </div>

        </div>

        `;

    });

}

// ---------------- MARK AS SEEN ----------------

localStorage.setItem(
    "notificationSeen",
    notifications.length
);

updateNotificationBadge();