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