{

const container = document.querySelector('.appsTabHost')

let isDown = false
let startX
let scrollLeft
let target

container.addEventListener('mousedown', (e) => {
    isDown = true
    startX = e.pageX - container.offsetLeft
    scrollLeft = container.scrollLeft
    container.classList.add("disableSnap")
})

function scrollEnd() {
    isDown = false
    container.classList.remove('active')
}

container.addEventListener('mouseleave', () => {
    scrollEnd()
})

container.addEventListener('mouseup', () => {
    scrollEnd()
})

container.addEventListener('mousemove', (e) => {
    if (!isDown) return
    e.preventDefault()
    const x = e.pageX - container.offsetLeft
    const walk = x - startX
    target = scrollLeft - walk

    container.scrollTo({
        left: target,
        behavior: 'auto'
    })
})

}