let objLinea =localStorage.getItem("products")
let objJson = JSON.parse(objLinea); 

main();

function main() {
  createcart();
  
}
function createcart() {

  // Si le tableau copié du localStorage contient au moins un objet, on affiche le panier et on supprime le message d'erreur.
  if (localStorage.getItem("products")) {
  }

  for (let produit in objJson) {

      //article
      let productRow = document.createElement("article");
      document.getElementById("cart__items").appendChild(productRow)
      productRow.classList.add("cart__item");

      //div article/divimg 
      let productdivimg = document.createElement("div");
      productRow.appendChild(productdivimg);
      productdivimg.classList.add("cart__item__img");

      //div article/divimg/img 
      let productimg = document.createElement("img");
      productdivimg.appendChild(productimg);
      productimg.style.width = "200px";
      productimg.style.height = "200px";
      productimg.setAttribute("src",objJson[produit].image)

      //div article/englobe1
      let englobe1 = document.createElement("div");
      productRow.appendChild(englobe1);
      englobe1.classList.add("cart__item__content");

      //div article/englobe1/description
      let productdescription = document.createElement("div");
      englobe1.appendChild(productdescription);
      productdescription.classList.add("cart__item__content__description");

      //div article/englobe1/description/name
      let productname = document.createElement("h2");
      productdescription.appendChild(productname);
      productname.innerHTML = objJson[produit].name;

      //div article/englobe1/description/color
      let productcolor = document.createElement("p");
      productdescription.appendChild(productcolor);
      productcolor.innerHTML = objJson[produit].color;

      //div article/englobe1/description/price
      let productprice = document.createElement("p");
      productdescription.appendChild(productprice);
      productprice.innerHTML = objJson[produit].price;

      //div article/englobe1/englobe2
      let englobe2 = document.createElement("div");
      englobe1.appendChild(englobe2);
      englobe2.classList.add("cart__item__content__settings");

      //div article/englobe1/englobe2/divquantity
      let productdivquantity = document.createElement("div");
      englobe2.appendChild(productdivquantity);
      productdivquantity.classList.add("cart__item__content__settings__quantity");

      //div article/englobe1/englobe2/quantity
      let productquantity = document.createElement("p");
      productdivquantity.appendChild(productquantity);
      productquantity.innerHTML = objJson[produit].quantity;

      //div article/englobe1/englobe2/deleteItem
      let deleteItem = document.createElement("div");
      englobe2.appendChild(deleteItem);
      deleteItem.classList.add("deleteItem");
      
      }
}
