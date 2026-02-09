{

let appsTabHost = document.getElementById("appsTabHost")
let mainAppsHost = document.getElementById("mainAppsHost")

function addIcon(appsTab, x, y, imgPath) {
    let appIcon = document.createElement("div")
    appIcon.classList.add("appIcon")

    appsTab.appendChild(appIcon)
}

function addAppsTab(tabHost) {
    let appsTab = document.createElement("div")
    appsTab.classList.add("appsTab")

    addIcon(appsTab, 2, 2, "wallpapers/1.jpg")

    tabHost.appendChild(appsTab)
}

addAppsTab(appsTabHost)
addAppsTab(appsTabHost)

addAppsTab(mainAppsHost)

}