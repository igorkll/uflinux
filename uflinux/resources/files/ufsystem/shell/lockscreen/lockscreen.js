{

const curtain = document.getElementById("curtain")

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        curtain.classList.remove("curtain-active")
        event.preventDefault()
    }
    
    if (event.key === ' ') {
        curtain.classList.add("curtain-active")
        event.preventDefault()
    }
})

let startY = null
let deltaY = null

element.addEventListener('pointerdown', (e) => {
    startY = e.clientY
    element.setPointerCapture(e.pointerId)
})

element.addEventListener('pointermove', (e) => {
    if (startY == null) return
    deltaY = e.clientY - startY
})

document.addEventListener('pointerup', () => {
    startY = null
    deltaY = null
})

}