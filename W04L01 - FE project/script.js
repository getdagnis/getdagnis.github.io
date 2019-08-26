window.onload = init;

function init() {
    checkBox();
}


function showDiv() {
    let formDiv = document.getElementById('form-div');
    formDiv.classList.add("show");
    document.getElementById('form-left').setAttribute('onclick', "javascript:hideDiv();")
}

function hideDiv() {
    let formDiv = document.getElementById('form-div');
    formDiv.classList.remove("show");
    document.getElementById('form-left').setAttribute('onclick', "javascript:showDiv();")
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

function postData() {
    let getUser = document.getElementById
}