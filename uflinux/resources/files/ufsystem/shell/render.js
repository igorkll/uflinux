{

window.addEventListener("keydown", e => {
    if (e.key === "Tab") {
        e.preventDefault();
    }
});

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

}

(function() {
    let lastX = null, lastY = null, lastTime = null
    const MIN_SPEED = 512

    function handlePointerMove(event) {
        let x, y
        if (event.touches) {
            x = event.touches[0].clientX
            y = event.touches[0].clientY
        } else {
            x = event.clientX
            y = event.clientY
        }

        const now = performance.now()

        if (lastX !== null && lastY !== null && lastTime !== null) {
            const dx = x - lastX
            const dy = y - lastY
            const dt = (now - lastTime) / 1000
            const speed = Math.sqrt(dx*dx + dy*dy) / dt

            if (speed >= MIN_SPEED) {
                document.dispatchEvent(new CustomEvent('user_interaction'))
            }
        }

        lastX = x
        lastY = y
        lastTime = now
    }

    function handleOther(event) {
        document.dispatchEvent(new CustomEvent('user_interaction'))
    }

    document.addEventListener('mousemove', handlePointerMove)
    document.addEventListener('touchmove', handlePointerMove, { passive: true })
    document.addEventListener('touchstart', handleOther)
    document.addEventListener('keydown', handleOther)
    document.addEventListener('wheel', handleOther)
})();

(function() {
    function handle(event) {
        if (event.buttons > 0) {
            document.dispatchEvent(new CustomEvent('active_interaction'))
        }
    }

    document.addEventListener('pointermove', handle)
    document.addEventListener('pointerdown', handle)
})();
