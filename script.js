const productInfo = {
   plainBurger:{
    name: 'Гамбургер простой',
    price: 10000,
    img:'images/product2.jpg',
    amount: 0,
    id:'plainBurger',
    calories: 300,
    get totalSumm(){
      return this.price * this.amount
    },
    get totalCalories(){
      return this.calories * this.amount
    }
   },
   freshBurger:{
    name: 'Гамбургер FRESH',
    price: 20500,
    img:'images/product1.jpg',
    amount: 0,
    id:'freshBurger',
    calories: 500,
    get totalSumm(){
      return this.price * this.amount
    },
    get totalCalories(){
      return this.calories * this.amount
    }
   },
   freshCombo:{
    name: 'FRESH COMBO',
    price: 31900,
    img:'images/product3.jpg',
    amount: 0,
    id:'freshCombo',
    calories: 1500,
    get totalSumm(){
      return this.price  * this.amount
    },
    get totalCalories(){
      return this.calories * this.amount
    }
   },
}

const extraProduct = {
  doubleMayonnaise:{
    name:'Двойной майонез',
    price: 3000,
    calories: 400
  },
  lettuce:{
    name:'Салатный лист',
    price: 1000,
    calories: 40
  },
  cheese:{
    name:'Сыр',
    price: 4000,
    calories: 500
  },
  
}

const products        = document.querySelectorAll('.main__product'),
      BtnsPlusMinus   = document.querySelectorAll('.main__product-btn'),
      checkbox        = document.querySelectorAll('.main__product-checkbox'),
      basketBtn       = document.querySelector('.addCart'),
      summa            = document.querySelector('.total span'),
      kcalories        = document.querySelector('.kkcall span');
      
BtnsPlusMinus.forEach((btn) => {
  btn.addEventListener('click', plusMinus)
}) 

function plusMinus(){
  const parent      = this.closest(".main__product"),
        parentIndex = parent.getAttribute('id'),
        outAmout    = parent.querySelector('.main__product-num'),
        outPrice    = parent.querySelector('.main__product-price span'),
        outCalories = parent.querySelector('.main__product-call span'),
        btnSymbol   = this.getAttribute("data-symbol")
 
  if(btnSymbol === "+" && productInfo[parentIndex].amount < 15) {
    productInfo[parentIndex].amount++
  }else if(btnSymbol === "-" && productInfo[parentIndex].amount > 0){
    productInfo[parentIndex].amount--
  }    
  
const { amount, totalCalories, totalSumm } = productInfo[parentIndex]

outAmout.innerHTML = amount
outPrice.innerHTML = totalSumm.toLocaleString()
outCalories.innerHTML = totalCalories.toLocaleString() 
}
checkbox.forEach((checkBox) => {
  checkBox.addEventListener("input", check)
})
function check() {
  const parent      = this.closest(".main__product"),
        parentIndex = parent.getAttribute('id'),
        outPrice    = parent.querySelector('.main__product-price span'),
        outCalories = parent.querySelector('.main__product-call span'),
        attr        = this.getAttribute('data-extra');
        
productInfo[parentIndex][attr] = this.checked    

if (this.checked) {
  productInfo[parentIndex].price += extraProduct[attr].price
  productInfo[parentIndex].calories += extraProduct[attr].calories
}else{
  productInfo[parentIndex].price -= extraProduct[attr].price
  productInfo[parentIndex].calories -= extraProduct[attr].calories
}
const { totalCalories, totalSumm } = productInfo[parentIndex]

outPrice.innerHTML = totalSumm.toLocaleString()
outCalories.innerHTML = totalCalories.toLocaleString()
}

const receipt =document.querySelector('.receipt'),
receiptWO = document.querySelector('.receipt__window-out')
window.addEventListener("click", (e) => {
  e.target.classList.contains("receipt")
  ? receipt.classList.remove("active")
  :""
  e.target.classList.contains("receipt__window-btn") ? location.reload() : ""
})

function basket() {
  const productArray = [];
  for(const key  in productInfo) {
    let totalCount = 0;
    const po = productInfo[key];
    if (po.amount) {
      productArray.push(po);
      totalCount += po.amount;
    }
  }
  receiptWO.innerHTML = ''
  for(let i=0; i < productArray.length; i++) {
    receiptWO.innerHTML += cardItemBurger(productArray[i])
  }   
  
  summa.innerHTML = summaProduct()
  kcalories.innerHTML = kcaloriesProduct()
  
}

basketBtn.addEventListener('click', function () {
  receipt.classList.add('active')
  basket()
})

function summaProduct() {
  let total = 0 
  for( const key in productInfo){
    total += productInfo[key].totalSumm
  }
  return total.toLocaleString()
}
function kcaloriesProduct() {
  let total = 0
  for (const key in productInfo){
    total +=productInfo[key].totalCalories
  }
  return total.toLocaleString()
}
function cardItemBurger(productData) {
  const {name, totalSumm: price, amount, img, id} = productData;
  return`
  <div class="wrapper__navbar-product">
        <div class="wrapper__navbar-info">
            <img class="wrapper__navbar-productImage" src="${img}" alt="">
            <div class="wrapper__navbar-infoSub">
                <p class="wrapper__navbar-infoName">${name}</p>
                <p class="wrapper__navbar-infoPrice"><span>${price.toLocaleString()}</span> сум</p>
            </div>
        </div>
        <div class="wrapper__navbar-option" id="${id}_card">
            <button class="wrapper__navbar-symbol fa-minus" data-symbol="-">-</button>
            <output class="wrapper__navbar-count">${amount}</output>
            <button class="wrapper__navbar-symbol fa-plus" data-symbol="+">+</button>
        </div>
    </div>
    `
}

window.addEventListener('click', e =>{
  const btn = e.target;
  if(btn.classList.contains('wrapper__navbar-symbol')){
    const attr = btn.getAttribute('data-symbol')
    const parent = btn.closest('.wrapper__navbar-option')
    if(parent){
      const idProduct = parent.getAttribute('id').split('_')[0];
      console.log(parent);
      
      if(attr == '_')productInfo[idProduct].amount--
      else if (attr == '+')productInfo[idProduct].amount++
      basket()
    }
  }
})



    
      
