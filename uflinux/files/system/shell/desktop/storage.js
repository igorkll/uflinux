let defaultStorage = {
    background: {
        defaultBackgroundLoaded: false,
        file: null,
        objectFit: "cover",
    }
}

let storage = {}

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
}

function storage_save() {
    localStorage.setItem("storageData", JSON.stringify(storage))
}