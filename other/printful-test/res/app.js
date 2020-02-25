window.onload = letsBegin;

function letsBegin() {
    const container = document.querySelector('#container');
    let html = `
        <div class="name-slide hidden-slide">
            <h3>Welcome to</h3>
            <h1>Printful Front-End Task</h1>
            <input type="text" name="name-input" id="name-input" placeholder="Type your name">
            <div class="button inactive name-btn">My name is ...</div>
        </div>
    `;
    
    container.innerHTML = html;
    setTimeout(() => {
        launchSlideOne();
    }, 10);
}


function launchSlideOne() {
    const currentSlide = document.querySelector('.name-slide');
    const button = document.querySelector('.button');
    const textinput = document.querySelector('#name-input');
    const input = document.getElementById('name-input');
    let timeout = null;

    // The current slide slides in from the right
    currentSlide.classList.add('slide-in');

    // Focus on the Text Input field after 500ms
    setTimeout(() => {
        textinput.focus(); 
    }, 500);

    // Wait for user to finish typing before displaying the button
    input.addEventListener('keyup', (e) => {
        clearTimeout(timeout);
    
        timeout = setTimeout(function () {
            button.classList.replace('inactive', 'active');
            button.innerHTML = `My name is ${input.value}!`
        }, 500);
    });

    button.addEventListener('click', () => {
        if (button.classList.contains('inactive')) {
            textinput.focus();
        } else {
            launchSlideTwo();
        }
    })
}

