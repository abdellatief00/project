

var userArray=JSON.parse(localStorage.getItem('Users'));



 function login(){
  
   
debugger;
    for (let index = 0; index < userArray.length; index++) {
        if
        (
        userArray[index].email==document.getElementById("Email").value
        &&
        document.getElementById("Password").value==userArray[index].password
        )
        {
          var products=JSON.parse(localStorage.getItem('products'));
            var cart=JSON.parse(localStorage.getItem('cart'));
            var userCart=userArray[index].cart;

           cart.forEach(element => {userCart.findIndex(x=>x.id==element.id)==-1?cart.push(element):cart[cart.findIndex(x=>x.id==element.id)].quantity+=element.quantity;});
        localStorage.setItem("currentUser",JSON.stringify(userArray[index]));
        localStorage.setItem("cart",JSON.stringify(cart))
            break;
        }


    }
    
    location.reload();

 }



 let loggedUser=JSON.parse(localStorage.getItem("currentUser"));
 

        if (loggedUser.id>0) {
            let Profile="testUserProfile.html";
            let navBar=document.querySelector("header nav ul");

            if(loggedUser.role==0){
                navBar.innerHTML+=`<li class="nav-item">
                <a class="nav-link " aria-current="page" href="testAdminDashboard.html">Admin DashBoard</a>
              </li>`
            }
            else if(loggedUser.role==1){
                navBar.innerHTML+=`<li class="nav-item">
                <a class="nav-link " aria-current="page" href="testSellerDashboard.html">Seller DashBoard</a>
              </li>`
            }
           
                
            
            document.querySelector(".CartMenu").nextElementSibling.remove()
            document.querySelector(".CartMenu").parentElement.innerHTML+=`<button type="button" class="btn" data-bs-toggle="dropdown" aria-expanded="false"><i class="fa-solid fa-user"></i></button>
            <ul class="dropdown-menu " style >
          
                <li><a class="btn dropdown-item" href="${Profile}">Profile:<span class="text-primary" style="font-weight:bold"> ${loggedUser.fname[0].toLocaleUpperCase()+loggedUser.fname.slice(1)}</span></a></li>
                
               <li> <form><button class="btn dropdown-item" onclick="logoutFunc()">LOG OUT</button></form></li>

            </ul>`
            
        }





function logoutFunc() {

  for (let index = 0; index < userArray.length; index++) {
    if
    (
    userArray[index].email==loggedUser.email
    &&
    userArray[index].password==loggedUser.password
    )
    {
        userArray[index].cart=JSON.parse(localStorage.getItem('cart'));
        localStorage.setItem("Users",JSON.stringify(userArray));
  
        break;
    }

    

}
localStorage.setItem("currentUser",JSON.stringify({}));
    
}