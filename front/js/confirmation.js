main();

function main(){
  getId();
  orderSetId();
}

//récupère l'orderid
function getId(){
  let link = new URL(window.location.href);
  var search_params = new URLSearchParams(link.search);

  if(search_params.has('orderId')) {
    const _id = search_params.get('orderId');
    console.log("recupération de l'id : ok,id" + _id)
    return _id;//retourne l'id de la commande

  }else{
    return console.error('Aucun id trouver!');
  }
}

function orderSetId(){
  const idNode = document.querySelector("#orderId");
  console.log("Afficahge de lid dom ok")
  idNode.innerHTML = getId();//Affiche l'id obtenu dans la fonction getId

  localStorage.clear();//vide le localStorage
}

