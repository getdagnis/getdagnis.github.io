window.onload = launchSlide;

function launchSlide(slide) {
    const app = document.querySelector('app');
    const next = document.getElementById('next');
    const svgNext = document.querySelector('.svg-next');
    const nextBg = document.getElementById('next-bg');
    (slide.type === "load") ? slide = '.slide-1' : slide = slide;
    const thisSlide = document.querySelector(slide);
    const nextSlideNr = Number(slide.slice(7)) + 1;
    const nextSlideName = '.slide-' + nextSlideNr;
    const nextSlide = document.querySelector(nextSlideName);
    
    setTimeout(() => {
        thisSlide.addEventListener('mousemove', mouseCurtain);
    }, 1000);

    function mouseHint(event) {
        if (event.clientX > event.view.innerWidth * 0.8) {
            let amount = 100 * event.clientX / event.view.innerWidth / 20;
            nextBg.style.transform = `translateX(-${amount}vw)`;
            next.classList.remove('bounce');
            if (svgNext.classList.contains('svg-next-black')) {
                svgNext.classList.replace('svg-next-black', 'svg-next-white');
            }
        } else if (event.clientX > event.view.innerWidth * 0.6) {
            let amount = 100 * event.clientX / event.view.innerWidth / 100;
            nextBg.style.transform = `translateX(-${amount}vw)`;
        } else if (event.clientX < event.view.innerWidth * 0.5) {
            let amount = 100 * event.clientX / event.view.innerWidth / 200;
            nextBg.style.transform = `translateX(-${amount}vw)`;
            if (svgNext.classList.contains('svg-next-white')) {
                svgNext.classList.replace('svg-next-white', 'svg-next-black');
            }
        }
    }

    next.addEventListener('click', moveSlide);

    nextBg.addEventListener('click', moveSlide);

    function moveSlide(event) {
        nextBg.style.display = "none";
        thisSlide.style.background = "rgba(37, 196, 255, .3)";
        nextSlide.style.opacity = "1";
        if (nextSlideNr === 2) {
            launch2ndSlide();
        }
        thisSlide.removeEventListener('mousemove', mouseCurtain);
        nextBg.removeEventListener('click', mouseCurtain);
        next.removeEventListener('click', moveSlide);
    }

    function mouseCurtain(event) {
        let amount = 100 * event.clientX / event.view.innerWidth * 2.1 ;
        nextBg.style.transform = `translateX(-${amount}vw)`;

        if (event.clientX > event.view.innerWidth * 0.481) {
            if (svgNext.classList.contains('svg-next-black')) {
                svgNext.classList.replace('svg-next-black', 'svg-next-white');
            }
        } else if (event.clientX < event.view.innerWidth * 0.481) {
            if (svgNext.classList.contains('svg-next-white')) {
                svgNext.classList.replace('svg-next-white', 'svg-next-black');
            }
        }
    }
}

function launch2ndSlide() {
    const allIcons = document.getElementsByClassName('ico');
    const app = document.querySelector('app');

    app.style.transform = "translateX(-100vw)";
    for (ico of allIcons) ico.classList.add('animate');
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