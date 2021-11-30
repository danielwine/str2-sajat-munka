
const createAnyElement = (tag, className) => {
    let element = document.createElement(tag)
    if (className) { element.className = className }
    return element
}

class ButtonManager {
    buttonsH = 'plus'
    setIdx = 0
    buttons = [
        ['edit', 'close'],
        ['undo', 'save']
    ]

    addEventHandler(eventHandler) {
        this.handler = eventHandler
    }

    createButton(buttonType, styleClass, id) {
        let button = createAnyElement(
            'button', `fa fa-${buttonType} ${styleClass}`)
        if (id) { button.dataset.id = id }
        button.addEventListener('click',
            event => this.onButtonPressed(event, this.handler))
        return button
    }

    onButtonPressed(event, handler) {
        let id = event.target.dataset.id
        let tokenList = event.target.classList
        let buttonType = Object.values(tokenList).filter(
            item => item.startsWith('fa-'))[0].replace('fa-', '')
        if (handler) { handler(buttonType, id) }
    }
}

class Table {
    header = null
    body = null
    editMode = false
    editId = null
    undoStorage = null
    msgValidInput = 'Módosítás sikeresen mentve.'
    msgInvalidInput = 'Nem megfelelő formátumú adatok!'
    msgFinishEditingFirst =
        'Először be kell fejezned az aktuális szerkesztést'

    constructor(parentId, className, keys) {
        this.parent = document.querySelector(`#${parentId}`)
        this.className = className
        this.button = new ButtonManager()
        this.keys = keys
    }

    #addButtons(tr) {
        let styleClass
        let buttons = this.button.buttons[0]
        let td = createAnyElement('td')
        buttons.forEach((buttonType, index) => {
            !index % 2
                ? styleClass = 'button-primary'
                : styleClass = 'button-secondary'
            td.appendChild(
                this.button.createButton(
                    buttonType, styleClass, tr.dataset.id))
        })
        tr.appendChild(td)
    }

    #toggleEditMode(id) {
        if ((this.editMode == false) && (this.editId == null)) {
            this.editMode = true
            this.button.setIdx = 1
            this.editId = id
            return true
        }
        if (this.editMode == true) {
            if (id == this.editId) {
                this.editMode = false
                this.button.setIdx = 0
                this.editId = null
                return true
            } else {
                this.showMessage(this.msgFinishEditingFirst)
            }
        }
    }

    #switchButtons(tr) {
        for (let idx = 0; idx < tr.childNodes.length; idx++) {
            const element = tr.childNodes[idx]
            let btnType = element.classList[1]
            let btnTypeNew = `fa-${this.button.buttons[this.button.setIdx][idx]}`
            tr.childNodes[idx].className = element.className.replace(
                btnType, btnTypeNew
            )
        }
    }

    #createInput(content, key) {
        let input = createAnyElement('input')
        input.readOnly = true
        input.value = content
        input.className = `input-${key}`
        return input
    }

    #toggleInputMode(id) {
        let row = this.#getRowById(id)
        this.keys.forEach((key, index) => {
            if (key != 'id') {
                let input = this.#getInputElement(row, index)
                input.element.readOnly = !input.element.readOnly
            }
        })
    }

    #getRowById(id) {
        return document.querySelector(`tr[data-id="${id}"`)
    }

    #getButtonsById(id) {
        return document.querySelector(
            `tr[data-id="${id}"] td:last-child`)
    }

    #getInputElement(row, index) {
        let element = row.childNodes[index].childNodes[0]
        let inputType = element.classList[0].replace('input-', '')
        return { element, inputType }
    }

    #createRow(item, tagName) {
        let id
        let tr = createAnyElement('tr')
        this.keys.forEach(key => {
            let tx = createAnyElement(tagName)
            if (key == 'id') {
                id = item[key]
                tagName == 'td'
                    ? tx.textContent = id : tx.textContent = key
            } else {
                if (tagName == 'td') {
                    tx.appendChild(
                        this.#createInput(item[key], key))
                } else {
                    tx.textContent = key
                }
            }
            tr.appendChild(tx)
        })
        if (tagName == 'td') {
            tr.dataset.id = id
            this.#addButtons(tr)
        } else {
            let th = createAnyElement('th')
            th.appendChild(this.button.createButton(
                this.button.buttonsH, 'button-primary'))
            tr.appendChild(th)
        }
        return tr
    }

    #getUserObject(row) {
        let userObject = {}
        this.keys.forEach((key, index) => {
            if (key != 'id') {
                let inputObj = this.#getInputElement(row, index)
                let val = inputObj.element.value
                if (inputObj.inputType == key) { userObject[key] = val }
            }
        })
        return userObject
    }

    #setUserObject(row, userObject) {
        this.keys.forEach((key, index) => {
            if (key != 'id') {
                let inputObj = this.#getInputElement(row, index)
                if (inputObj.inputType == key) {
                    inputObj.element.value = userObject[key]
                }
            }
        })
    }

    addEventHandler(callback) {
        this.button.addEventHandler(callback)
    }

    addUser() {
        let tbody = document.querySelector('table tbody')
        let nullItem = {}
        this.keys.forEach(item => nullItem[item] = '')
        nullItem['id'] = 0
        let tr = this.#createRow(nullItem, 'td')
        tbody.prepend(tr)
        this.makeEditable(0)
    }

    makeEditable(id) {
        if (!this.#toggleEditMode(id)) { return false }
        this.#toggleInputMode(id)
        let row = this.#getRowById(id)
        row.classList.toggle('row-selected')
        this.undoStorage = this.#getUserObject(row)
        this.#switchButtons(this.#getButtonsById(id))
    }

    undoEditing(id) {
        this.#toggleInputMode(id)
        let row = this.#getRowById(id)
        row.classList.toggle('row-selected')
        this.#setUserObject(row, this.undoStorage)
        this.#toggleEditMode(id)
        this.#switchButtons(this.#getButtonsById(id))
    }

    hideMessage(row) {
        if (row.parentNode) {
            row.parentNode.removeChild(row);
        }
    }

    showMessage(msg, msgType = 'error') {
        let row = this.#getRowById(this.editId)
        let msgRow = createAnyElement('tr', `message message-${msgType}`)
        let msgItem = createAnyElement('td')
        msgItem.textContent = msg
        msgItem.colSpan = "5"
        msgRow.appendChild(createAnyElement('td'))
        msgRow.appendChild(msgItem)
        row.parentNode.insertBefore(msgRow, row.nextSibling)
        setTimeout(this.hideMessage, 5000, msgRow)
    }

    validate(userObject) {
        let ret
        let hunWord = '[A-ZÁÉÍÓÖŐÚÜŰ][a-záéíóöőúüű]+'
        const Patterns = {
            'name': new RegExp('^' + hunWord + ' ' + hunWord + '$'),
            'emailAddress': /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'address': /^\d+ ([A-Z][a-z]+ ){0,2}[A-Z][a-z]+$/
        }
        const invalidItems = Object.entries(userObject).filter(entry =>
            !entry[1].match(Patterns[entry[0]]))
        invalidItems.length == 0 ? ret = true : ret = false
        return ret
    }

    applyEditing(id) {
        let row = this.#getRowById(id)
        let userObject = this.#getUserObject(row)
        if (this.validate(userObject)) {
            this.showMessage(this.msgValidInput, 'info')
            this.#toggleEditMode(id)
            return userObject
        } else {
            this.showMessage(this.msgInvalidInput)
        }
    }

    fill(items) {
        this.header = createAnyElement('thead')
        this.header.appendChild(this.#createRow(items[0], 'th'))
        this.body = createAnyElement('tbody')
        this.update(items, this.body)
    }

    update(items, body = null) {
        this.editId = null
        this.editMode = false
        if (!body) {
            let body = document.querySelector('table tbody')
            body.innerHTML = ''
        }
        items.forEach(item => {
            this.body.appendChild(this.#createRow(item, 'td'))
        })
    }

    draw() {
        let table = document.querySelector('table')
        if (table) {
            table.appendChild(this.body)
        } else {
            let table = createAnyElement('table', this.className)
            table.appendChild(this.header)
            table.appendChild(this.body)
            this.parent.appendChild(table)
        }
    }
}

export default Table
