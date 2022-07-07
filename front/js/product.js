//permet d'afficher la page produit spécifique à travers l'id
let params = new URL(document.location).searchParams;
let id = params.get("id");// le get id permet de recevoir les produits en fonction de leur ID (ici 1 par 1)
console.log("ttt",id);

//On crait une balise img pour l'img du produit spécifique
let productImgdiv = document.createElement("img");
            document.querySelector(".item__img").appendChild(productImgdiv);
            productImgdiv.classList.add("img__product");
            productImgdiv.style.height = "400px";
            productImgdiv.style.width = "100%";

//On crait les références de chaques parties du formulaire
const productimg = document.querySelector(".img__product");
const producttitle = document.querySelector("#title");
const productPrice = document.querySelector("#price");
const productdescription = document.querySelector("#description");
const sofaquantity = document.querySelector("#quantity");

main();

//donne l'ordre d'éxécution asyncrone du programme
function main() {
  getproducts();
  gotoCart();
}


//permet le dialogue avec l'API pour obtenir les informations produits spécifiquements
function getproducts() {
    fetch(`http://localhost:3000/api/products/${id}`)//on va pouvoir recevoir spécifiquement chaque produit par ID spécifique
      .then(function (response) {
        return response.json();
      })

      //si pas de dialogue avec l'API
      .catch((error) => {
        let limitedWidthBlock = document.querySelector(".limitedWidthBlock");
        limitedWidthBlock.innerHTML = "Erreur d'Affichage côté Serveur"  
      })

      //permet l'affichage des différentes parties du formulaire
      .then(function (resultatAPI) {
        article = resultatAPI;
        productimg.src = article.imageUrl; //image
        producttitle.innerHTML = article.name; //titre
        productPrice.innerText = article.price; //prix
        productdescription.innerText = article.description; //description

      let colores = document.getElementById("colors");
      //on crait un boucle ou on se dit : i est égal à 0 mais si i est inférieur au nombre total de couleur disponible alors on rajoute 1 couleur.
      for (let nbcolor = 0; nbcolor < article.colors.length; nbcolor++) {
        //on crait autant de balise option que l'on a de couleur disponible
        let option = document.createElement("option");
        option.classList.add("stocolor");
        option.innerText = article.colors[nbcolor]; //On demande d'afficher le nom de la couleur
        option.setAttribute("value",article.colors[nbcolor])
        colores.appendChild(option);
    }
    });
  }
   
  //Création du panier lors de l'ajout d'un produit et enregistrement des informations produits dans le localStorage
  function gotoCart() {
    const addToCartBtn = document.querySelector(".item__content__addButton");

    let messageerreur = document.createElement("p");
    document.querySelector(".item__content").appendChild(messageerreur);
    
    //l'action du click déclenche une vérification
    addToCartBtn.addEventListener("click", () => { 

        //si la valeur est comprise entre 0 et 100 alors ... 
        if ((sofaquantity.value > 0 && sofaquantity.value < 100) && ((document.querySelector("select").value) != "" )) {
          
          //... création du produit qui sera ajouté au panier 
          let productAdded = {
            name: producttitle.innerHTML,
            quantity: sofaquantity.value,
            price: (productPrice.innerHTML),
            color: (document.querySelector("select").value),
            image: (productimg.src),
            _id: id,
          };
          console.log("test",productAdded);

    
          //Tableau du localstorage
          let arrayProductsInCart = [];
          console.log("tableau ooooo", arrayProductsInCart);

        // Si le localStorage existe, on récupère son contenu (parse) , on l'insère dans le tableau arrayProductsInCart, puis on le renvoit vers le localStorage avec le nouveau produit ajouté.
        if (localStorage.getItem("product_ID") !== null) {
            arrayProductsInCart = JSON.parse(localStorage.getItem("product_ID"));//Récupère les données(getItem) "product" du tableau "arrayProductsInCart"
          } 

          //Empêche les doublons de produit
          let foundProduct = arrayProductsInCart.find(p => p._id == productAdded._id ) 
          && arrayProductsInCart.find(p => p.color == productAdded.color );

          if (foundProduct != undefined ){
            foundProduct.quantity++;//si le produit existe alors on augmente sa quantité de 1
            alert("Vous avez déjà ajouté ce produit au Panier")
          }else{
            productAdded.quantity = sofaquantity.value
            arrayProductsInCart.push(productAdded); //on ajoute avec .push le produit au tableau
          }

        //Ajout des produits au panier
        localStorage.setItem("product_ID", JSON.stringify(arrayProductsInCart));//stocke les données(setItem) "product" dans le tableau "arrayProductsInCart"

        //Actualiser le changement 
        alert("Ce produit à été ajouté au panier");
        window.location.href = "cart.html";

        messageerreur.style.opacity = "0"
      } 
      
      else {//si la quantité de produit n'est pas comprise entre 1-99 alors un message d'erreur apparait
          messageerreur.innerText = "La quantité de produit n'est pas respectée ou la couleur n'est pas sélectionnée!";
          messageerreur.style.opacity = "1"
          messageerreur.style.textAlign = "center"
          messageerreur.style.fontSize = "20px";
      }
    });
  }

  
  
  
  
  
  
  
  
  
  