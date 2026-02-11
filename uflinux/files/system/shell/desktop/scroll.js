{

const appsTabHost = document.getElementById('appsTabHost')

document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight')
        appsTabHost.scrollBy({ left: appsTabHost.clientWidth, behavior: 'smooth' })

    if (e.key === 'ArrowLeft')
        appsTabHost.scrollBy({ left: -appsTabHost.clientWidth, behavior: 'smooth' })

    if (e.key === 'ArrowDown')
        appsTabHost.scrollBy({ top: appsTabHost.clientHeight, behavior: 'smooth' })

    if (e.key === 'ArrowUp')
        appsTabHost.scrollBy({ top: -appsTabHost.clientHeight, behavior: 'smooth' })

    e.preventDefault()
})

}