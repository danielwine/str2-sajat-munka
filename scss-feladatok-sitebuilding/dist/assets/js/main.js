
let overlay = document.querySelector('div#overlay');
let actualModal = null;

document.onreadystatechange = () => {
    if (document.readyState == 'complete') {
        document.onscroll = () => {
            let navbar = document.querySelector('nav.navigation-bar')
            let scrollTop = window.scrollY;
            if (scrollTop > 200) {
                navbar.classList.add('navigation-bar__scrolled')
            } else {
                navbar.classList.remove('navigation-bar__scrolled')
            }
        }
    }
}

const showModal = (modalId) => {
    console.log('show');
    overlay.className = "overlay layer--visible";
    let section = document.querySelector(`#${modalId}.modal--hidden`);
    actualModal = modalId;
    section.className = "modal modal--visible";
    section.focus();
}

const hideModal = () => {
    let modalId = actualModal;
    overlay.className = "overlay layer--hidden";
    let section = document.querySelector(`#${modalId}.modal--visible`);
    section.className = "modal modal--hidden";
}
