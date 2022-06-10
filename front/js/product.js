
let params = new URL(document.location).searchParams;//permet d'afficher la page produit spécifique
let id = params.get("id");

let productImg = document.createElement("img");//crait une balise img pour l'img du produit spécifique
            document.querySelector(".item__img").appendChild(productImg);
            productImg.classList.add("img__product");
            productImg.style.height = "204px";
            productImg.style.width = "100%";
//crait les références de chaques parties du formulaire
const productimg = document.querySelector(".img__product");
const producttitle = document.querySelector("#title");
const productPrice = document.querySelector("#price");
const productdescription = document.querySelector("#description");
const productcolors = document.querySelector("#colors");
const productquantity = document.querySelector("#quantity");


function getproducts() {
    fetch(`http://localhost:3000/api/products/${id}`)
      .then(function (response) {
        return response.json();//permet le dialogue avec l'API
      })
      .catch((error) => {
        let limitedWidthBlock = document.querySelector(".limitedWidthBlock");
        limitedWidthBlock.innerHTML = "Erreur d'Affichage Serveur" //si pas de dialogue avec l'API 
      })//permet l'affichage des différentes parties du formualaire
      .then(function (resultatAPI) {
        article = resultatAPI;
        productImg.src = article.imageUrl;
        producttitle.innerHTML = article.name;
        productdescription.innerText = article.description;
      });
  }