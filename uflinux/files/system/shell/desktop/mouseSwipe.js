{

let x, y, active = false;

document.addEventListener('mousedown', e => {
    active = true;
    x = e.clientX;
    y = e.clientY;
});

document.addEventListener('mousemove', e => {
    if (!active) return;
    window.scrollBy(x - e.clientX, y - e.clientY);
    x = e.clientX;
    y = e.clientY;
});

document.addEventListener('mouseup', () => active = false);

}