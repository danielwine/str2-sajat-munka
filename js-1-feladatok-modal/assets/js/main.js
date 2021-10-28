let body = document.querySelector('body');
let overlay = document.querySelector('div#overlay');

const showModal = () => {
    console.log('show');
    overlay.className = "overlay layer--visible";
    let section = document.querySelector('section.modal--hidden');
    section.className = "modal modal--visible";
    section.focus();
}

const hideModal = () => {
    overlay.className = "overlay layer--hidden";
    let section = document.querySelector('section.modal--visible');
    section.className = "modal modal--hidden";
}
