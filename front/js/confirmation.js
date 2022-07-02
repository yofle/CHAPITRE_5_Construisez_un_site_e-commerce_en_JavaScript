main();

function main() {
  displayOrderIdAndPrice();
}

function displayOrderIdAndPrice() {
  
  orderId.textContent = localStorage.getItem("orderId");

  console.log("eeee",localStorage.getItem("orderId"));
  console.log("aaaaaa",orderId);

  // On vide le localStorage pour recommencer plus tard le processus d'achat
  //localStorage.clear(); 
}