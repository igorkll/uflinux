{

const curtain = document.getElementById("curtain")


document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        curtain.classList.remove("curtain-active")
        event.preventDefault();
    }
    
    if (event.key === ' ') {
        curtain.classList.add("curtain-active")
        event.preventDefault();
    }
});

}