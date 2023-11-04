const cartIcon = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const closeCart = document.querySelector("#cart-close");

cartIcon.addEventListener("click",() => {
    cart.classList.add("active");
});

cartIcon.addEventListener("click",() => {
    cart.classList.remove("active");
});

if(document.reayState == "loading"){
    document.addEventListener('DOMContentLoaded',start);
}else{
    start();
}

//----------Start---------
function start(){
    addEvents();
}

//---------update---------
function update(){
    addEvents();
    updateTotal();
}

//-------add events------
function addEvents(){
    //To remove items from the cart
    let cartRemove_btns = document.querySelectorAll(".cart-remove");
    console.log(cartRemove_btns);
    cartRemove_btns.forEach((btn) => {
        btn.addEventListener("click",handle_removeCartItem);
    });


    //Change item quantity
    let cartQuantity_inputs = document.querySelectorAll('.cart-quantity');
    cartQuantity_inputs.forEach(input =>{
        input.addEventListener("change",handle_changeItemQuantity);
    });

    //adding item to cart
    let addCart_btns = document.querySelectorAll(".details-sub-button");
    addCart_btns.forEach((btn)=>{
        btn.addEventListener("click", handle_addCartItem);
    });

    //Buy
    const buy_btn = document.querySelector(".btn-buy");
    buy_btn.addEventListener("click",handle_buyOrder);
}

//--------Handle events functions-----

let itemAdded = []

function handle_removeCartItem() {
    this.parentElement.remove();
    itemsAdded = itemsAdded.filter(
        el=>
        el.title != 
        this.parentElement.querySelector('.cart-product-title').innerHTML
    );
    update();
}

function handle_changeItemQuantity(){
    if(isNaN(this.value) || this.value<1){
        this.value = 1;
    }
    this.value = Math.floor(this.value);
    update();
}

function handle_addCartItem(){
    let product = this.parentElement;
    let title = product.querySelector(".details-sub-title").innerHTML;
    let price = product.querySelector(".prie").innerHTML;
    let imgSrc = document.querySelector(".food-items-image").getattribute('src');
    console.log(title,price,imgSrc);

    let newTotal = {
        title,
        price,
        imgSrc,
    };


    //handle item is already in cart
    if(itemAdded.find(el => el.title == newToAdd.title)){
        alert("This item already exist in ur cart!");
        return ;
    }else{
        itemsAdded.push(newToAdd);
    }

    let cartBoxElement = cartBoxComponent(title,price,imgSrc);
    let newNode = document.createElement("div");
    newNode.innerHTML = cartBoxElement;
    const cartContent = cart.querySelector(".cart-content");
    cartContent.appendChild(newNode);

    update();
}

function handle_buyOrder(){
    if(itemsAdded.length <= 0){
        alert("There is no order to Place yet!! ");
        return ;
    }
    const cartContent = cart.querySelector(".cart-content");
    cartContent.innerHTML = "";
    alert("Your order is Placed successfully !!");
    itemsAdded = [];

    update();
}

//-------update functions------------
function updateTotal(){
    let cartBoxes = document.querySelectorAll('.cart-box');
    const totalElement = cart.querySelector('.total-price');
    let total = 0;
    cartBoxes.forEach((cartBox)=>{
        let priceElement = cartBox.querySelector(".cart-price");
        let price = parseFloat(priceElement.innerHTML.replace("Rs", ""));
        let quantity = cartBox.querySelector(".cart-quantity").value;
        total += price*quantity;
    });

    totalElement.innerHTML = "Rs  "+ total;
}



//----------HTML components----------
/*function CartBoxComponent(title,price,imgSrc){
    return `
    <div class = "cart-box">
        <img class = "cart-img" src="${imgSrc}">
        <div class="detail-box">
            <div class = "cart-product-title">${title}</div>
            <div class ="cart-price">${price}</div>
            <input type="number" value="1" class = "cart-quantity">
        </div>
        <!-- Remove -->
        <i style='font-size:24px' class='cart-remove'>&#xf218;</i>
    </div>`;
}*/