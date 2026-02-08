let defaultStorage = {
    background: {
        defaultBackgroundLoaded: false,
        file: null,
        objectFit: "cover",
    }
}

let storage = {}

function storage_setWallpaperFile(file) {
    let fileName = "wallpaper" + path.extname(file)
    let filePath = "/data/" + fileName

    

    storage.background.file = filePath
}

function storage_loadDefaultWallpaper() {
    if (!storage.background.defaultBackgroundLoaded) {
        storage_setWallpaperFile("wallpapers/1.jpg")
        storage.background.defaultBackgroundLoaded = true;
    }
}

function storage_load() {
    let storageData = localStorage.getItem("storageData")
    if (storageData) {
        try {
            storage = JSON.parse(storageData)
        } catch (e) {
            storage = {}
        }
    } else {
        storage = {}
    }

    mergeTables(storage, defaultStorage)

    storage_loadDefaultWallpaper()
}

function storage_save() {
    localStorage.setItem("storageData", JSON.stringify(storage))
}