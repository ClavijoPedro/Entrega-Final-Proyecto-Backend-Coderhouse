"use strict";

//variable global del id
let cartId;


//opciones fetch
const baseUrl = '/api/carrito'
const fetchOptions ={
    method:'post',
    mode: 'cors',
    headers: {
        'Content-Type': 'application/json'
    }
};



//CREA CARRITO Y GUARDA EL PRODUCTO (GUARDA ID CARRITO EN VARIABLE GLOBAL)
async function addToCart(id) {
    try{
        if(!cartId){
            const newCart = await fetch(baseUrl, fetchOptions);
            const cartData = await newCart.json();
            cartId = cartData.id
            const addProduct = await fetch(`${baseUrl}/${cartId}/productos/${id}`,fetchOptions)
            console.log('carrito creado:',cartId)
            return
        }
        const addProduct = await fetch(`${baseUrl}/${cartId}/productos/${id}`,fetchOptions)
    }catch (error) {console.log(error)}
};


//TRAE PRODUCTOS CARRITO Y LOS IMPRIME
async function showCart() {
    const cartView = document.getElementById('cartItems');
    const btnConfirm = document.getElementById('btnConfirm')
    const btnDelCart = document.getElementById('btnDelCart')
    try{
        if(cartId){
            const cart = await fetch(`${baseUrl}/${cartId}/productos`, {method:'get'});
            const cartData = await cart.json()
            if(cartData.length){
                btnConfirm.classList.remove('d-none')
                btnDelCart.classList.remove('d-none')
            }
            const cartProducts = cartData.map( p => (
              ` <tr id='${p._id}'>
                  <td><img class="tblImg" src=${p.image} alt="imgProd"></td>
                  <td>${p.name}</td>
                  <td>$${p.price}</td>
                  <td><button onclick="deleteFromCart('${p._id}')" class="btn-close"></button></td>
                </tr>
              `
            ));
            cartView.innerHTML = cartProducts;
        }
    }catch (error) {console.log(error)}
};


//ELIMINA PRODUCTO DEL CARRITO
async function deleteFromCart(id) {
    const cartRow = document.getElementById(id)
    try{
        await fetch(`${baseUrl}/${cartId}/productos/${id}`, {method:'delete'})
        cartRow.remove()
        console.log('producto eliminado')
    }catch(error){console.log(error)}
};


//ELIMINA CARRITO
async function deleteCart(id){
    const cartView = document.getElementById('cartItems');
    try{
        const cart = await fetch(`${baseUrl}/${cartId}`, {method:'delete'});
        cartView.innerHTML='';
        cartId = '';
        console.log('carrito eliminado')
    }catch(error){console.log(error)}
};


//ENVIA ORDEN DE PRODUCTOS
const sendOrder = async () => {
    const cartView = document.getElementById('cartItems')
    try{
        const orderSended = await fetch(`${baseUrl}/${cartId}/order`, fetchOptions);
        console.log('orden enviada')
        cartView.innerHTML = 
            `<tr class="text-center">
                <td colspan="3" class="py-3 table-info">Su código de pedido es:<br><b>${cartId}<b></td>
            </tr>`
        cartId = '';
    }catch(error){ console.log(error)}
    
};