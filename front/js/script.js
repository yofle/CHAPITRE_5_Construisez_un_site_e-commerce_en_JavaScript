main(); /* fonction principal synchrone*/ 

function main()/*la fonction princiapal englobe la fonction getapi*/ {
  getAPI();
}
function getAPI() /*On va chercher l'Api avec fetch et on lui donne 2 issus, sois affichage, sois erreur*/{
    fetch("http://localhost:3000/api/products")
        .then(function(res){
                return res.json();
        })
        .catch((error) => {
            let items= document.querySelector('.items');
            items.innerHTML = 'Un problème est survenu!';
        })
        /* création de l'affichage des information*/ 
        .then(function (resultatAPI) {
          const articles = resultatAPI;/*On donne la valeur de resultatAPI à articles pour le dispatcher dans les différentes div*/
          console.log(articles);
          for (let article in articles) /*on crait une boucle pour donner l'information pour chaque produit*/{

            /* on crait une div ayant pour class = "product" juste après la section de class = "items"*/
            let productCard = document.createElement("div");
            document.querySelector(".items").appendChild(productCard);
            productCard.classList.add("product");
            productCard.style.width = "30%";
            productCard.style.backgroundColor = "black";
            productCard.style.marginBottom = "2%";
    
            /* on crait une balise a ayant pour class = "data-sheet" juste après la div de class = "product", dans ce a on met un lien href permettant d'acceder à la page produit*/
            let productLink = document.createElement("a");
            productCard.appendChild(productLink);
            productLink.href = `product.html?id=${resultatAPI[article]._id}`;
            productLink.classList.add("data-sheet");
    
            /*On crait une div ayant pour class = "product__img" juste après la div de class = "data-sheet" */
            let productImgDiv = document.createElement("div");
            productLink.appendChild(productImgDiv);
            productImgDiv.classList.add("product__img");
    
            /*On crait une balise img  juste après la div de class = "product__img" et on insère dans cette balise img la boucle article (le renvoie de l'API) */
            let productImg = document.createElement("img");
            productImgDiv.appendChild(productImg);
            productImg.src = resultatAPI[article].imageUrl;
            productImg.style.height = "204px";
            productImg.style.width = "100%";
    
            /*On crait une div ayant pour class = "product__infos" juste après la div ayant pour class = "product__img" */
            let productDiv = document.createElement("div");
            productLink.appendChild(productDiv);
            productDiv.classList.add("product__infos");
    
            /*On crait une div ayant pour class = "product__title" juste après la div ayant pour class = "product__infos", dans cette div "product__title" on insère le titre (renvoie de l'API) */
            let productTitle = document.createElement("div");
            productDiv.appendChild(productTitle);
            productTitle.classList.add("product__title");
            productTitle.innerHTML = resultatAPI[article].name;
            productTitle.style.fontSize = "20px";
            productTitle.style.textAlign = "center";


            /*On crait une div ayant pour class = "product__description" juste après la div ayant pour class = "product__title", dans cette div "product__description" on insère la description (renvoie de l'API) */
            let productdescription = document.createElement("div");
            productDiv.appendChild(productdescription);
            productdescription.classList.add("product__description");
            productdescription.innerHTML = resultatAPI[article].description;
            productdescription.style.textAlign = "center";
            productdescription.style.color = "grey";
    
          }
        });
    }