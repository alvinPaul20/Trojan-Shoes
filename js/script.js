
let shop = document.getElementById('root');

let basket = JSON.parse(localStorage.getItem("data")) || [];

let generateShop = () =>{

    return(shop.innerHTML = product.map((x)=>{
        let {id,image,title,price} = x;
        let search = basket.find((x) => x.id === id) || []        
        return `
        <div class='col-xl-3 col-lg-4 col-sm-6 d-flex justify-content-center flex-column mb-3 ' id=product-id-${id} >
                        <div class="image mb-2 d-flex justify-content-center w-100"">
                             <img src="${image}" class="img-fluid" alt="">
                        </div>
                    <div class="text">
                        <h5 class="title">
                        ${title}
                      
                            
                    </div>
                    <div class="price d-flex gap-5">
                    <h5 class="fw-normal ">
                    <i class="fa-solid fa-peso-sign"></i> ${price}</h5>
                    <div class="num-box d-flex gap-3 fs-5 align-self-center">
                        <i onclick="increment(${id})" class="fa-solid fa-plus align-self-center" ></i>                      
                            <div id=${id} class="quantity">${search.item === undefined? 0:search.item}</div>
                        <i onclick="decrement(${id})" class="fa-solid fa-minus align-self-center"></i> 
                    </div>
                    </div>
                    <div class="size fs-5 mb-3">
                            <select name="size" id="size" class="w-100">
                            <option value="37">37</option>
                            <option value="38">38</option>
                            <option value="39">39</option>
                            <option value="40">40</option>
                            <option value="41">41</option>
                            <option value="42">42</option>
                            <option value="43">43</option>
                         <option value="44">44</option>
                         </select> 
                 </div>
            
                       
            
            </div>` 
    }).join(''));
};
generateShop();



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
    
 update(selecetedItem);
 
 localStorage.setItem("data",JSON.stringify(basket));
}
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
    localStorage.setItem("data",JSON.stringify(basket));

}
let update = (id) =>{
    let search = basket.find((x) => x.id === id);

document.getElementById(id).innerHTML = search.item ;
cartNumber();
};

let cartNumber = () =>{
    let cartIcon = document.getElementById('count');
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x,y)=> x+y,0);

};
cartNumber();