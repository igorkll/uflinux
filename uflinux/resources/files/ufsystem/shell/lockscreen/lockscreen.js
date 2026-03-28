{

const curtain = document.getElementById("curtain")

let pointerdown = false
let startY = null
let deltaY = null

curtain.addEventListener("pointerdown", (e) => {
    pointerdown = true
    startY = e.clientY
    curtain.setPointerCapture(e.pointerId)
    curtain.classList.add("curtain-disable-transition")
})

curtain.addEventListener("pointermove", (e) => {
    if (startY == null) return
    deltaY = e.clientY - startY
    if (deltaY > 0) deltaY = 0
    requestAnimationFrame(() => {
        curtain.style.transform = "translateY(" + deltaY + "px)"
    })
})

document.addEventListener("pointerup", () => {
    if (!pointerdown) return
    pointerdown = false

    curtain.classList.remove("curtain-disable-transition")

    if (deltaY < -(window.innerHeight / 4)) {
        curtain.classList.add("curtain-active")
    } else {
        curtain.classList.remove("curtain-active")
    }

    curtain.style.transform = null

    startY = null
    deltaY = null
})

document.addEventListener("keydown", function(event) {
    if (pointerdown) return

    if (event.key === "Escape") {
        curtain.classList.remove("curtain-active")
        event.preventDefault()
    }
    
    if (event.key === " ") {
        curtain.classList.add("curtain-active")
        event.preventDefault()
    }
})

}