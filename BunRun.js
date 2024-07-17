// JavaScript Document
Javascript document.addEventListener('DOMContentLoaded', () => {
    const db = firebase.firestore();

    const orderForm = document.getElementById('orderForm');
    const foodList = document.getElementById('foodList');

    // Load orders from Firestore
    function loadOrders() {
        db.collection('orders').onSnapshot((snapshot) => {
            foodList.innerHTML = ''; // Clear the list
            snapshot.forEach((doc) => {
                const order = doc.data();
                addFoodItem(order.foodItem, order.quantity, doc.id);
            });
        });
    }

    // Save a new order to Firestore
    orderForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const foodItem = document.getElementById('foodItem').value;
        const quantity = document.getElementById('quantity').value;

        db.collection('orders').add({
            foodItem,
            quantity
        });

        orderForm.reset();
    });

    // Update an order in Firestore
    function updateOrder(id, quantity) {
        db.collection('orders').doc(id).update({
            quantity
        });
    }

    // Delete an order from Firestore
    function deleteOrder(id) {
        db.collection('orders').doc(id).delete();
    }

    function addFoodItem(foodItem, quantity, id) {
        const li = document.createElement('li');

        const itemSpan = document.createElement('span');
        itemSpan.textContent = foodItem;

        const quantityInput = document.createElement('input');
        quantityInput.type = 'number';
        quantityInput.value = quantity;
        quantityInput.min = 1;
        quantityInput.addEventListener('change', () => {
            if (quantityInput.value < 1) {
                quantityInput.value = 1;
            }
            updateOrder(id, quantityInput.value);
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Remove';
        deleteButton.addEventListener('click', () => {
            deleteOrder(id);
        });

        li.appendChild(itemSpan);
        li.appendChild(quantityInput);
        li.appendChild(deleteButton);
        foodList.appendChild(li);
    }

    loadOrders();
});
