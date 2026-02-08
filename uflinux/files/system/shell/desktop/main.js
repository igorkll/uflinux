{

function updateTime() {
    const now = new Date()
    const hours = String(now.getHours()).padStart(2, "0")
    const minutes = String(now.getMinutes()).padStart(2, "0")
    const seconds = String(now.getSeconds()).padStart(2, "0")
    document.getElementById("time").textContent = `${hours}:${minutes}:${seconds}`
}

//contain
//cover
//fill
//none
//scale-down

function updateWallpaper() {
    let src = storage.background.file
    let isVideo = false
    let objectFit = storage.background.objectFit
    let background = storage.background.backgroundColor

    let wallpaperBase = document.getElementById("wallpaperBase")
    wallpaperBase.style.background = background

    let wallpaperImg = document.getElementById("wallpaperImg")
    let wallpaperVideo = document.getElementById("wallpaperVideo")
    if (src) {
        if (isVideo) {
            wallpaperVideo.src = src
            wallpaperVideo.style.objectFit = objectFit
            wallpaperVideo.style.display = 'initial'
            wallpaperImg.style.display = 'none'
        } else {
            wallpaperImg.src = src
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