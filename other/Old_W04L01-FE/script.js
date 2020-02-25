window.onload = init;

function init() {
    checkBox();
}


function showDiv() {
    let formDiv = document.getElementById('form-div');
    let formLeft = document.getElementById('form-left');
    formDiv.classList.add("show");
    formLeft.setAttribute('onclick', "javascript:hideDiv();")
}

function hideDiv() {
    let formDiv = document.getElementById('form-div');
    let formLeft = document.getElementById('form-left');
    formDiv.classList.remove("show");
    formLeft.setAttribute('onclick', "javascript:showDiv();")
}


function checkBox() {
    let checkBox = document.getElementById("checkbox");
    let select = document.getElementById("select");
  
    if (checkBox.checked == true){
        select.style.display = "block";
    } else {
        select.style.display = "none";
    }
  }

function checkUser() {

}

function checkEmail() {
    
}

function postData() {
    let getUser = document.getElementById("user").value;
    let getEmail = document.getElementById("email").value;
    let getCheck = document.getElementById("checkbox").value;
    let getSelect = document.getElementById("select").value;
    checkUser();
    checkEmail();
    checkSelect();
    let allValid = false;
    if (allValid === true) {
        localStorage.setItem(user,getUser);
        localStorage.setItem(email,getEmail);
        localStorage.setItem(check,getCheck);
        localStorage.setItem(select,getSelect);
    }
}