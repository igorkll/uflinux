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

    addIcon(appsTab, 2, 2, "wallpapers/18.jpg")

    tabHost.appendChild(appsTab)
}

// ----------------- register default apps
if (!storage.desktop.defaultAppsTabsLoaded) {
    let appsInfo = getAllApps()

    let x = 0
    let y = 0
    for (appInfo in appsInfo) {
        
    }

    storage.desktop.defaultAppsTabsLoaded = true;
}

// ----------------- add tabs
let tabAdded = false
for (tab in storage.desktop.appsTabs) {
    addAppsTab(appsTabHost, tab)
    tabAdded = true
}

if (!tabAdded) {
    addAppsTab(appsTabHost)
}

addAppsTab(mainAppsHost, storage.desktop.mainAppsTab)

}