import { getProducts, getProduct } from "./firebase.js";

const cart = []

let total = 0; 


const vaciarCa = document.querySelector ('.checkout2')

const vaciar = () => {
  
  total = 0;
  document.querySelector ('.visualTotal').textContent = total;
  cart.length = 0;
  document.querySelector ('.innerCart').innerHTML = '';
}

vaciarCa.addEventListener('click', vaciar);



const checkout = document.querySelector ('.checkout');

const emptyCart = () => {

  total = 0;

  document.querySelector('.visualTotal').textContent = total;

  cart.length = 0;

  document.querySelector('.innerCart').innerHTML = '';

}

checkout.addEventListener('click', emptyCart);



const renderCart = () => {

    const innerCart = document.querySelector('.innerCart');

    innerCart.innerHTML = '';

    cart.forEach (productos => {

        const card = document.createElement('div');

        card.className = 'card mb-3';

        card.innerHTML=`
        
        <div class="row g-0">

         <div class="col-md-4 cart">
           <img src=${productos.data().img} class="img-fluid rounded-start" alt=${productos.data().nombre}>
         </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">${productos.data().nombre}</h5>
        <p class="card-text">$${productos.data().valor}</p>
      </div>
    </div>
  </div>
</div>
`;
innerCart.append(card);

});


        
}

const checkProduct = (id) => cart.some(productos => productos.id === id );

const totalCont = (valor) => {

  const visualTotal = document.querySelector('.visualTotal');

  total += valor;

  visualTotal.textContent = total;

}

const addToCart = async (e) => { 
  if (checkProduct(e.target.id)) {
    return false;

  }
  else {
    const productCart = await getProduct(e.target.id);

    totalCont(productCart.data().valor);

    cart.push(productCart);

    renderCart();

  }
    

}


const addEvent = () => {
    const buyBtn = document.querySelectorAll ('.buyBtn');
     
    buyBtn.forEach(btn => btn.addEventListener('click', addToCart));

}


const renderCards = async (productosArr) => {

    const productos = await productosArr;
    
    const cards = document.querySelector ('.cards');
    

    productos.forEach(productos => {
        const card = document.createElement('div');

        card.className = 'card col-6';

        card.innerHTML = ` 
        <img src=${productos.data().img} class="card-img-top productoImg" alt=${productos.data().nombre}>

        <div class="card-body">
          <h5 class="card-title">${productos.data().nombre}</h5>
          <p class="card-tex text-success">$${productos.data().valor}</p>
          <a href="#" class="btn btn-dark buyBtn" id=${productos.id}>Comprar</a>
        </div>
        `;

        cards.append(card);

    });

    addEvent();
        
}

renderCards(getProducts());










