{

const appsTabHost = document.getElementById('appsTabHost')

document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight')
        appsTabHost.scrollBy({ left: appsTabHost.clientWidth, behavior: 'smooth' })

    if (e.key === 'ArrowLeft')
        appsTabHost.scrollBy({ left: -appsTabHost.clientWidth, behavior: 'smooth' })

    if (/^[0-9]$/.test(e.key)) {
        let page = +e.key
        if (page === 0) page = 10

        appsTabHost.scrollTo({
            left: appsTabHost.clientWidth * (page - 1),
            behavior: 'smooth'
        })
    }

    e.preventDefault()
})

}