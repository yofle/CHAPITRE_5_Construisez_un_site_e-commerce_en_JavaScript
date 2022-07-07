main();

function main(){//Donne l'ordre d'exécution des fonctions
  getId();
  orderSetId();
}

//récupère l'orderid
function getId(){
  let link = new URL(window.location.href);
  var search_params = new URLSearchParams(link.search);

  //si le paramètre orderId est présent alors on affiche l'id de la commande dans la console
  if(search_params.has('orderId')) {
    const _id = search_params.get('orderId');
    console.log("recupération de l'id : ok,id" + _id)
    return _id;//retourne l'id de la commande

  }else{
    return console.error('Aucun id trouver!');
  }
}

//Affiche l'id
function orderSetId(){
  const idNode = document.querySelector("#orderId");
  console.log("Afficahge de lid dom ok")
  idNode.innerHTML = getId();//Affiche l'id obtenu dans la fonction getId

  localStorage.clear();//vide le localStorage
}

