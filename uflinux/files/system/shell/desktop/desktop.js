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

function addAppsTab(tabHost) {
    let appsTab = document.createElement("div")
    appsTab.classList.add("appsTab")

    addIcon(appsTab, 2, 2, "wallpapers/18.jpg")

    tabHost.appendChild(appsTab)
}

if (!storage.desktop.defaultAppsTabsLoaded) {
    let apps = getAllApps()

    

    storage.desktop.defaultAppsTabsLoaded = true;
}

addAppsTab(appsTabHost)
addAppsTab(appsTabHost)

addAppsTab(mainAppsHost)

}