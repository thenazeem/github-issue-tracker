document.getElementById("login-btn").addEventListener("click", function(){

    const userName = document.getElementById("input-username");
    const userContact = userName.value;
    console.log(userContact);


    const inputPassword = document.getElementById("input-password");
    const password = inputPassword.value;
    console.log(password);

    if (userContact == "admin" && password == "admin123"){
        alert("Login Success");
        window.location.assign("./main.html")
    }else{
        alert("Login Failed");
        window.location.reload("/index.html")
        return;
    }
});