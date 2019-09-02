window.onload = init;

function init() {
    clearSidesTrue = 0;
    countHidden = 0;
    // mainEmpty = document.getElementById("main-task-empty");
    // mainEmpty.style.display = "block";
    setTimeout(function() {
        doNewTask();
    }, 300);
    // addNewTask();
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

function editTask() {
    addNewTask();
}

function doNewTask() {
    let taskWrap = document.getElementById("task-wrapper");
    taskWrap.style.display = "none";
    mainBig = document.getElementById("main-task-big");
    mainBig.style.display = "flex";
    mainTask = document.getElementsByClassName("main-task")[0];
    mainTask.style.display = "block";
    mainEmpty = document.getElementById("main-task-empty");
    mainEmpty.style.display = "none";
    document.getElementsByClassName("main-task")[0].classList.add("flipInX");
    setTimeout(function() {
        document.getElementsByClassName("main-task")[0].classList.remove("shake","flipInX");
    }, 1000)
    clearSides();
}

function clickMainTask() {
    console.log(clearSidesTrue);
    if (clearSidesTrue == 2) {
        showDiv("left");
        showDiv("right");
    } else {
        hideDiv("left");
        hideDiv("right");
        clearSidesTrue = 2
    }
    setTimeout(function() {
        document.getElementsByClassName("main-task")[0].classList.remove("shake","flipInX");
    }, 1000)
}

function clearSides() {
    // TO-DO: if there's a main task already present, then hide both divs //
    // TO-DO: automatically hide the side divs after 30 sec if there's no mouseover and main task ir present //
    hideDiv("left");
    hideDiv("right");
    document.getElementById("flex-left").classList.replace("trans-fast", "trans-slow");
    document.getElementById("flex-right").classList.replace("trans-fast", "trans-slow");
    setTimeout(function() {
        document.getElementById("flex-left").classList.replace("trans-slow", "trans-fast");
        document.getElementById("flex-right").classList.replace("trans-slow", "trans-fast");
    }, 200)
    clearSidesTrue = 2;
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
    --clearSidesTrue;
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
    ++clearSidesTrue;
}

function deleteTask() {
    window.addEventListener('click',function(event) {
        if(event.target.classList.contains("task-btn-delete")) {
            event.target.parentNode.parentNode.classList.replace("taskBounce","fadeOut");
            // event.target.parentNode.parentNode.classList.add("scale-0");
            setTimeout(function() {
                event.target.parentNode.parentNode.style.display = "none";
            }, 520);
        }
    });
}

function hideTask() {
    window.addEventListener('click',function(event) {
        if(event.target.classList.contains("task-btn-hide")) {
            event.target.parentNode.style.display = "none";
        }
        if (document.getElementsByClassName("task-btn-hide").length == countHidden) {
            setTimeout(function() {
                document.getElementById("refresh-done").style.display = "block";
            }, 100);
        }
    });
    countHidden++;
}

function refreshDone() {
    var taskBtns = document.getElementsByClassName("task-btn-hide");
    var thisBtn = document.getElementsByClassName("task-btn-hide");
    setTimeout(function() {
        document.getElementById("refresh-done").style.display = "none";
        for (i=0;i<taskBtns.length;i++) {
            thisBtn[i].parentElement.style.display = "block";
        };
    }, 100);
    countHidden = 0;
}

window.addEventListener('mouseup',function(event) {
    taskWrap = document.getElementById("task-wrapper");
    if(event.target.classList.contains("btn-cancel") ||  (event.target == taskWrap && event.target.parentNode !== taskWrap)) {
        taskWrap.style.display = "none";
    }
});



