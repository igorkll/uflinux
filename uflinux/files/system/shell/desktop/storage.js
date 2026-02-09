let defaultStorage = {
    desktop: {
        defaultAppsTabsLoaded: false,
        appsTabs: [],
        mainAppsTab: {}
    },
    background: {
        defaultBackgroundLoaded: false,
        file: null,
        objectFit: "cover",
        backgroundColor: "#474747"
    }
}

let storage = {}

function storage_setWallpaperFile(file) {
    let fileName = "wallpaper" + path.extname(file)
    let filePath = "/data/" + fileName

    fs.copyFileSync(file, filePath)

    storage.background.file = filePath
}

function storage_loadDefaultWallpaper() {
    if (!storage.background.defaultBackgroundLoaded) {
        storage_setWallpaperFile(path.join(__dirname, "wallpapers/1.jpg"))
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