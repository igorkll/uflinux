{

window.addEventListener("keydown", e => {
    if (e.key === "Tab") {
        e.preventDefault();
    }
});

let timelabel = document.getElementById("timelabel")

window.updateTime = function () {
    const now = new Date()

    // Время с нулями
    const time = now.toLocaleTimeString('en-US', { hour12: false }) 
    // "14:05:09"

    // Дата с именем дня недели и месяца
    const date = now.toLocaleDateString('en-US', {
        weekday: 'long',    // "Wednesday"
        year: 'numeric',    // "2026"
        month: 'long',      // "February"
        day: '2-digit'      // "11"
    })
    // "Wednesday, February 11, 2026"

    timelabel.innerHTML = `
        <div class="columnBox">
            <div>${time}</div>
            <div>${date}</div>
        </div>
    `
}

//contain
//cover
//fill
//none
//scale-down

let videoExtensions = [".mp4", ".webm", ".ogv", ".mov", ".avi", ".mkv"]

window.updateWallpaper = function () {
    let file = storage.background.file
    let fileExt = path.extname(file)
    let isVideo = videoExtensions.includes(fileExt)
    let objectFit = storage.background.objectFit
    let backgroundColor = storage.background.backgroundColor

    let wallpaperBase = document.getElementById("wallpaperBase")
    wallpaperBase.style.background = backgroundColor

    let wallpaperImg = document.getElementById("wallpaperImg")
    let wallpaperVideo = document.getElementById("wallpaperVideo")
    if (file) {
        if (isVideo) {
            wallpaperVideo.src = file
            wallpaperVideo.style.objectFit = objectFit
            wallpaperVideo.style.display = 'initial'
            wallpaperImg.style.display = 'none'
        } else {
            wallpaperImg.src = file
            wallpaperImg.style.objectFit = objectFit
            wallpaperImg.style.display = 'initial'
            wallpaperVideo.style.display = 'none'
        }
    } else {
        wallpaperImg.style.display = 'none'
        wallpaperVideo.style.display = 'none'
    }
}

storage_load()

updateWallpaper()
updateTime()
setInterval(updateTime, 1000)

}