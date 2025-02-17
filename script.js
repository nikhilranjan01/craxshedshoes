let searchform = document.querySelector('.search-form');

document.querySelector('#search-btn').onclick = () =>{
    searchform.classList.toggle('active');
    navbar.classList.remove('active');
}

let navbar = document.querySelector('.navbar');

document.querySelector('#menu-btn').onclick = () =>{
    navbar.classList.toggle('active');
    searchform.classList.remove('active');
}

let slides = document.querySelectorAll('.home .slides-container .slide');
let index = 0

function next(){
    slides[index].classList.remove('active');
    index = (index + 1) % slides.length;
    slides[index].classList.add('active');
}

function prev(){
    slides[index].classList.remove('active');
    index = (index - 1 + slides.length) % slides.length;
    slides[index].classList.add('active');
}

window.onscroll = () =>{
    searchform.classList.remove('active');
    navbar.classList.remove('active');

    if(window.scrollY > 30){
        document.querySelector('header').classList.add('header-active');
    }
    else{
        document.querySelector('header').classList.remove('header-active');
    }

}

var swiper = new Swiper(".featured-slider", {
    loop: true,
    centeredSlides: true,
    spaceBetween: 20,
    autoplay:{
        delay: 9500,
        disableOnInteraction:false,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    breakpoints:{
        0:{
            slidesPerView: 1,
        },
        450:{
            slidesPerView: 2,
        },
        768:{
            slidesPerView: 3,
        },
        1200:{
            slidesPerView: 4,
        },
    },
});

let cart = [];
let cartCount = document.getElementById("cart-count");
let cartItems = document.getElementById("cart-items");
let cartDropdown = document.getElementById("cart-dropdown");
let clearCartBtn = document.getElementById("clear-cart");

// Add to Cart Functionality
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function(event) {
        event.preventDefault();
        
        let productName = this.closest('.content').querySelector('h3').innerText;
        let productPrice = this.closest('.content').querySelector('.price').innerText;
        let productImage = this.closest('.swiper-slide').querySelector('img').src;

        let product = { name: productName, price: productPrice, image: productImage };
        cart.push(product);

        updateCart();
        alert(productName + " added to cart!");
    });
});

// Update Cart Display
function updateCart() {
    let cartCount = document.getElementById("cart-count");
    
    // Update the number of items in the cart
    cartCount.textContent = cart.length;
    
    // Show or hide the counter based on cart size
    if (cart.length > 0) {
        cartCount.style.display = "block";
    } else {
        cartCount.style.display = "none";
    }

    // Update cart items in the dropdown
    let cartItems = document.getElementById("cart-items");
    cartItems.innerHTML = "";

    cart.forEach((item, index) => {
        let li = document.createElement("li");
        li.innerHTML = `
            <img src="${item.image}" width="50">
            <span>${item.name} - ${item.price}</span>
            <button class="remove-item" data-index="${index}">X</button>
        `;
        cartItems.appendChild(li);
    });

    addRemoveItemEvent();
}


// Show/Hide Cart
document.getElementById("cart-btn").addEventListener("click", function(event) {
    event.preventDefault();
    cartDropdown.classList.toggle("show");
});

// Remove Item from Cart
function addRemoveItemEvent() {
    document.querySelectorAll(".remove-item").forEach(button => {
        button.addEventListener("click", function() {
            let index = this.getAttribute("data-index");
            cart.splice(index, 1);
            updateCart();
        });
    });
}

// Clear Cart
clearCartBtn.addEventListener("click", function() {
    cart = [];
    updateCart();
});

document.querySelector(".shop-now").addEventListener("click", function(event) {
    event.preventDefault();
    document.querySelector("#products").scrollIntoView({ behavior: "smooth" });
});





document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault();

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    let subject = document.getElementById("subject").value;
    let message = document.getElementById("message").value;

    let mailData = {
        name: name,
        email: email,
        phone: phone,
        subject: subject,
        message: message
    };

    fetch("https://formspree.io/f/meoepjze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(mailData)
    })
    .then(response => {
        if (response.ok) {
            document.getElementById("success-msg").style.display = "block";
            document.getElementById("contact-form").reset();
        } else {
            alert("Error sending message. Please try again.");
        }
    })
    .catch(error => console.error("Error:", error));
});


document.querySelectorAll(".quick-link").forEach(link => {
    link.addEventListener("click", function(event) {
        event.preventDefault(); // Prevent default link behavior
        let targetId = this.getAttribute("href"); // Get the target section ID
        document.querySelector(targetId).scrollIntoView({ behavior: "smooth" });
    });
});



// Search functionality
let searchBox = document.getElementById('search-box');

searchBox.addEventListener('input', function () {
    let filter = searchBox.value.toLowerCase(); // Get search input
    let products = document.querySelectorAll('.box'); // Select all product boxes

    products.forEach(product => {
        let productName = product.getAttribute('data-name').toLowerCase(); // Get product name
        if (productName.includes(filter)) {
            product.classList.remove('hidden'); // Show matching products
        } else {
            product.classList.add('hidden'); // Hide non-matching products
        }
    });
});












