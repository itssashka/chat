window.addEventListener('resize', () => {
    setVhSize();
})

window.addEventListener('orientationchange', () => {
    setVhSize();
})

function setVhSize() {
    console.log(window.innerHeight);
    document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
}