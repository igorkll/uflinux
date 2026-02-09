{

let appsTabHost = document.getElementById("appsTabHost")
let mainAppsHost = document.getElementById("mainAppsHost")

function addIcon(appsTab, icon) {
    let appIcon = document.createElement("div")
    appIcon.classList.add("appIcon")
    appIcon.style.gridColumn = icon.x;
    appIcon.style.gridRow = icon.y;

    let appImg = document.createElement("img")
    appImg.src = icon.info

    appIcon.appendChild(appImg)
    appsTab.appendChild(appIcon)
}

function addAppsTab(tabHost, tab=null) {
    let appsTab = document.createElement("div")
    appsTab.classList.add("appsTab")

    for (const icon of tab) {
        addIcon(appsTab, icon)
    }

    tabHost.appendChild(appsTab)
}

// ----------------- register default apps
function addMainAppTab(appsInfo, desktopFileName) {
    let appInfo
    for (const _appInfo of appsInfo) {
        console.log(path.basename(_appInfo.desktopFile))
        console.log(desktopFileName)
        
        if (path.basename(_appInfo.desktopFile) == desktopFileName) {
            appInfo = _appInfo
            break
        }
    }

    if (appInfo) {
        const icon = {
            x: storage.desktop.mainAppsTab.length + 1,
            y: 1,
            info: appInfo
        }
        storage.desktop.mainAppsTab.push(icon)
    }
}

function addMainAppsTab(appsInfo) {
    addMainAppTab(appsInfo, "discord.desktop")
    addMainAppTab(appsInfo, "telegram.desktop")
}

function refreshDefaultApps() {
    const appsInfo = getAllApps()
    console.log(appsInfo)

    let x = 1
    let y = 1
    let appsGridSize = calcAppsGridSize()
    let sizeX = appsGridSize[0]
    let sizeY = appsGridSize[1]
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

    storage.desktop.mainAppsTab = []
    addMainAppsTab(appsInfo)

    storage.desktop.defaultAppsTabsLoaded = true
    storage_save()
}

if (!storage.desktop.defaultAppsTabsLoaded || true) {
    refreshDefaultApps()
}

// ----------------- add tabs
function refreshApps() {
    document.querySelectorAll(".appsTab").forEach(element => {
        element.remove()
    })

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

refreshApps()

}