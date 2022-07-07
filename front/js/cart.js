let objLinea =localStorage.getItem("product_ID")
let objJson = JSON.parse(objLinea); 

console.log("objjson",objJson)

main();

  function main() {//Donne l'ordre d'exécution des fonctions
    createcart();
    SupprProductCart();
    changeData();
    PriceQuantity();
    Formulaire ();
    
  }

  

//Création les emplacements HTML, pour les informations des produits ajoutés au panier, grâce au DOM
  function createcart() {

    // Si le tableau copié du localStorage contient au moins un objet, on affiche le panier .
    if (localStorage.getItem("product_ID")) {
    

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
        productprice.classList.add("ForCalculatePrice");
        productprice.innerHTML = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format((objJson[produit].price));//Afficher le prix en euros
       
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
   
  }
//Organise la suppression des produits non désirés dans le panier
  function SupprProductCart() {

    //bouton supprimer l'article
    let btn_supprimer = document.querySelectorAll(".deleteItem")

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
        localStorage.setItem("product_ID", JSON.stringify(objJson))

        //Actualiser le changement 
        alert("Ce produit à été supprimer");
        window.location.href = "cart.html";

      })
    }
  }

 //Calcul de la quantité Totale et du Prix total de tout les produits dans le panier
  function PriceQuantity(){
  //-------------------------------quantity--------------------------------
    let QuantitéTotalPanier =[];

    //ramener les information du panier
    for (let q = 0; q < objJson.length; q++){
      let Quantitédeproduit = (objJson[q].quantity);
      
      //mettre les prix du panier dans le "let prixTotalPanier"
      QuantitéTotalPanier.push(Quantitédeproduit);
      }

      // Transformer en nombre chaque valeur du tableau
      QuantitéTotalPanier = QuantitéTotalPanier.map((x) => parseFloat(x));

      // Additionner les valeurs du tableau pour avoir le prix total
      const calculquantité = (acc, currentVal) => acc + currentVal;
      QuantitéTotalPanier = QuantitéTotalPanier.reduce(calculquantité);

      //Insérer dans le html
      let QuantitéFinale = document.querySelector("#totalQuantity");
      QuantitéFinale.innerHTML = QuantitéTotalPanier;


  //-------------------------------priceTotal--------------------------------

    //Création de l'onglet prix total
    let prixTotalPanier =[];
    console.log(prixTotalPanier);

    //ramener les information du panier
    for (let n = 0; n < objJson.length; n++){;
      let prixDesProduits = ((objJson[n].price)*(objJson[n].quantity));
      
      //mettre les prix du panier dans le "let prixTotalPanier"
      prixTotalPanier.push(prixDesProduits);
      }

      // Transformer en nombre chaque valeur du tableau
      prixTotalPanier = prixTotalPanier.map((x) => parseFloat(x));

      // Additionner les valeurs du tableau pour avoir le prix total
      const calculprice = (acc, currentVal, QuantitéTotalPanier) => (acc + currentVal) - QuantitéTotalPanier;
      prixTotalPanier = prixTotalPanier.reduce(calculprice);

      //Insérer dans le html
      let Prixfinal = document.querySelector("#totalPrice");
      Prixfinal.innerHTML = prixTotalPanier;
  }


  //fonction qui gere le changement de quantité des produits lors de l'utilisation de l'input
  function changeData(){

    //selecteur de l'input
    let quantityInput = document.querySelectorAll(".ForCalculateQuantity");

      //boucle qui recupere le total du panier
      for(let d = 0; d < quantityInput.length; d++){

        //event qui detect des changement sur l'input 
        quantityInput[d].addEventListener("change", (e)=>{
        e.preventDefault();

        //variable quantité de base
        let qty = quantityInput[d].value;

        console.log(qty);

          //si la quantité est superieur ou egale à 1 et inferieur ou egale a 100 on recalcule le total quantité est le total prix
          if (qty >= 1 && qty <= 100){

          objJson[d].quantity = quantityInput[d].value;
          console.log(objJson[d].quantity);


          // on ajoute les nouvelles information au local storage
          localStorage.setItem('product_ID', JSON.stringify(objJson));
          }

          // puis on refresh la page
          location.reload();

      })
    } 
  }

  //Fonction qui permet la validation du formulaire et si validation alors envoie avec la requête POST de order, et renvoie à la page confirmation
  function Formulaire () {

    //stockage des information du formulaire dans le localStorage
    const btncommander = document.querySelector("#order");
    
    //Récupération des valeurs du formulaires 
    let formfirstName =document.querySelector("#firstName");
    let formlastName = document.querySelector("#lastName");
    let formaddress = document.querySelector("#address");
    let formcity = document.querySelector("#city");
    let formemail = document.querySelector("#email");

    btncommander.addEventListener("click", (event)=>{
    event.preventDefault();

    //---------------------------------------Paramètre du formulaire---------------------------

    //Pour le FirstName
    function FirstNamecontrole(){ 
      const firstNamesec = formfirstName.value;
      if(/^[A-Za-z|\s]+$/.test(firstNamesec)){
      return true;  
      }else{
        alert("le prénom n'est pas valide")
        return false;
      }
    }

    //Pour le LastName
    function lastNamecontrole(){
      const lastNamesec = formlastName.value;
      if(/^[A-Za-z|\s]+$/.test(lastNamesec)){
      return true;  
      }else{
        alert("Le nom n'est pas valide")
        return false;
      }
    }

    function adressecontrole(){
      const adressesec = formaddress.value;
      if(/^[A-Za-z0-9|\s]+$/.test(adressesec)){
      return true;  
      }else{
        alert("l'adresse n'est pas valide")
        return false;
      }
    }

    //Pour la ville
    function citycontrole(){
      const citysec = formcity.value;
      if(/^[A-Za-z|\s]+$/.test(citysec)){
      return true;  
      }else{
        alert("la ville n'est pas valide")
        return false;
      }
    }

    //Pour l'email
    function Emailcontrol(){
      const emailsec = formemail.value;
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailsec)){
          return true;
        }else{
          alert("l'email n'est pas valide")
          return false;
        }
    }

    //--------------------------------------------------------------------------------

      //Si les paramètres du formulaire sont respectés alors ...
      if(FirstNamecontrole() && lastNamecontrole() && citycontrole() && Emailcontrol() && adressecontrole()){

        //ajout d'un event click pour detecter le bouton commander!
        btncommander.addEventListener('click',(e)=>{
          e.preventDefault();
          //on verifie si les champ on etait remplis
          if(formfirstName.value == "" ||
          formlastName.value == "" ||
          formaddress.value == "" ||
          formcity.value == "" ||
          formemail.value == "" ) {
          alert('Veuillez renseigner ces champ.')
          //si erreur on indique une erreur puis on ne reload pas la page
          window.onbeforeunload;
          return;
          }
          // creation d'un objet contenant les infos de l'utilisateur
          const contact ={
          firstName : formfirstName.value,
          lastName : formlastName.value,
          address : formaddress.value,
          city : formcity.value,
          email : formemail.value
          }
          console.log("1",contact );
          
          //tableaux pour stocker les Id des produits 
          let products = [];

          
  
          //boucle foreach qui recuper l'order id
          objJson.forEach(order => {products.push(order._id)});

          //storage.forEach(order => {products.push(order.id)});

          console.log("2", objJson);
          console.log("3",products );
          
          //objet qui ajout l'objet contact plus d'id 
          const order = { contact , products};

          console.log("4", order );


          
          // je fais appel à l'api order pour envoyer mes tableaux et je redirige vers la page de confirmation
          fetch(('http://localhost:3000/api/products/order'),{
          method: "POST",
          headers :{'Accept':'application/json','Content-type':'application/json'},
          body : JSON.stringify(order)
          })
          .then(res =>{
          return res.json();
          })
          .then((data)=>{
          console.log("ggg",data);
          window.location.href =`confirmation.html?orderId=${data.orderId}`
          })
          .catch((error)=>{
          alert(error);
          })
          
          })
//-------------------------
      }
    })
  }

