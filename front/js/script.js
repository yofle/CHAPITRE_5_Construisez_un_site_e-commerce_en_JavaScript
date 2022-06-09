main();

function main() {
  getAPI();
}
function getAPI(){
    fetch("http://localhost:3000/api/products")
        .then(function(res){
                return res.json();
        })
        .catch((error) => {
            let items= document.querySelector('.items');
            items.innerHTML = 'Un problème est survenu!';
        })
        
        .then(function (resultatAPI) {
          const articles = resultatAPI;
          console.log(articles);
          for (let article in articles) {

            let productCard = document.createElement("div");
            document.querySelector(".items").appendChild(productCard);
            productCard.classList.add("product");
    
            let productLink = document.createElement("a");
            productCard.appendChild(productLink);
            productLink.href = `product.html?id=${resultatAPI[article]._id}`;
            productLink.classList.add("stretched-link");
    
            let productImgDiv = document.createElement("div");
            productLink.appendChild(productImgDiv);
            productImgDiv.classList.add("product__img");
    
            let productImg = document.createElement("img");
            productImgDiv.appendChild(productImg);
            productImg.src = resultatAPI[article].imageUrl;
            productImg.style.height = "200px";
            productImg.style.width = "200px";
    
            let productInfosDiv = document.createElement("div");
            productLink.appendChild(productInfosDiv);
            productInfosDiv.classList.add("product__infos");
    
            let productInfoTitle = document.createElement("div");
            productInfosDiv.appendChild(productInfoTitle);
            productInfoTitle.classList.add("product__infos__title");
            productInfoTitle.innerHTML = resultatAPI[article].name;

            let productInfodescription = document.createElement("div");
            productInfosDiv.appendChild(productInfodescription);
            productInfodescription.classList.add("product__infos__description");
            productInfodescription.innerHTML = resultatAPI[article].description;
    
          }
        });
    }