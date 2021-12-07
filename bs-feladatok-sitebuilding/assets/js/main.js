
document.onreadystatechange = () => {
    if (document.readyState == 'complete') {
        document.onscroll = () => {
            let navbar = document.querySelector('nav.navbar')
            let scrollTop = window.scrollY;
            if (scrollTop > 200) {
                navbar.classList.add('bg-custom')
            } else {
                navbar.classList.remove('bg-custom')
            }
        }
    }
}
