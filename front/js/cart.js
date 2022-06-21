let objLinea =localStorage.getItem("products")
let objJson = JSON.parse(objLinea); 

main();

  function main() {
    createcart();
    SupprProductCart();
    PriceQuantity();
    
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
        productimg.style.width = "300px";
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
        productprice.innerHTML = (objJson[produit].price);
        productprice.classList.add("ForCalculatePrice");
        productprice.innerHTML = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(objJson[produit].price);//Afficher le prix en euros

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
        productquantity.innerHTML = "Qté :";

        //div article/englobe1/englobe2/inputquantity
        let productinputquantity = document.createElement("input");
        productdivquantity.appendChild(productinputquantity);
        productinputquantity.setAttribute("value",objJson[produit].quantity);
        productinputquantity.setAttribute("min","1");
        productinputquantity.setAttribute("max","100");
        productinputquantity.setAttribute("type","Number");
        productinputquantity.classList.add("ForCalculateQuantity");
        

        //div article/englobe1/englobe2/divdeleteItem
        let divdeleteItem = document.createElement("div");
        englobe2.appendChild(divdeleteItem);
        divdeleteItem.classList.add("cart__item__content__settings__delete");

        //div article/englobe1/englobe2/divdeleteItem/deleteItem
        let deleteItem = document.createElement("p");
        divdeleteItem.appendChild(deleteItem);
        deleteItem.classList.add("deleteItem");
        deleteItem.innerHTML = "Supprimer";
        }    
        
  }

  function SupprProductCart() {

    //bouton supprimer l'article
    let btn_supprimer = document.querySelectorAll(".deleteItem")
    console.log(btn_supprimer);

    for(let l = 0; l < btn_supprimer.length; l++){
      btn_supprimer[l].addEventListener("click" , (event) => {
        event.preventDefault();

        //selection de l'ID pour suppression spécifique
        let id_selectionner_suppression = objJson[l]._id && objJson[l].color
        console.log("id_selectionner_suppression");
        console.log(id_selectionner_suppression);

        //méthode filter pour garder les éléments voulus
        objJson = objJson.filter (élément => (élément._id !== id_selectionner_suppression) 
        && (élément.color !== id_selectionner_suppression));//tri en fonction de la couleur et de l'id

        //Envoie du changement au local storage
        localStorage.setItem("products", JSON.stringify(objJson))

        //Actualiser le changement 
        alert("Ce produit à été supprimer");
        window.location.href = "cart.html";

      })
    }
  }
 
  function PriceQuantity(){
  //-------------------------------quantity--------------------------------
    let QuantitéTotalPanier =[];
    console.log(QuantitéTotalPanier);

    //ramener les information du panier
    for (let q = 0; q < objJson.length; q++){;
      let Quantitédeproduit = objJson[q].quantity;
      
      //mettre les prix du panier dans le "let prixTotalPanier"
      QuantitéTotalPanier.push(Quantitédeproduit);
      console.log(QuantitéTotalPanier)
      }

      // Transformer en nombre chaque valeur du tableau
      QuantitéTotalPanier = QuantitéTotalPanier.map((x) => parseFloat(x));

      // Additionner les valeurs du tableau pour avoir le prix total
      const calculquantité = (acc, currentVal) => acc + currentVal;
      QuantitéTotalPanier = QuantitéTotalPanier.reduce(calculquantité);

      //Insérer dans le html
      let QuantitéFinale = document.querySelector("#totalQuantity");
      QuantitéFinale.innerHTML = QuantitéTotalPanier;
  //-------------------------------changequantity--------------------------------

      let changequantity = document.querySelector("#totalQuantity");
      changequantity.addEventListener('change', () => {
        if (sofaquantity.value > 0 && sofaquantity.value < 100) {
          
          //... création du produit qui sera ajouté au panier 
          let change = {
            quantity: sofaquantity.value,
          };
          arrayProductsInCart.push(change); //on ajoute avec .push le produit au tableau
          localStorage.setItem("products", JSON.stringify(arrayProductsInCart));
        }
        window.location.href = "cart.html";
      })
    

  //-------------------------------price--------------------------------

    //Création de l'onglet prix total
    let prixTotalPanier =[];

    //ramener les information du panier
    for (let n = 0; n < objJson.length; n++){;
      let prixDesProduits = objJson[n].price;
      
      //mettre les prix du panier dans le "let prixTotalPanier"
      prixTotalPanier.push(prixDesProduits);
      console.log(prixTotalPanier)
      }

      // Transformer en nombre chaque valeur du tableau
      prixTotalPanier = prixTotalPanier.map((x) => parseFloat(x));

      // Additionner les valeurs du tableau pour avoir le prix total
      const calculprice = (acc, currentVal, QuantitéTotalPanier) => (acc + currentVal) - QuantitéTotalPanier;
      prixTotalPanier = prixTotalPanier.reduce(calculprice);
      console.log(QuantitéTotalPanier);

      //Insérer dans le html
      let Prixfinal = document.querySelector("#totalPrice");
      Prixfinal.innerHTML = prixTotalPanier;
  }



