        function approvePayment() {
            alert('Pagamento aprovado!');
        }
        window.onload = function() {
            if (window.location.pathname.endsWith('carrinho.html')) {
                updateCart();
            }
        };