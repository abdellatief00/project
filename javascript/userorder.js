
document.addEventListener("DOMContentLoaded", function () {
    const currentUser = JSON.parse(localStorage.getItem("current_user")) || {};
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    const products = JSON.parse(localStorage.getItem("products")) || [];
    const tbodyOrders = document.getElementById("tbodyOrders");

    // Sort orders by date (oldest to newest)
    const UserOrders = orders.filter(order => order.userId === currentUser.id)
                            .sort((a, b) => new Date(a.date) - new Date(b.date));

    UserOrders.forEach((order, index) => {
        const orderNumber = index + 1; // Order number starts from 1 for the oldest order
        let state="delivery"; // Order number starts from 1 for the oldest order
        let currentState=Object.keys(order.state);    
        for (let i = 0; i < currentState.length; i++) {
            if(order.state[currentState[i]]=="pending"){
                state="pending";
                break;
            }

}

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${orderNumber}</td>
            <td>${order.paymentMethod}</td>
            <td>${order.total}</td>
            <td>${new Date(order.date).toLocaleString()}</td>
            <td>${state}</td>
        `;

        const buttonCell = document.createElement("td");
        const button = document.createElement("button");
        button.className = "btn btn-link";
        button.type = "button";
        button.innerHTML = '<i class="fa-solid fa-chevron-down arrow"></i>';

        buttonCell.appendChild(button);
        row.appendChild(buttonCell);

        tbodyOrders.appendChild(row);

        const productRow = document.createElement("tr");
        productRow.innerHTML = `
            <td colspan="6">
                <div class="collapse" id="collapse${index}">
                    ${generateProductTable(order.cart, products)}
                </div>
            </td>
        `;

        tbodyOrders.appendChild(productRow);

        button.addEventListener("click", function () {
            const collapseDiv = document.getElementById(`collapse${index}`);
            const isCollapsed = collapseDiv.classList.contains("show");

            if (isCollapsed) {
                collapseDiv.classList.remove("show");
                button.innerHTML = '<i class="fa-solid fa-chevron-down arrow"></i>';
            } else {
                collapseDiv.classList.add("show");
                button.innerHTML = '<i class="fa-solid fa-chevron-up arrow"></i>';
            }
        });
    });
});

function generateProductTable(cart, products) {
        let html = `
            <table class="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Quantity</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Product Image</th>
                        
                    </tr>
                </thead>
                <tbody>
        `;
    
        cart.forEach(item => {
            const productDetails = products.find(product => product.id === item.productId) || {};
            html += `
                <tr>
                    <td>${productDetails.productTitle}</td>
                    <td>${item.quantity}</td>
                    <td>${productDetails.category}</td>
                    <td>${productDetails.price}</td>
                    
                    <td><img src="${productDetails.images[0]}"></td>
                </tr>`;
        });
    
        html += `
                </tbody>
            </table>
        `;
    
        return html;
    }