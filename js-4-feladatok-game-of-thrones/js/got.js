
let characterList = [];
let previousSelection = null;

const storeCharacters = (characters) => {
    characterList = characters;
}

const nameCompareFunction = (a, b) => {
    let surnameA = a.name.includes(' ') ? a.name.split(' ')[1] : a.name;
    let surnameB = b.name.includes(' ') ? b.name.split(' ')[1] : b.name;
    return surnameA > surnameB || -1;
}

const getCharacters = async () => {
    const response = await fetch('./json/got.json');
    let data = await response.json();
    data = data.filter(item => !item.hasOwnProperty('dead'));
    data.shift();
    data = data.sort(nameCompareFunction)
    storeCharacters(data);
    return data;
}

const createAnyElement = (tag, className = '') => {
    let element = document.createElement(tag);
    element.className = className;
    return element;
}

const createCharacterBlock = (index, character) => {
    let div = createAnyElement('div', 'character');
    div.dataset.index = index;
    let img = createAnyElement('img');
    let name = createAnyElement('div', 'name');
    name.textContent = character.name;
    img.src = character.portrait;
    img.addEventListener('click', handleClickEvent);
    div.appendChild(img);
    div.appendChild(name);
    return div;
}

const showCharacters = async () => {
    let characterBlocks = [];
    let main = document.querySelector('main');
    let characters = await getCharacters();
    console.log(characters);
    for (let data of Object.entries(characters)) {
        let [index, character] = data;
        characterBlocks.push(createCharacterBlock(index, character));
    }
    let container = createAnyElement('div', 'characters');
    characterBlocks.forEach(element => {
        container.appendChild(element);
    });
    main.appendChild(container);
}

const setCharacterDetails = (character, image, name, house, bio) => {
    image.src = character.picture;
    name.textContent = character.name;
    if (!character.house) { character.house = 'unknown' }
    if (character.house) {
        house.src = `./assets/houses/${character.house}.png`;
    }
    if (character.bio == '') {
        bio.textContent = 'No biographical information available.'
    } else {
        bio.textContent = character.bio;
    }
}

const showCharacterDetails = (characterIndex) => {
    const character = characterList[characterIndex];
    const image = document.querySelector('aside article .picture img');
    const name = document.querySelector('aside article .name-container .name')
    const house = document.querySelector('aside article .name-container .house img')
    const bio = document.querySelector('aside article .bio');
    if (characterIndex) {
        setCharacterDetails(character, image, name, house, bio);
    } else {
        bio.textContent = 'Character not found.';
        image.src = '';
        name.textContent = '';
        house.src = '';
    }
}

const handleClickEvent = (ev) => {
    const index = ev.path[1].dataset.index;
    if (previousSelection) { 
        previousSelection.classList.toggle('character-active') }
    const object = document.querySelector(`.character[data-index="${index}"]`);
    object.classList.toggle('character-active');
    previousSelection = object;
    console.log(object);
    console.log(ev);
    showCharacterDetails(index);
}

const handleSearchRequest = (ev) => {
    let hitIndex = null;
    let inputField = document.querySelector('.search-field .search-input input');
    let results = characterList.some(
        (element, index) => {
            if (inputField.value.toLowerCase() === element.name.toLowerCase()) {
                hitIndex = index;
            }
        })
    showCharacterDetails(hitIndex);
}

const initialize = () => {
    let searchButton = document.querySelector('.search-field #search-button');
    let searchInput = document.querySelector('.search-field .search-input input');
    searchButton.addEventListener('click', handleSearchRequest);
    searchInput.addEventListener('keyup', ({ key }) => {
        console.log(key);
        if (key === "Enter") {
            handleSearchRequest();
        }
    })
}

initialize()

export {
    getCharacters,
    showCharacters
}
