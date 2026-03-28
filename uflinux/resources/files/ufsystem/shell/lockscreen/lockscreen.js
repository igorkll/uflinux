{

const curtain = document.getElementById("curtain")

document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
        curtain.classList.remove("curtain-active")
        event.preventDefault()
    }
    
    if (event.key === " ") {
        curtain.classList.add("curtain-active")
        event.preventDefault()
    }
})

let startY = null
let deltaY = null

curtain.addEventListener("pointerdown", (e) => {
    startY = e.clientY
    curtain.setPointerCapture(e.pointerId)
})

curtain.addEventListener("pointermove", (e) => {
    if (startY == null) return
    deltaY = e.clientY - startY
    curtain.style.transform = "translateY(" + deltaY + "px)"
})

document.addEventListener("pointerup", () => {
    if (deltaY < -(window.innerHeight / 4)) {
        curtain.classList.add("curtain-active")
    } else {
        curtain.classList.remove("curtain-active")
    }

    curtain.style.transform = null

    startY = null
    deltaY = null
})

}