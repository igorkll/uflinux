{

let appsTabHost = document.getElementById("appsTabHost")
let mainAppsHost = document.getElementById("mainAppsHost")

function addIcon(appsTab, x, y, imgPath) {
    let appIcon = document.createElement("div")
    appIcon.classList.add("appIcon")

    let appImg = document.createElement("img")
    appImg.src = imgPath

    appIcon.appendChild(appImg)
    appsTab.appendChild(appIcon)
}

function addAppsTab(tabHost, tab=null) {
    let appsTab = document.createElement("div")
    appsTab.classList.add("appsTab")

    console.log(tab)

    tabHost.appendChild(appsTab)
}

// ----------------- register default apps
if (!storage.desktop.defaultAppsTabsLoaded || true) {
    const appsInfo = getAllApps()

    let x = 1
    let y = 1
    let sizeX = 4
    let sizeY = 4
    let tab = []

    storage.desktop.appsTabs = []
    for (const appInfo of appsInfo) {
        const icon = {
            x,
            y,
            info: appInfo
        }
        tab.push(icon)
        
        x++
        if (x > sizeX) {
            x = 1
            y++
            if (y > sizeY) {
                y = 1
                storage.desktop.appsTabs.push(tab)
                tab = []
            }
        }
    }

    storage.desktop.defaultAppsTabsLoaded = true
    storage_save()
}

// ----------------- add tabs
let tabAdded = false
for (const tab of storage.desktop.appsTabs) {
    addAppsTab(appsTabHost, tab)
    tabAdded = true
}

if (!tabAdded) {
    addAppsTab(appsTabHost)
}

addAppsTab(mainAppsHost, storage.desktop.mainAppsTab)

}