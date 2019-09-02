window.onload = init;

function init() {
    // clearSides();
}

function clearSides() {
    // TO-DO: if there's a main task already present, then hide both divs //
    // TO-DO: automatically hide the side divs after 30 sec if there's no mouseover and main task ir present //
    hideDiv("left");
    hideDiv("right");
    document.getElementById("flex-left").classList.replace("trans-fast", "trans-slow");
    document.getElementById("flex-right").classList.replace("trans-fast", "trans-slow");
    document.getElementsByClassName("main-task")[0].classList.add("shake");
}

function doNewTask() {
    let taskWrap = document.getElementById("task-wrapper");
    taskWrap.style.display = "none";
    mainBig = document.getElementById("main-task-big");
    mainBig.style.display = "flex";
    mainTask = document.getElementsByClassName("main-task")[0];
    mainTask.style.display = "block";
    mainTask.classList.add("fadeIn");
    mainEmpty = document.getElementById("main-task-empty");
    mainEmpty.style.display = "none";
    hideDiv("left");
    hideDiv("right");
    document.getElementById("flex-left").classList.replace("trans-fast", "trans-slow");
    document.getElementById("flex-right").classList.replace("trans-fast", "trans-slow");
}

function editTask() {
    addNewTask();
}

function giveUp() {
    mainTask = document.getElementsByClassName("main-task")[0];
    mainBig = document.getElementById("main-task-big");
    mainEmpty = document.getElementById("main-task-empty");
    mainTask.classList.add("color666");
    mainTask.classList.add("hinge");
    document.getElementsByClassName("giveup")[0].style.display = "none";
    document.getElementsByClassName("done")[0].style.display = "none";
    setTimeout(function() {
        mainBig.classList.add("fadeOut");
      }, 800);
    setTimeout(function() {
        mainTask.style.display = "none";
        mainBig.style.display = "none";
        showDiv("left");
        showDiv("right");
      }, 1000);  
    setTimeout(function() {
        mainEmpty.style.display = "block";
        mainEmpty.classList.add("fadeIn");
        mainTask.classList.remove("hinge");
        mainBig.classList.remove("fadeOut");
        mainTask.classList.remove("color666");
        document.getElementsByClassName("giveup")[0].style.display = "inline-block";
        document.getElementsByClassName("done")[0].style.display = "inline-block";
      }, 1200);        
}

function mainTaskDone() {
    mainTask = document.getElementsByClassName("main-task")[0];
    mainBig = document.getElementById("main-task-big");
    mainEmpty = document.getElementById("main-task-empty");
    mainTask.classList.add("rollOut");
    setTimeout(function() {
        mainBig.classList.add("fadeOut");
      }, 300);
    setTimeout(function() {
        mainTask.style.display = "none";
        mainBig.style.display = "none";
        showDiv("left");
        showDiv("right");            
      }, 800);
    setTimeout(function() {
        mainEmpty.style.display = "block";
        mainEmpty.classList.add("fadeIn");
        mainTask.classList.remove("rollOut");
        mainBig.classList.remove("fadeOut");
      }, 1000);    
}

function showDiv(side) {
    let flex = 'flex-' + side;
    let btn = 'slide-btn-' + side;
    let arr = 'arr-' + side;
    let newClass = 'slide-side-' + side;
    let newClick = 'javascript:hideDiv("' + side + '");';
    let flexThis = document.getElementById(flex);
    let btnThis = document.getElementById(btn);
    let arrThis = document.getElementById(arr);
    flexThis.classList.remove(newClass);
    btnThis.setAttribute('onclick', newClick)
    arrThis.classList.remove("rotate-90");
    flexThis.classList.replace("trans-slow", "trans-fast");
}

function hideDiv(side) {
    let flex = 'flex-' + side;
    let btn = 'slide-btn-' + side;
    let arr = 'arr-' + side;
    let newClass = 'slide-side-' + side;
    let newClick = 'javascript:showDiv("' + side + '");';
    let flexThis = document.getElementById(flex);
    let btnThis = document.getElementById(btn);
    let arrThis = document.getElementById(arr);
    flexThis.classList.add(newClass);
    btnThis.setAttribute('onclick', newClick)
    arrThis.classList.add("rotate-90");
}

function addNewTask() {
    let taskWrap = document.getElementById("task-wrapper");
    let taskPop = document.getElementById("task-popup");
    let taskText = document.getElementById("task-text");
    taskWrap.style.display = "block";
    taskWrap.classList.add("opaque");
    taskPop.classList.add("opaque");
    taskText.focus(); 
}

window.addEventListener('mouseup',function(event) {
    taskWrap = document.getElementById("task-wrapper");
    if(event.target.classList.contains("btn-cancel") ||  (event.target == taskWrap && event.target.parentNode !== taskWrap)) {
        taskWrap.style.display = "none";
    }
});




// window.onload = init;

// function init() {
//     checkBox();
// }


// function showDiv() {
//     let formDiv = document.getElementById('form-div');
//     let formLeft = document.getElementById('form-left');
//     formDiv.classList.add("show");
//     formLeft.setAttribute('onclick', "javascript:hideDiv();")
// }

// function hideDiv() {
//     let formDiv = document.getElementById('form-div');
//     let formLeft = document.getElementById('form-left');
//     formDiv.classList.remove("show");
//     formLeft.setAttribute('onclick', "javascript:showDiv();")
// }


// function checkBox() {
//     let checkBox = document.getElementById("checkbox");
//     let select = document.getElementById("select");
  
//     if (checkBox.checked == true){
//         select.style.display = "block";
//     } else {
//         select.style.display = "none";
//     }
//   }

// function checkUser() {

// }

// function checkEmail() {
    
// }

// function postData() {
//     let getUser = document.getElementById("user").value;
//     let getEmail = document.getElementById("email").value;
//     let getCheck = document.getElementById("checkbox").value;
//     let getSelect = document.getElementById("select").value;
//     checkUser();
//     checkEmail();
//     checkSelect();
//     let allValid = false;
//     if (allValid === true) {
//         localStorage.setItem(user,getUser);
//         localStorage.setItem(email,getEmail);
//         localStorage.setItem(check,getCheck);
//         localStorage.setItem(select,getSelect);
//     }
// }