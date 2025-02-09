


// Evento 5: Actualizar el contador de productos en el carrito 
let cartItemCount = 0; 
document.querySelectorAll('.add-to-cart').forEach(button => { 
    button.addEventListener('click', function() { 
        cartItemCount++; // Incrementar el contador cuando se agrega un producto 
        document.getElementById('cart-item-count').textContent = cartItemCount; 
    }); 
});




// Evento 6: Notificación de producto agregado al carrito 
document.querySelectorAll('.add-to-cart').forEach(button => { 
    button.addEventListener('click', function() { 
        const notification = document.createElement('div'); 
        notification.className = 'cart-notification'; 
        notification.textContent = 'Producto agregado al carrito con éxito'; 
        
        document.body.appendChild(notification); // Mostrar notificación 
        setTimeout(() => { 
            notification.remove(); // Eliminar notificación después de 5 segundos 
        }, 5000); 
    }); 
});



// Nuevo código para Evento 2
// Evento 2: Cambiar el color del producto cuando se agregue al carrito
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const productCard = this.parentElement;
        productCard.style.backgroundColor = '#FFC0CB'; // Cambiar a rosa 
        setTimeout(() => {
            productCard.style.backgroundColor = ''; // Restaurar color original después de 10 segundo
        }, 10000);
    });
});

// Nuevo código para Evento 3
// Evento 3: Cambiar el total automáticamente cuando se ingresen puntos de lealtad
document.getElementById('loyalty-points').addEventListener('input', function() {
    const loyaltyPoints = parseInt(this.value);
    const discountCode = document.getElementById('discount-code').value;

    // Aplicar puntos de lealtad y código de descuento
    let newTotal = total - loyaltyPoints;
    if (discountCode === 'DESC10') {
        newTotal *= 0.9;
    }

    if (newTotal < 0) newTotal = 0;

    document.getElementById('cart-total').textContent = newTotal.toFixed(2);
});

// Evento extra
// Agregar evento de 'mouseenter' a cada producto
document.querySelectorAll('.product-card').forEach(product => {
    product.addEventListener('mouseenter', function() {
        // Cambiar el fondo del producto cuando el mouse se pasa sobre él
        this.style.backgroundColor = '#ff3371';

        // Mostrar un mensaje en el producto
        const hoverMessage = document.createElement('span');
        hoverMessage.textContent = '¡Explora este producto!';
        hoverMessage.className = 'hover-message';
        hoverMessage.style.fontSize = '12px';
        hoverMessage.style.color = '#333';
        hoverMessage.style.position = 'absolute';
        hoverMessage.style.bottom = '5px';
        hoverMessage.style.left = '5px';
        
        this.appendChild(hoverMessage);
    });

    product.addEventListener('mouseleave', function() {
        // Restaurar el fondo del producto y remover el mensaje cuando el mouse salga
        this.style.backgroundColor = '';

        const hoverMessage = this.querySelector('.hover-message');
        if (hoverMessage) {
            this.removeChild(hoverMessage);
        }
    });
});




let total = 0;
let discountApplied = false;
let discountAmount = 0;

// Elementos del carrito
const cartTotalElement = document.getElementById('cart-total');
const cartItemsElement = document.getElementById('cart-items');

// Agregar productos al carrito
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const price = parseInt(this.getAttribute('data-price'));
        const productName = this.parentElement.querySelector('h2').textContent;

        total += price;
        cartTotalElement.textContent = `$${total.toFixed(2)}`;

        // Mostrar productos en el carrito
        const productItem = document.createElement('p');
        productItem.textContent = `${productName} - $${price}`;
        cartItemsElement.appendChild(productItem);
    });
});

// Aplicar descuento
document.getElementById('apply-discount').addEventListener('click', function() {
    const discountCode = document.getElementById('discount-code').value;
    if (discountCode === 'enviaflores.com' && !discountApplied) {
        discountAmount = total * 0.1; // 10% de descuento
        total -= discountAmount;
        discountApplied = true;

        // Mostrar el descuento aplicado
        const discountMessage = document.createElement('p');
        discountMessage.textContent = `Descuento aplicado: -$${discountAmount.toFixed(2)}`;
        cartItemsElement.appendChild(discountMessage);
    }
    cartTotalElement.textContent = `$${total.toFixed(2)}`;
});

//MODIFICACION DE CODIGO PAULINA
// Abrir ventana de pago
document.getElementById('checkout').addEventListener('click', function() {
    const checkoutWindow = window.open('', '_blank');
    checkoutWindow.document.write(`
        <html>
        <head>
            <title>Pago</title>
            <style>
                body { text-align: center; font-family: Arial, sans-serif; padding: 20px; }
                .container { max-width: 400px; margin: auto; padding: 20px; border: 1px solid #ccc; border-radius: 10px; }
            </style>
        </head>
        <body>
            <div class="container">
                <h2>Resumen de Compra</h2>
                <p>Total: $${total.toFixed(2)}</p>
                ${discountApplied ? `<p>Descuento aplicado: -$${discountAmount.toFixed(2)}</p>` : ''}
                <h3>Método de Pago</h3>
                <select>
                    <option>Tarjeta de Crédito</option>
                    <option>PayPal</option>
                    <option>Transferencia Bancaria</option>
                </select>
                <br><br>
                <button onclick="window.close()">Confirmar Pago</button>
            </div>
        </body>
        </html>
    `);
});


    // Aplicar puntos de lealtad (ejemplo: cada punto resta $1 del total)
   

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const price = parseInt(this.getAttribute('data-price'));
            const productName = this.parentElement.querySelector('h2').textContent;

            total += price;
            document.getElementById('cart-total').textContent = total;

            const cartItems = document.getElementById('cart-items');
            const productItem = document.createElement('p');
            productItem.textContent = `${productName} - $${price}`;
            cartItems.appendChild(productItem);
        });
    });

    //MODIFICACION DE CODIGO ANGELA 
    document.getElementById('apply-discount').addEventListener('click', function() {
        const discountCode = document.getElementById('discount-code').value;
        if (discountCode === 'enviaflores.com') {
            total = total * 0.8;  // Aplica 20% de descuento
            showDialog(`¡Descuento aplicado! Nuevo total: $${total.toFixed(2)}`);
        } else {
            showDialog('Código de descuento inválido.');
        }
        document.getElementById('cart-total').textContent = total.toFixed(2);
    });

    function showDialog(message) {
        document.getElementById('discount-message').textContent = message;
        document.getElementById('discount-dialog').style.display = 'block';
    }

    function closeDialog() {
        document.getElementById('discount-dialog').style.display = 'none';
    }

    // Asegurarse de que el total no sea negativo
    if (total < 0) total = 0;

    

