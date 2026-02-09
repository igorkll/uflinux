{

let appsTabHost = document.getElementById("appsTabHost")
let mainAppsHost = document.getElementById("mainAppsHost")

function addIcon(appsTab, icon) {
    let appIcon = document.createElement("div")
    appIcon.classList.add("appIcon")
    appIcon.style.gridColumn = icon.x;
    appIcon.style.gridRow = icon.y;

    let appImgDiv = document.createElement("div")
    appImgDiv.classList.add("appIconImgContainer");
    appIcon.appendChild(appImgDiv)

    let appImg = document.createElement("img")
    appImg.classList.add("appIconImg")
    appImg.src = icon.appInfo.iconPath
    appImgDiv.appendChild(appImg)

    let titleObj = document.createElement("p")
    titleObj.textContent = icon.appInfo.appName
    appIcon.appendChild(titleObj)

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
    let appInfo = getAppInfoFromDesktopFileName(appsInfo, desktopFileName)

    if (appInfo) {
        const icon = {
            x: storage.desktop.mainAppsTab.length + 1,
            y: 1,
            appInfo
        }
        storage.desktop.mainAppsTab.push(icon)
    }
}

function addMainAppsTab(appsInfo) {
    addMainAppTab(appsInfo, "org.telegram.desktop.Discord")
    addMainAppTab(appsInfo, "com.discordapp.Discord")
    addMainAppTab(appsInfo, "com.valvesoftware.Steam.desktop")
    addMainAppTab(appsInfo, "org.mozilla.firefox.desktop")
}

function refreshDefaultApps() {
    const appsInfo = getAllApps()

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
            appInfo
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