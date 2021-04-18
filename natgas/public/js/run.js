//alert("1");

let gButton = document.getElementById("btn");
let gPassword = document.getElementById("pwd");
let gInfor = document.getElementById("info");
gButton.onclick = ButtonHandler;

//alert("2");

const gPasswordCorrect = "123456";



function ButtonHandler()
{
    //alert(gPassword.value);
    
    let value_password = gPassword.value;

    if(value_password == gPasswordCorrect)
    {
        gInfor.innerHTML = "Correct";
    }
    else
    {
        gInfor.innerHTML = "Password Wrong";
    }

    gPassword.value = "";
}

