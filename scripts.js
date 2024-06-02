function updateCart() {
    var cartData = JSON.parse(localStorage.getItem('cartData')) || [];
    var cartTable = document.getElementById('cartTable');
    var cartTotal = 0;

    cartTable.innerHTML = `
        <div class="cart-item" id="cartHeader">
            <div>Produto</div>
            <div>Quantidade</div>
            <div>Preço Unitário</div>
            <div>Total</div>
            <div>Remover</div>
        </div>
    `;

    cartData.forEach((item, index) => {
        var newRow = document.createElement('div');
        newRow.className = 'cart-item';

        var productNameCell = document.createElement('div');
        var quantityCell = document.createElement('div');
        var priceCell = document.createElement('div');
        var totalCell = document.createElement('div');
        var removeCell = document.createElement('div');

        var quantityInput = document.createElement('input');
        quantityInput.type = 'number';
        quantityInput.value = item.quantity;
        quantityInput.min = 1;
        quantityInput.dataset.productName = item.productName;
        quantityInput.onchange = function() {
            updateQuantity(this.dataset.productName, parseInt(this.value));
        };

        var removeButton = document.createElement('button');
        removeButton.textContent = 'Remover';
        removeButton.className = 'remove-btn';
        removeButton.onclick = function() {
            removeProduct(item.productName);
        };

        productNameCell.innerText = item.productName;
        quantityCell.appendChild(quantityInput);
        priceCell.innerText = 'R$' + item.price.toFixed(2);
        totalCell.innerText = 'R$' + (item.quantity * item.price).toFixed(2);
        removeCell.appendChild(removeButton);

        newRow.appendChild(productNameCell);
        newRow.appendChild(quantityCell);
        newRow.appendChild(priceCell);
        newRow.appendChild(totalCell);
        newRow.appendChild(removeCell);

        cartTable.appendChild(newRow);

        cartTotal += item.quantity * item.price;
    });

    document.getElementById('cartTotal').innerText = 'Total: R$' + cartTotal.toFixed(2);
}

function updateQuantity(productName, quantity) {
    var cartData = JSON.parse(localStorage.getItem('cartData')) || [];
    var productIndex = cartData.findIndex(item => item.productName === productName);

    if (productIndex !== -1) {
        if (quantity >= 1) {
            cartData[productIndex].quantity = quantity;
        } else {
            cartData.splice(productIndex, 1);  
        }
        localStorage.setItem('cartData', JSON.stringify(cartData));
        updateCart();  
        updateCartCount();
    }
}

function removeProduct(productName) {
    var cartData = JSON.parse(localStorage.getItem('cartData'));
    cartData = cartData.filter(item => item.productName !== productName);
    localStorage.setItem('cartData', JSON.stringify(cartData));
    updateCart(); 
    updateCartCount();
}

function updateCartCount() {
    var cartData = JSON.parse(localStorage.getItem('cartData')) || [];
    var cartCount = cartData.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cartCount').innerText = cartCount;
}

window.onload = function() {
    updateCartCount();

    if (window.location.pathname.endsWith('carrinho.html')) {
        updateCart(); 
    }
};
