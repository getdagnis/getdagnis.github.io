window.onload = init;

function init() {
    clearSidesTrue = 0;
    taskRefreshCount = 0;
    mainEmpty = document.getElementById('main-task-empty');

    mainEmpty.style.display = 'block';

    dblclick();
    timerListener();
    // setTimeout(function() {
    // doNewTask(); // iniciējam, ja vajag testēt/taisīt
    // addNewTask(); // iniciējam, ja vajag testēt/taisīt
    // }, 500);

    // GLOBAL VARIABLES // 
    var interval;
    var secs = 0;
    var mins = 0;
    var hours = 0;
    var paused = false;

    // EVENT LISTENERS //     
    document.addEventListener('click', function() {
        switch(event.target) {
            case logo: location.reload();
            break;
            case document.querySelector('.btn-add-task'): addNewTask();
            break;
            default: console.log('klikšķis bija uz ' + event.target);
        }
    });
}

function doNewTask() {
    let taskWrap = document.getElementById('task-wrapper');
    taskWrap.style.display = 'none';
    mainBig = document.getElementById('main-task-big');
    mainBig.style.display = 'flex';
    mainTask = document.getElementsByClassName('main-task')[0];
    mainTask.style.display = 'block';
    mainEmpty = document.getElementById('main-task-empty');
    mainEmpty.style.display = 'none';
    document.getElementsByClassName('main-task')[0].classList.add('flipInX');
    setTimeout(function() {
        document.getElementsByClassName('main-task')[0].classList.remove('shake','flipInX');
        clearSides();
        countTimeUp(0,0,0);
    }, 1000)
}

// Paslēpj (vai parāda) abus sānu izbīdāmos logus
function clickMainTask() {
        console.log(clearSidesTrue);
        if (clearSidesTrue == 2) { 
            showDiv('left');
            showDiv('right');
        } else {
            hideDiv('left');
            hideDiv('right');
            clearSidesTrue = 2;
        }
        setTimeout(function() {
            document.getElementsByClassName('main-task')[0].classList.remove('shake','flipInX');
        }, 1000)
}

// Paslēpj (vai parāda) abus sānu izbīdāmos logus, kad ir dubultklikšķis uz kāda no lielajiem, tukšajiem laukumiem
function dblclick() {
    window.addEventListener('dblclick', function() {
        var e = event.target.classList.contains('dblclick');
        if(e === true) {
            clickMainTask();
        }
    });
}

// Paslēpj (lēnāk nekā parasti) abus sānu izbīdāmos logus, pēc tam uzliek atpakaļ viņiem ātru izbīdīšanos
function clearSides() {
    hideDiv('left');
    hideDiv('right');
    document.getElementById('flex-left').classList.replace('trans-fast', 'trans-slow');
    document.getElementById('flex-right').classList.replace('trans-fast', 'trans-slow');
    setTimeout(function() {
        document.getElementById('flex-left').classList.replace('trans-slow', 'trans-fast');
        document.getElementById('flex-right').classList.replace('trans-slow', 'trans-fast');
    }, 200)
    clearSidesTrue = 2; // palīdz saprast vai ir noņemts tikai viens vai abi sānu logi, ja vērtība ir 2, tad noņemti ir abi
}

// Visvisādas animācijas, kad uzklikšķina uz 'Give up' pogas zem galvenā uzdevuma
function giveUp() {
    mainTask = document.getElementsByClassName('main-task')[0];
    mainBig = document.getElementById('main-task-big');
    mainEmpty = document.getElementById('main-task-empty');
    mainTask.classList.add('color666');
    mainTask.classList.add('hinge');
    document.getElementsByClassName('giveup')[0].style.display = 'none';
    document.getElementsByClassName('done')[0].style.display = 'none';

    setTimeout(function() {
        mainBig.classList.add('fadeOut');
      }, 800);

    setTimeout(function() {
        mainTask.style.display = 'none';
        mainBig.style.display = 'none';
        showDiv('left');
        showDiv('right');
      }, 1000); 

    setTimeout(function() {
        clearTimer();
        // parāda tukšu centrālo daļu
        mainEmpty.style.display = 'block';
        mainEmpty.classList.add('fadeIn');
        // saliek atpakaļ visas rediģētās klases nākamajai reizei
        mainTask.classList.remove('hinge');
        mainBig.classList.remove('fadeOut');
        mainTask.classList.remove('color666');
        document.getElementsByClassName('giveup')[0].style.display = 'inline-block';
        document.getElementsByClassName('done')[0].style.display = 'inline-block';
      }, 1200);
}

// Visvisādas animācijas, kad uzklikšķina uz 'Done!' pogas zem galvenā uzdevuma
function mainTaskDone() {
    mainTask = document.getElementsByClassName('main-task')[0];
    mainBig = document.getElementById('main-task-big');
    mainEmpty = document.getElementById('main-task-empty');
    mainTask.classList.add('rollOut');

    setTimeout(function() {
        mainBig.classList.add('fadeOut');
      }, 300);

    setTimeout(function() {
        mainTask.style.display = 'none';
        mainBig.style.display = 'none';
        showDiv('left');
        showDiv('right');            
      }, 800);

    setTimeout(function() {
        clearTimer();
        mainEmpty.style.display = 'block';
        mainEmpty.classList.add('fadeIn');
        mainTask.classList.remove('rollOut');
        mainBig.classList.remove('fadeOut');
      }, 1000);
}

// Parāda sānu izbīdāmos logus, apgriež otrādi izbīdīšanas pogu
function showDiv(side) {
    let flex = 'flex-' + side;
    let btn = 'slide-btn-' + side;
    let arrow = 'arr-' + side;
    let newClass = 'slide-side-' + side;
    let newClick = 'javascript:hideDiv("' + side + '");';
    let flexThis = document.getElementById(flex);
    let btnThis = document.getElementById(btn);
    let btnArrow = document.getElementById(arrow);
    if (paused === false) {
        pauseTimer(hours,mins,secs);
        }
    flexThis.classList.remove(newClass);
    btnThis.setAttribute('onclick', newClick)
    btnArrow.classList.remove('rotate-90');
    --clearSidesTrue; // palīdz saprast vai noņemts tikai viens vai abi sānu logi. Ja vērtība ir 2, tad noņemti ir abi
}

// Paslēpj sānu izbīdāmos logus, apgriež otrādi izbīdīšanas pogu
function hideDiv(side) {
    let flex = 'flex-' + side;
    let btn = 'slide-btn-' + side;
    let arrow = 'arr-' + side;
    let newClass = 'slide-side-' + side;
    let newClick = 'javascript:showDiv("' + side + '");';
    let flexThis = document.getElementById(flex);
    let btnThis = document.getElementById(btn);
    let btnArrow = document.getElementById(arrow); 
    if (paused == true && clearSidesTrue >= 1) {
        countTimeUp(hours,mins,secs);
        }
    flexThis.classList.add(newClass);
    btnThis.setAttribute('onclick', newClick)
    btnArrow.classList.add('rotate-90');
    ++clearSidesTrue; // palīdz saprast vai noņemts tikai viens vai abi sānu logi, ja vērtība ir 2, tad noņemti ir abi
}

// Izdzēš iepriekš izveidotos darbus, ja ir bijis klikšķis uz delete pogas
function deleteTask() {
    window.addEventListener('click',function(event) {
        if (event.target.classList.contains('task-btn-delete')) {
            event.target.parentNode.parentNode.classList.replace('taskBounce','fadeOut');
            setTimeout(function() {
                event.target.parentNode.parentNode.style.display = 'none';
            }, 520);
        }
    });
}

// Paslēpj no visu acīm šodien paveiktos darbus, bet neizdzēš
function hideTask() {
    window.addEventListener('click',function(event) {
        if (event.target.classList.contains('task-btn-hide')) {
            event.target.parentNode.style.display = 'none';
        }
        // Parādās refresh poga, kad visi ir izdzēsti
        if (document.getElementsByClassName('task-btn-hide').length == taskRefreshCount) {
            setTimeout(function() {
                document.getElementById('refresh-done').style.display = 'block';
            }, 100);
        }
    });
    taskRefreshCount++;
}

// Izdarīto darbu saraksta refresh podziņa atgriež atpakaļ visus šodien izdarītos darbus
function refreshDone() {
    var taskBtns = document.getElementsByClassName('task-btn-hide');
    var thisBtn = document.getElementsByClassName('task-btn-hide');

    setTimeout(function() {
        document.getElementById('refresh-done').style.display = 'none';
        for (i=0;i<taskBtns.length;i++) {
            thisBtn[i].parentElement.style.display = 'block';
        };
    }, 100);
    taskRefreshCount = 0;
}

// Aizver ciet Add New Task popup logu, kad bijis klikšķis kaut kur ārpus paša popupa
window.addEventListener('mouseup',function(event) {
    taskWrap = document.getElementById('task-wrapper');
    if (event.target.classList.contains('btn-cancel') ||  (event.target == taskWrap && event.target.parentNode !== taskWrap)) {
        taskWrap.style.display = 'none';
    }
});

// Atver jauna uzdevuma popapu
function addNewTask() {
    let taskWrap = document.getElementById('task-wrapper');
    let taskPop = document.getElementById('task-popup');
    let taskText = document.getElementById('task-text');

    taskWrap.style.display = 'block';
    taskWrap.classList.add('opaque');
    taskPop.classList.add('opaque');
    taskText.focus(); 
}

// Izvēlies krāsu/kategoriju
function pickColor() {
    window.addEventListener('click', function() {
        var myColor = event.target;
        var allColors = document.getElementsByClassName('pick-color');
        
        if (myColor.classList.contains('pick-color') == true) {
            for (i=0;i<allColors.length;i++) {
                allColors[i].classList.remove('active-color');
            }
            myColor.classList.add('active-color');
        }
    })
}

// Pievieno vēlāk darāmo darbu sarakstam
function doLater() {
    var divLater = document.getElementById('flex-left-later');
    var initial = divLater.innerHTML;

    taskWrap.style.display = 'none';
    divLater.innerHTML = initial;
}


function editTask() {
    addNewTask();
}

function timerListener() {
    const timerDiv = document.querySelector('#timeDiv');
    timerDiv.addEventListener('click', function() {
        if (paused === false) {
            pauseTimer(hours,mins,secs);
        } else if (paused == true) {
            countTimeUp(hours,mins,secs);
        }
    });
    const mainTask = document.querySelector('.main-task');
    mainTask.addEventListener('click', function() {
        if (paused === false) {
            pauseTimer(hours,mins,secs);
            if (clearSidesTrue >= 1) { 
                clickMainTask();
            }
        } else if (paused === true) {
            countTimeUp(hours,mins,secs);
            if (clearSidesTrue <= 1) { 
                clickMainTask();
            }
        }
    });
}

function countTimeUp(hr,min,sec) {
    const timerDiv = document.querySelector('#timeDiv');
    const secDiv = document.getElementById('sec-div');
    const minDiv = document.getElementById('min-div');
    const hrDiv = document.getElementById('hr-div');
    const pauseDiv = document.querySelector('#paused');
    const mainTask = document.querySelector('.main-task');
    const mtvBoxes = document.querySelectorAll('.mtv-box');

    mainTask.classList.remove('color666');
    timerDiv.classList.remove('paused');
    pauseDiv.style.display = 'none';
    paused = false;
    hours = hr;
    mins = min;
    secs = sec;

    mtvBoxes.forEach(function(item) { 
        item.classList.remove('color666'); 
    });
    
    function runTimer(hr,min,sec) {
        var timer = secs + ' seconds';
        secDiv.innerHTML = timer;
        // Nomaina turp/atpakaļ klasi, lai atjaunotos sarkanais iedegšanās efekts ik pēc 10 sekundēm (tālāk ik uz minūti/stundu)
        if (secs % 10 === 0) {
            // Ik pēc 10 sekundēm piešķir klasi, kas liek nomirkšķināties sarkanai krāsai
            if (secDiv.classList.contains('redTime1')) {
                secDiv.classList.replace('redTime1','redTime2');
            } else if (secDiv.classList.contains('redTime2')) {
                secDiv.classList.replace('redTime2','redTime1');
            }  else {
                secDiv.classList.add('redTime1');
            }
        }
        if (secs === 60) {
            // liek nomirkšķināties minūtes krāsai, kad nomainās
                if (minDiv.classList.contains('redTime1')) {
                    minDiv.classList.replace('redTime1','redTime2');
                } else {
                    minDiv.classList.replace('redTime2','redTime1');
                }   
            secs = 0;
            mins++;
            minDiv.innerHTML = mins + ' minutes';
            secDiv.innerHTML = '0 seconds'
            }
        if (mins === 60) {
                if (hrDiv.classList.contains('redTime1')) {
                    hrDiv.classList.replace('redTime1','redTime2');
                } else {
                    hrDiv.classList.replace('redTime2','redTime1');
                }   
            hours++;
            mins = 0;
            hrDiv.innerHTML = hours + ' hours';
            }
            secs++;
        }

    interval = setInterval(runTimer, 1000);
    
}

function pauseTimer(hours,mins,secs) {
    setTimeout(function() {
        const timerDiv = document.querySelector('#timeDiv');
        const pauseDiv = document.querySelector('#paused');
        const secDiv = document.getElementById('sec-div');
        const mainTask = document.querySelector('.main-task');
        const mtvBoxes = document.querySelectorAll('.mtv-box');
        var hr = hours;
        var min = mins;
        var sec = secs;

        mtvBoxes.forEach(function(mtvbox) { 
            mtvbox.classList.add('color666'); 
        });
        secDiv.classList.remove('redTime1','redTime2');
        timerDiv.classList.add('paused');
        pauseDiv.style.display = 'block';
        mainTask.classList.add('color666');
        
        clearInterval(interval);
        paused = true;
    }, 5)
}

function clearTimer() {
    var secDiv = document.getElementById('sec-div');
    var minDiv = document.getElementById('min-div');
    var hrDiv = document.getElementById('hr-div');
    secDiv.innerHTML = '0 seconds';
    minDiv.innerHTML = '';
    hrDiv.innerHTML = '';
    var secDiv = document.getElementById('sec-div');
    clearInterval(interval);
}

// TODO: izveido motivācijas tagus, kad tiek rakstīts jauns uzdevums
