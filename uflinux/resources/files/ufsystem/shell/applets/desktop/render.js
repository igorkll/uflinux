{

let timelabel = document.getElementById("timelabel")

window.updateTime = function () {
    const now = new Date()

    const time = now.toLocaleTimeString('en-US', { hour12: false })     
    const date = now.toLocaleDateString('en-US', {
        weekday: 'long',    // "Wednesday"
        year: 'numeric',    // "2026"
        month: 'long',      // "February"
        day: '2-digit'      // "11"
    })

    timelabel.innerText = time
}

updateTime()
setInterval(updateTime, 1000)

}