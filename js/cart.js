let basket = JSON.parse(localStorage.getItem("data")) || [];
let label = document.getElementById('label');

let shoppingCart = document.getElementById('cartItems');
let cartNumber = () =>{
    let cartIcon = document.getElementById('count');
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x,y)=> x+y,0);

};
// adding all items
cartNumber();

let generateItems = ()=>{
    if(basket.length !== 0){
        return (shoppingCart.innerHTML = basket.map((x)=>{
            let {id,item} = x;
            let search =  product.find((x)=> x.id === id) || [];
            let {image,price,title} = search;
            return `
        
         <div class="row d-flex item-cart">
            <div class="col-lg-6 d-flex gap-5 border-bottom border-dark p-3 ">
                    <div class="image align-self-center" style="width:12rem;"><img src=${image} class="img-fluid"></div>
                    <div class="title text-md-6 align-self-center" style="color:rgb(19, 43, 19);">${title}</div>
                    <div class="align-self-center fs-5"><i class="fa-solid fa-peso-sign"></i> ${price}</div>
                    
            </div>
            <div class="col-lg-3 border-bottom border-dark  d-flex justify-content-center">
            <div class="num-box d-flex gap-3 fs-5 align-self-center">
            <i onclick="increment(${id})" class="fa-solid fa-plus align-self-center" ></i>                      
                <div id=${id} class="quantity">${item === undefined? 0:item}</div>
            <i onclick="decrement(${id})" class="fa-solid fa-minus align-self-center"></i> 
        </div>
            </div>
            <div class="col-lg-3 border-bottom border-dark dark  d-flex gap-4 justify-content-end p-5">
                <div class='align-self-center text-center fw-bold'><i class="fa-solid fa-peso-sign"></i>${item *price}</div>
                <div class="delete align-self-center"><i onclick="removeItem(${id})" class="fa-solid fa-x"></i></div>
            </div>

         </div>
            `

        }).join(''))
    }else{
    shoppingCart.innerHTML = ``;
    label.innerHTML = `
    <div class="text-center">
        <h2 class="mb-3"> Your cart is empty</h2>
        <button class="btn btn-success" type="button"><a class="text-light text-decoration-none" href="shop.html">Back to Shop</a> </button>
    </div>`
    }
}

generateItems();


let increment = (id) => {
    let selecetedItem = id;
    let search = basket.find((x)=>(x.id === selecetedItem));

    if(search === undefined){
        basket.push({
            id:selecetedItem,
            item:1,
        });
    }else{
        search.item +=1;
    }
    generateItems();
 update(selecetedItem);
 
 localStorage.setItem("data",JSON.stringify(basket));
};
let decrement = (id) =>{
    let selecetedItem = id;
    let search = basket.find((x)=>(x.id === selecetedItem));

    if(search === undefined) return;
    else if(search.item === 0) return;
    else{
        search.item -=1;
    }
   
    update(selecetedItem);
    basket = basket.filter((x)=> x.item !==0);
    generateItems();
    totalAmount();
    localStorage.setItem("data",JSON.stringify(basket));

};
let update = (id) =>{
    let search = basket.find((x) => x.id === id);

document.getElementById(id).innerHTML = search.item ;
cartNumber();
totalAmount();
};

let removeItem = (id)=>{
let selecetedItem = id;
basket = basket.filter((x)=> x.id !== selecetedItem);

totalAmount();
cartNumber();
generateItems();
localStorage.setItem("data",JSON.stringify(basket));
};
let clearCart = () =>{
    basket = [];
    totalAmount();
    cartNumber();
    generateItems();
    localStorage.setItem("data",JSON.stringify(basket));
}
let totalAmount = () =>{
    if(basket.length !==0){
        let amount = basket.map((x) =>{
            let {item,id} = x;
            let search =  product.find((x)=> x.id === id) || [];
            return item * search.price;
        }).reduce((x,y)=>x+y,0);

        document.getElementById('total').innerHTML = `
      
        <div class="bill d-flex justify-content-center gap-4  p-3">
        <div id="deleteAll"><button onclick="clearCart()" type="button" class="btn btn-danger">Delete All</button></div>
        <div class="checkout"><button type="button" class="btn btn-success"><a href="login.html" class="text-light text-decoration-none">Check-Out</a></button></div>
        <h2 class="text-center">Total Bill:</h2><h2><i class="fa-solid fa-peso-sign "></i>${amount}</h2>
        </div>
        
       `
    }else{
        document.getElementById('total').innerHTML = ``;
    }
  
}
totalAmount();