
const cartIcon = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const closeCart = document.querySelector("#cart-close");

cartIcon.addEventListener("click",() => {
    cart.classList.add("active");
});

closeCart.addEventListener("click",() => {
    cart.classList.remove("active");
});

if(document.readyState == "loading"){
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
    itemAdded = itemAdded.filter(
        (el)=>
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
//const imgSrc = document.getElementsByClassName('food-items-image')
function handle_addCartItem(){
    let product = this.parentElement;
    let title = product.querySelector(".details-sub-title").innerHTML;
    let price = product.querySelector(".price").innerHTML;
    for(let i = 0;i<9;i++){
        //var imgSrc = document.getElementsByClassName("food-items-image")[i].src;
        if(title=="Aloo-Parotta"){
            var imgSrc = document.getElementsByClassName("food-items-image")[1].src;
            break;
        }
        if(title=="Poori"){
            var imgSrc = document.getElementsByClassName("food-items-image")[2].src;
            break;
        }
        if(title=="Dosa"){
            var imgSrc = document.getElementsByClassName("food-items-image")[0].src;
            break;
        }
        if(title=="Chole Batture"){
            var imgSrc = document.getElementsByClassName("food-items-image")[3].src;
            break;
        }
        if(title=="Avalakki"){
            var imgSrc = document.getElementsByClassName("food-items-image")[4].src;
            break;
        }
        if(title=="Kerala-Parotta"){
            var imgSrc = document.getElementsByClassName("food-items-image")[5].src;
            break;
        }
        if(title=="Noodles"){
            var imgSrc = document.getElementsByClassName("food-items-image")[6].src;
            break;
        }
        if(title=="Kara-bath"){
            var imgSrc = document.getElementsByClassName("food-items-image")[7].src;
            break;
        }
        if(title=="set-dosa"){
            var imgSrc = document.getElementsByClassName("food-items-image")[8].src;
            break;
        }
        
    }
    //let imgSrc = document.querySelector(".food-items-image").src;
    //let imgSrc = product.querySelector(".food-items-image").src;
    //var imgSrc = document.getElementById("Img").src;
    
    //console.log(title,price,imgSrc);
    
    let newToAdd = {
        title,
        price,
        imgSrc,
    };


    //handle item is already in cart
    if(itemAdded.find((el) => el.title == newToAdd.title)){
        alert("This item already exist in ur cart!");
        return ;
    }else{
        itemAdded.push(newToAdd);
    }

    let cartBoxElement = CartBoxComponent(title,price,imgSrc);
    let newNode = document.createElement("div");
    newNode.innerHTML = cartBoxElement;
    const cartContent = cart.querySelector(".cart-content");
    cartContent.appendChild(newNode);

    update();
}

function handle_buyOrder(){
    if(itemAdded.length <= 0){
        alert("There is no order to Place yet!! ");
        return;
    }
    const cartContent = cart.querySelector(".cart-content");
    cartContent.innerHTML = '';
    alert("Your order is Placed successfully !!");
    itemAdded = [];

    update();
}

//-------update functions------------
function updateTotal(){
    let cartBoxes = document.querySelectorAll('.cart-box');
    const totalElement = cart.querySelector('.total-price');
    let total = 0;
    cartBoxes.forEach((cartBox) => {
        let priceElement = cartBox.querySelector(".cart-price");
        let price = parseFloat(priceElement.innerHTML.replace("Rs", ""));
        let quantity = cartBox.querySelector(".cart-quantity").value;
        total += price*quantity;
    });

    totalElement.innerHTML = "Rs"+ total;
}



//----------HTML components----------
function CartBoxComponent(title,price,imgSrc){
    return `
    <div class = "cart-box">
        <img src=${imgSrc} class = "cart-img" >
        <div class="detail-box">
            <div class = "cart-product-title">${title}</div>
            <div class ="cart-price">${price}</div>
            <input type="number" value="1" class = "cart-quantity">
        </div>
        <!-- Remove -->
        <i style='font-size:24px' class='fas fa-cart-arrow-down cart-remove'></i>
    </div>`;
}