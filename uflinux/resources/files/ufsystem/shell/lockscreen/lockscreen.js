{

const curtain = document.getElementById("curtain")
const password_block = document.getElementById("password-block")

let pointerdown = false
let startY = null
let deltaY = null

curtain.addEventListener("pointerdown", (e) => {
    pointerdown = true
    startY = e.clientY
    curtain.setPointerCapture(e.pointerId)
    curtain.classList.add("curtain-disable-transition")
    password_block.classList.add("password-buttons-no-opacity-animation")
})

curtain.addEventListener("pointermove", (e) => {
    if (startY == null) return
    deltaY = e.clientY - startY
    if (deltaY > 0) deltaY = 0
    requestAnimationFrame(() => {
        if (!pointerdown) return
        curtain.style.transform = "translateY(" + deltaY + "px)"

        document.querySelectorAll(".password-button").forEach(password_button => {
            password_button.style.opacity = -deltaY / window.innerHeight
        })
    })
})

function toggleCurtain(state) {
    if (state) {
        curtain.classList.add("curtain-active")
        document.querySelectorAll(".password-button").forEach(password_button => {
            password_button.style.opacity = 1
        })
    } else {
        curtain.classList.remove("curtain-active")
        document.querySelectorAll(".password-button").forEach(password_button => {
            password_button.style.opacity = 0
        })
    }
}

document.addEventListener("pointerup", () => {
    if (!pointerdown) return
    pointerdown = false

    curtain.classList.remove("curtain-disable-transition")
    password_block.classList.remove("password-buttons-no-opacity-animation")
    toggleCurtain(deltaY < -(window.innerHeight / 4))
    curtain.style.transform = null

    startY = null
    deltaY = null
})

document.addEventListener("keydown", function(event) {
    if (pointerdown) return

    if (event.key === "Escape") {
        toggleCurtain(false)
        event.preventDefault()
    }
    
    if (event.key === " ") {
        toggleCurtain(true)
        event.preventDefault()
    }
})

}