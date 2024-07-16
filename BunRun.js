// JavaScript Document
document.addEventListener('DOMContentLoaded', function () {
    const orderForm = document.getElementById('orderForm');
    const foodList = document.getElementById('foodList');

    orderForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const foodItem = document.getElementById('foodItem').value;
        const quantity = document.getElementById('quantity').value;

        addFoodItem(foodItem, quantity);

        orderForm.reset();
    });

    function addFoodItem(foodItem, quantity) {
        const li = document.createElement('li');

        const itemSpan = document.createElement('span');
        itemSpan.textContent = foodItem;

        const quantityInput = document.createElement('input');
        quantityInput.type = 'number';
        quantityInput.value = quantity;
        quantityInput.min = 1;
        quantityInput.addEventListener('change', function () {
            if (quantityInput.value < 1) {
                quantityInput.value = 1;
            }
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Remove';
        deleteButton.addEventListener('click', function () {
            foodList.removeChild(li);
        });

        li.appendChild(itemSpan);
        li.appendChild(quantityInput);
        li.appendChild(deleteButton);
        foodList.appendChild(li);
    }
});// JavaScript Document