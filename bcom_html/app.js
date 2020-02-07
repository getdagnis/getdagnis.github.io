window.onload = init;

function init(initEvent) {
    const app = document.querySelector('app');

    function slideOne(slide) {
        const next = document.getElementById('next');
        const svgNext = document.querySelector('.svg-next');
        const nextBg = document.getElementById('next-bg');
        (slide.type === "load") ? slide = '.slide-1' : slide = slide;
        const thisSlide = document.querySelector(slide);
        const nextSlideNr = Number(slide.slice(7)) + 1;
        const nextSlideName = '.slide-' + nextSlideNr;
        const nextSlide = document.querySelector(nextSlideName);
        const logoBlue = document.querySelector('.cls-1');
        const logoLetters = document.getElementsByClassName('logo-letter');
        const h1Elements = document.getElementsByClassName('slide-1-title');
        const slideOneTitleOne = document.querySelector('.slide-1-title-1');
        const slideOneTitleTwo = document.querySelector('.slide-1-title-2');
    
        // moveSlide();  // Production Only
        
        setTimeout(() => {
            thisSlide.addEventListener('mousemove', mouseCurtain);
        }, 1000);
    
        next.addEventListener('click', moveSlide);
    
        nextBg.addEventListener('click', moveSlide);
    
        function moveSlide(event) {
            nextBg.style.display = "none";
            thisSlide.style.background = "rgba(37, 196, 255, .3)";
            nextSlide.style.opacity = "1";
            if (nextSlideNr === 2) {
                slideTwo();
            }
            thisSlide.removeEventListener('mousemove', mouseCurtain);
            nextBg.removeEventListener('click', mouseCurtain);
            next.removeEventListener('click', moveSlide);
        }

        function mouseCurtain(event) {
            console.log(event.clientX / event.view.innerWidth)
            let amount = 100 * event.clientX / event.view.innerWidth * 2.1;
            let watermarkAmount = -70 - (event.view.innerWidth - event.clientX);
            let complicated = true;

            nextBg.style.transform = `translateX(-${amount}vw)`;
            nextBg.style.backgroundPositionX = watermarkAmount + `px`
            slideOneTitleOne.style.transform = `translateX(-${amount / 20}vw)`;
            slideOneTitleTwo.style.transform = `translateX(${amount / 15}vw)`;

            if (event.clientX > event.view.innerWidth * 0.481) {
                if (svgNext.classList.contains('svg-next-black')) {
                    svgNext.classList.replace('svg-next-black', 'svg-next-white');
                }
            } else if (event.clientX < event.view.innerWidth * 0.481) {
                if (svgNext.classList.contains('svg-next-white')) {
                    svgNext.classList.replace('svg-next-white', 'svg-next-black');
                }
            }

            if (event.clientX > event.view.innerWidth * 0.75) {
                slideOneTitleOne.innerHTML = "Uzzini kā mēs";
                slideOneTitleTwo.innerHTML = "Tev varam palīdzēt";
            }
            if (event.clientX < event.view.innerWidth * 0.75) {
                slideOneTitleOne.innerHTML = "15 gadu pieredze";
                slideOneTitleTwo.innerHTML = "komunikācijas nozarē";
            }

            if (complicated === false) {
                nextBg.style.background = '#00bbff30';
            } else if (complicated === true) {
                if (event.clientX > event.view.innerWidth * 0.525) {
                    if (logoBlue.classList.contains('logo-blue')) {
                        logoBlue.classList.replace('logo-blue', 'logo-white');
                    }
                    for (letter of logoLetters) {
                        if (letter.classList.contains('logo-black')) {
                            letter.classList.replace('logo-black', 'logo-white');
                        }
                    }
                } else if (event.clientX < event.view.innerWidth * 0.525) {
                    if (logoBlue.classList.contains('logo-white')) {
                        logoBlue.classList.replace('logo-white', 'logo-blue');
                    }
                    for (letter of logoLetters) {
                        if (letter.classList.contains('logo-white')) {
                            letter.classList.replace('logo-white', 'logo-black');
                        }
                    }
                }
                if (event.clientX > event.view.innerWidth * 0.75) {
                    for (h1 of h1Elements) {
                        if (h1.classList.contains('h1-blue')) {
                            h1.classList.replace('h1-blue', 'h1-white');
                        }
                    }
                } else if (event.clientX < event.view.innerWidth * 0.75) {
                    for (h1 of h1Elements) {
                        if (h1.classList.contains('h1-white')) {
                            h1.classList.replace('h1-white', 'h1-blue');
                        }
                    }
                }
            }
        }
    }
    
    function slideTwo() {
        const allIcons = document.getElementsByClassName('ico');
        const next = document.querySelector('.next-2');
        const prev = document.querySelector('.prev-2');
        const previousSlide = document.querySelector('.slide-1');
        const nextBg = document.getElementById('next-bg');
    
        app.style.transform = "translateX(-100vw)";
        for (ico of allIcons) {
            ico.classList.add('animate');
            ico.addEventListener('click', icoDescription);
        }
    
        setTimeout(() => {
            for (ico of allIcons) {
                ico.classList.remove('animate');
            }
        }, 3000);
    
        function icoDescription(descEvent) {
            let ico = descEvent.target;
            let descriptionClass = String(descEvent.target.classList[0]) + '-desc';
    
            ico.classList.toggle('ico');
            ico.classList.toggle(descriptionClass);
            ico.classList.toggle('ico-description');
        }
    
        prev.onclick = () => {
            app.style.transform = "translateX(0vw)";
            previousSlide.style.background = "url('img/bg.jpg') center center no-repeat" ;
            nextBg.style.display = "block";
            nextBg.style.animationDelay = "1s";
            nextBg.style.animationDuration = "2s";
            app.innerHTML = "";
            init(initEvent);
        }
    }

    const slideOneHtml = `
        <div class="slide slide-1">
            <div id="title">
                <h1 class="h1-blue slide-1-title slide-1-title-1">15 gadu pieredze</h1>
                <h1 class="h1-blue slide-1-title slide-1-title-2">komunikācijas nozarē</h1> 
            </div>
            <div id="logo">
            <svg id="svg-logo" data-name="B Communications logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 98.86 123.36">
                <path class="cls-1 logo-blue" d="M86,49.32c10,28.14-11.57,54.49-38.67,53A39,39,0,0,1,21,36.78a.69.69,0,0,1,1.21.46V48a2,2,0,0,1-.23.92A31.64,31.64,0,0,0,20.43,75,29.34,29.34,0,0,0,37.7,92.35c23.17,8.6,45-9.74,42.67-32.23a31.09,31.09,0,0,0-43-25.38.41.41,0,0,1-.57-.38V27.19a.94.94,0,0,1,.65-.9,39.89,39.89,0,0,1,27.2,1.07C73.21,30.72,82.88,40.66,86,49.32Z"/>
                <path class="cls-2" d="M73.12,60.23a23.92,23.92,0,0,1-25.69,27C35,86.2,25.54,75.39,25.54,62.87V7.39a1.23,1.23,0,0,1,1.22-1.23h5.45a1.23,1.23,0,0,1,1.23,1.23V45.67A23.88,23.88,0,0,1,73.12,60.23Zm-7.83,5.26A16,16,0,1,0,51.52,79.26,16,16,0,0,0,65.29,65.49Z"/>
                <path class="logo-letter logo-black" d="M2.43,118.73a2.76,2.76,0,0,1-1.11-1.16,3.84,3.84,0,0,1-.38-1.74,3.73,3.73,0,0,1,.4-1.77,3,3,0,0,1,1.13-1.19,3.37,3.37,0,0,1,1.7-.42,4.09,4.09,0,0,1,1.31.22,2.78,2.78,0,0,1,1,.61l-.4.94a2.91,2.91,0,0,0-1.83-.72,1.8,1.8,0,0,0-1.45.61,3,3,0,0,0,0,3.4,1.85,1.85,0,0,0,1.45.59,2.92,2.92,0,0,0,1.83-.71l.4.93a2.71,2.71,0,0,1-1,.6,4,4,0,0,1-1.33.22A3.41,3.41,0,0,1,2.43,118.73Z"/>
                <path class="logo-letter logo-black" d="M8.82,118.73a2.76,2.76,0,0,1-1.11-1.16,4.21,4.21,0,0,1,0-3.54,2.73,2.73,0,0,1,1.11-1.17,3.29,3.29,0,0,1,1.66-.41,3.31,3.31,0,0,1,1.65.41,2.71,2.71,0,0,1,1.1,1.17,4.21,4.21,0,0,1,0,3.54,2.74,2.74,0,0,1-1.1,1.16,3.31,3.31,0,0,1-1.65.41A3.29,3.29,0,0,1,8.82,118.73Zm3-1.2a3.32,3.32,0,0,0,0-3.44,1.63,1.63,0,0,0-1.35-.6,1.66,1.66,0,0,0-1.37.6,3.29,3.29,0,0,0,0,3.44,1.68,1.68,0,0,0,1.37.59A1.65,1.65,0,0,0,11.83,117.53Z"/>
                <path class="logo-letter logo-black" d="M24.63,115v4H23.34v-4a2,2,0,0,0-.29-1.22,1.09,1.09,0,0,0-.92-.38A1.43,1.43,0,0,0,21,114a2.08,2.08,0,0,0-.43,1.39v3.65H19.24v-4a2.07,2.07,0,0,0-.29-1.22,1.1,1.1,0,0,0-.93-.38,1.46,1.46,0,0,0-1.17.51,2.09,2.09,0,0,0-.44,1.39v3.65H15.13v-4.63a14.35,14.35,0,0,0-.1-1.82h1.2l.12,1.08a2,2,0,0,1,.8-.91,2.35,2.35,0,0,1,1.23-.32,1.87,1.87,0,0,1,2,1.24,2.15,2.15,0,0,1,.86-.91,2.52,2.52,0,0,1,1.28-.33C23.92,112.45,24.63,113.31,24.63,115Z"/>
                <path class="logo-letter logo-black" d="M36,115v4h-1.3v-4a2.07,2.07,0,0,0-.28-1.22,1.1,1.1,0,0,0-.93-.38,1.46,1.46,0,0,0-1.17.51,2.08,2.08,0,0,0-.43,1.39v3.65H30.59v-4a2.07,2.07,0,0,0-.29-1.22,1.09,1.09,0,0,0-.92-.38,1.47,1.47,0,0,0-1.18.51,2.09,2.09,0,0,0-.44,1.39v3.65H26.49v-4.63a14.24,14.24,0,0,0-.11-1.82h1.21l.11,1.08a2.11,2.11,0,0,1,.81-.91,2.34,2.34,0,0,1,1.22-.32,1.87,1.87,0,0,1,2,1.24,2.22,2.22,0,0,1,.86-.91,2.53,2.53,0,0,1,1.29-.33C35.27,112.45,36,113.31,36,115Z"/>
                <path class="logo-letter logo-black" d="M43.44,112.6v6.45H42.19V118a2.16,2.16,0,0,1-.85.87,2.41,2.41,0,0,1-1.21.3c-1.55,0-2.33-.86-2.33-2.58v-4h1.28v3.94a1.74,1.74,0,0,0,.33,1.17,1.22,1.22,0,0,0,1,.38,1.66,1.66,0,0,0,1.27-.51,1.9,1.9,0,0,0,.48-1.36V112.6Z"/>
                <path class="logo-letter logo-black" d="M51.08,115v4h-1.3v-3.94a2,2,0,0,0-.32-1.23,1.32,1.32,0,0,0-1-.38,1.76,1.76,0,0,0-1.32.51,1.93,1.93,0,0,0-.49,1.37v3.67H45.33v-4.63a14.35,14.35,0,0,0-.1-1.82h1.2l.12,1.12a2.08,2.08,0,0,1,.89-.94,2.61,2.61,0,0,1,1.32-.33C50.3,112.45,51.08,113.31,51.08,115Z"/>
                <path class="logo-letter logo-black" d="M52.8,109.79h1.5v1.36H52.8Zm.12,9.26V112.6h1.27v6.45Z"/>
                <path class="logo-letter logo-black" d="M57.19,118.73a2.68,2.68,0,0,1-1.1-1.16,4.05,4.05,0,0,1,0-3.51,2.88,2.88,0,0,1,1.13-1.19,3.32,3.32,0,0,1,1.7-.42,4.08,4.08,0,0,1,1.3.22,2.7,2.7,0,0,1,1,.61l-.39.94A3,3,0,0,0,59,113.5a1.82,1.82,0,0,0-1.46.61,3,3,0,0,0,0,3.4,1.87,1.87,0,0,0,1.46.59,2.92,2.92,0,0,0,1.83-.71l.39.93a2.71,2.71,0,0,1-1,.6,3.89,3.89,0,0,1-1.32.22A3.42,3.42,0,0,1,57.19,118.73Z"/>
                <path class="logo-letter logo-black" d="M68.36,112.6v6.45H67.08V118a1.88,1.88,0,0,1-.84.88,2.57,2.57,0,0,1-1.29.31,2.82,2.82,0,0,1-1.51-.41,2.71,2.71,0,0,1-1-1.16,4.4,4.4,0,0,1,0-3.51,2.82,2.82,0,0,1,1-1.19,2.85,2.85,0,0,1,2.78-.11,2.12,2.12,0,0,1,.84.89V112.6Zm-1.76,4.91a2.72,2.72,0,0,0,.48-1.71,2.68,2.68,0,0,0-.48-1.71,1.82,1.82,0,0,0-2.72,0,2.67,2.67,0,0,0-.49,1.72,2.57,2.57,0,0,0,.49,1.68,1.69,1.69,0,0,0,1.37.61A1.64,1.64,0,0,0,66.6,117.51Z"/>
                <path class="logo-letter logo-black" d="M71.93,113.6v3.24a1.29,1.29,0,0,0,.29.94,1.12,1.12,0,0,0,.8.27,2.27,2.27,0,0,0,.67-.1v1a3.13,3.13,0,0,1-1,.14,2.06,2.06,0,0,1-1.54-.56,2.26,2.26,0,0,1-.55-1.64V113.6H69.39v-1h1.25V111l1.29-.44v2h1.78v1Z"/>
                <path class="logo-letter logo-black" d="M74.78,109.79h1.5v1.36h-1.5Zm.12,9.26V112.6h1.27v6.45Z"/>
                <path class="logo-letter logo-black" d="M79.18,118.73a2.76,2.76,0,0,1-1.11-1.16,4.21,4.21,0,0,1,0-3.54,2.73,2.73,0,0,1,1.11-1.17,3.55,3.55,0,0,1,3.31,0A2.73,2.73,0,0,1,83.6,114a4.21,4.21,0,0,1,0,3.54,2.76,2.76,0,0,1-1.11,1.16,3.55,3.55,0,0,1-3.31,0Zm3-1.2a2.76,2.76,0,0,0,.47-1.73,2.68,2.68,0,0,0-.48-1.71,1.63,1.63,0,0,0-1.35-.6,1.67,1.67,0,0,0-1.37.6,3.32,3.32,0,0,0,0,3.44,1.66,1.66,0,0,0,1.36.59A1.68,1.68,0,0,0,82.2,117.53Z"/>
                <path class="logo-letter logo-black" d="M91.24,115v4h-1.3v-3.94a1.89,1.89,0,0,0-.32-1.23,1.32,1.32,0,0,0-1-.38,1.72,1.72,0,0,0-1.31.51,1.89,1.89,0,0,0-.5,1.37v3.67H85.49v-4.63a14.35,14.35,0,0,0-.1-1.82h1.2l.12,1.12a2.08,2.08,0,0,1,.89-.94,2.64,2.64,0,0,1,1.32-.33C90.46,112.45,91.24,113.31,91.24,115Z"/>
                <path class="logo-letter logo-black" d="M92.67,118.32l.38-.93a3.76,3.76,0,0,0,2.32.76,1.87,1.87,0,0,0,1-.22.71.71,0,0,0,.34-.63.69.69,0,0,0-.24-.55,2.12,2.12,0,0,0-.79-.34l-1.08-.25a2.45,2.45,0,0,1-1.28-.63,1.55,1.55,0,0,1-.44-1.14,1.69,1.69,0,0,1,.69-1.4,3,3,0,0,1,1.85-.54,3.79,3.79,0,0,1,1.31.22,3.07,3.07,0,0,1,1.06.61l-.4.91a3.14,3.14,0,0,0-2-.74,1.76,1.76,0,0,0-1,.23.77.77,0,0,0-.35.66.74.74,0,0,0,.22.54,1.59,1.59,0,0,0,.69.32l1.1.27a2.7,2.7,0,0,1,1.36.64,1.54,1.54,0,0,1,.44,1.15,1.6,1.6,0,0,1-.69,1.37,3.17,3.17,0,0,1-1.9.51A4,4,0,0,1,92.67,118.32Z"/>
            </svg>
            </div>
            <div id="next" class="bounce">
                <svg viewBox="0 0 23.38 35.62">
                    <polygon class="svg-next svg-next-black" points="5.63 34.52 1.62 30.51 14.18 17.94 1.62 5.38 5.63 1.37 22.2 17.94 5.63 34.52"/>
                </svg>
            </div>
            <div id="next-bg"></div>
        </div>
    `;

    const slideTwoHtml = `
        <div class="slide slide-2">
            <div class="slide-inner">
                <div id="icons">
                    <div id="grid-ico">
                        <div class="ico-1 ico"></div>
                        <div class="ico-2 ico"></div>
                        <div class="ico-3 ico"></div>
                        <div class="ico-4 ico"></div>
                        <div class="ico-5 ico"></div>
                        <div class="ico-6 ico"></div>
                        <div class="ico-7 ico"></div>
                        <div class="ico-8 ico"></div>
                        <div class="ico-9 ico"></div>
                    </div>
                </div>
                <div class="prev prev-2"></div>
                <div class="next next-2"></div>
            </div>
        </div>
    `;

    const allSlides = slideOneHtml + slideTwoHtml;

    app.insertAdjacentHTML('afterbegin', allSlides);

    slideOne(initEvent);

}


// document.addEventListener('mousemove', (event) => {
//     mouseMoveFunction(event);
// });

// function mouseMoveFunction(event) {
//     const app = document.querySelector('app');

//     if (event.clientX > event.view.innerWidth * 0.7) {
//         let amount = 100 * event.clientX / event.view.innerWidth / 30;
//         app.style.left = `-${amount}vw`;
//     } else if (event.clientX < event.view.innerWidth * 0.6) {
//         let amount = 100 * event.clientX / event.view.innerWidth / 200;
//         app.style.left = `-${amount}vw`;
//     }
// }


/* 
document.addEventListener('mousemove', (event) => {
    mouseMoveFunction(event);
});

function mouseMoveFunction(event) {
    const nextBg = document.querySelector('#next-bg');
    const svgNext = document.querySelector('.svg-next');
    const next = document.querySelector('#next');
    const thisBg = document.querySelector('#this-bg');

    // console.log(svgNext.classList);
    // console.log(next.classList);
    // console.log(event.clientX);

    if (event.clientX > event.view.innerWidth * 0.6) {
        let amount = 100 * event.clientX / event.view.innerWidth / 20;
        nextBg.style.transform = `translateX(-${amount}%)`;
        if (svgNext.classList.contains('svg-next-black')) {
            svgNext.classList.replace('svg-next-black', 'svg-next-white');
        }
        next.classList.remove('bounce');
    } else if (event.clientX < event.view.innerWidth * 0.6) {
        let amount = 100 * event.clientX / event.view.innerWidth / 200;
        console.log(amount);
        nextBg.style.transform = `translateX(-${amount}%)`;
        if (svgNext.classList.contains('svg-next-white')) {
            svgNext.classList.replace('svg-next-white', 'svg-next-black');
        }
    }

    nextBg.addEventListener('mouseover', (event) => {
        thisBg.classList.add('this-move-back');
    })
}

*/