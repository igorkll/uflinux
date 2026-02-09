{

let appsTabHost = document.getElementById("appsTabHost")

function addIcon(appsTab, x, y, imgPath) {
    let appIcon = document.createElement("div")
    appIcon.classList.add("appIcon")

    appsTab.appendChild(appIcon)
}

function addAppsTab() {
    let appsTab = document.createElement("div")
    appsTab.classList.add("appsTab")

    addIcon(appsTab, 2, 2, "wallpapers/1.jpg")

    appsTabHost.appendChild(appsTab)
}

addAppsTab()
addAppsTab()

}