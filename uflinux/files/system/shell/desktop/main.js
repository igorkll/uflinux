{

function updateTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    document.getElementById("time").textContent = `${hours}:${minutes}:${seconds}`;
}

function updateWallpaper() {
    let src = "wallpapers/12.jpg";
    let isVideo = false;
    let contentFit = 'contains';
    let background = '#ff0000';

    let wallpaperBase = document.getElementById("wallpaperBase");
    wallpaperBase.classList.background = background;

    let wallpaperImg = document.getElementById("wallpaperImg");
    let wallpaperVideo = document.getElementById("wallpaperVideo");
    if (isVideo) {
        wallpaperVideo.src = src;
        wallpaperVideo.classList.contentFit = contentFit;
        wallpaperVideo.classList.display = 'initial';
        wallpaperImg.classList.display = 'none';
    } else {
        wallpaperImg.src = src;
        wallpaperImg.classList.contentFit = contentFit;
        wallpaperImg.classList.display = 'initial';
        wallpaperVideo.classList.display = 'none';
    }
}

updateWallpaper();
updateTime();
setInterval(updateTime, 1000);

}