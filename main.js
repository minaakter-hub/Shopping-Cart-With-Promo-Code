const catB = document.querySelector('#catagoryButton');
const productList = document.querySelector('#productList'); 


fetch("https://fakestoreapi.com/products/categories")
    .then(response => response.json())
    .then(data => { 
       
        data.forEach(category => {                
          
            const escapedCategory = category.replace(/'/g, "&#39;").replace(/"/g, "&quot;");

          
            const button = document.createElement('button');
            button.className = "px-4 py-2 rounded-xl bg-gray-100 text-gray-600 hover:bg-purple-600 hover:text-white hover:shadow-lg hover:shadow-purple-200 transition-all text-sm sm:text-base whitespace-nowrap";
            button.innerHTML = escapedCategory;
            button.addEventListener('click', () => catagorySelect(category)); 
            catB.appendChild(button);
        });
    })
    .catch(error => console.error("Error fetching categories:", error));


function showAllProducts() {
    fetch("https://fakestoreapi.com/products")
        .then(response => response.json())
        .then(data => {
            displayProducts(data);
        })
        .catch(error => console.error("Error fetching products:", error));
}


function catagorySelect(category) {
    fetch(`https://fakestoreapi.com/products/category/${category}`)
        .then(response => response.json())
        .then(data => {
            displayProducts(data); 
        })
        .catch(error => console.error("Error fetching products for category:", error));
}


function displayProducts(products) {
    productList.innerHTML = ""; 
    products.forEach(product => {
        productList.innerHTML += `
            <div class="max-w-sm-40 bg-white shadow-lg rounded-lg overflow-hidden p-4">
                <img src="${product.image}" alt="${product.title}" class="w-full h-25 object-cover">
                <div class="mt-4">
                    <h2 class="text-lg font-semibold text-gray-800">${product.title}</h2>
                    <p class="text-gray-600">$<span class="font-bold">${product.price}</span></p>
                </div>
                <div class="flex items-center mt-4">
                    <button class="bg-gray-300 text-gray-800 px-3 py-1 rounded-l" onclick="decreaseQuantity(${product.id})">-</button>
                    <input type="number" id="quantity-${product.id}" value="1" class="w-12 text-center border border-gray-300" min="1">
                    <button class="bg-gray-300 text-gray-800 px-3 py-1 rounded-r" onclick="increaseQuantity(${product.id})">+</button>
                </div>
               <button class="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition" 
    onclick="addToCart('${product.title.replace(/'/g, "\\'")}', ${product.price}, '${product.image.replace(/'/g, "\\'")}')">
    Add to Cart
</button>
            </div>
        `;
    });
}


function decreaseQuantity(productId) {
    const quantityInput = document.getElementById(`quantity-${productId}`);
    let quantity = parseInt(quantityInput.value);
    if (quantity > 1) {
        quantityInput.value = quantity - 1;
    }
}

function increaseQuantity(productId) {
    const quantityInput = document.getElementById(`quantity-${productId}`);
    let quantity = parseInt(quantityInput.value);
    quantityInput.value = quantity + 1;
}
document.addEventListener("DOMContentLoaded", function () {
    showAllProducts(); 
});