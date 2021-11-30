
import Database from "./database.js"
import Table from "./gui.js"


let database = new Database('http://localhost:3000/users')
let table = new Table('table-container', 'user-table',
    ['id', 'name', 'emailAddress', 'address'])


async function update() {
    await database.getData()
    table.update(database.users)
    table.draw()
}

async function eventHandler(buttonType, id) {
    if (buttonType == 'plus') {
        if (!table.editMode) { table.addUser() }
    }
    if (buttonType == 'edit') {
        table.makeEditable(id)
    }
    if (buttonType == 'close') {
        if (!table.editMode) {
            await database.deleteUser(id)
            update()
        } else {
            table.showMessage(table.msgFinishEditingFirst)
        }
    }
    if (buttonType == 'undo') {
        table.undoEditing(id)
        if (id == 0) {
            update()
        }
    }
    if (buttonType == 'save') {
        let userData = table.applyEditing(id)
        if (!userData) { return }
        if (id > 0) {
            await database.updateUser(id, userData)
        } else {
            await database.createUser(id, userData)
        }
        setTimeout(update, 5100)
    }
}

async function init() {
    table.addEventHandler(eventHandler)
    await database.getData()
    table.fill(database.users)
    table.draw()
}

export default init
