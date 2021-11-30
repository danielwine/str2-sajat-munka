
class Database {
    users = {}
    constructor(serverAddress) {
        this.serverAddress = serverAddress
    }
    async getData() {
        let content
        let users
        try {
            content = await fetch(this.serverAddress)
        } catch (err) {
            alert(`Unable to fetch data from the server: \n${err}`)
        }
        try {
            users = await content.json()
        } catch (err) {
            alert(`Unable to decode data (invalid json?): \n${err}`)
        }
        this.users = users
    }

    async createUser(id, data) {
        let response
        try {
            response = await fetch(this.serverAddress, {
                method: "POST",
                mode: "cors",
                cache: "no-cache",
                headers: { 'Content-Type': 'application/json' },
                credentials: 'same-origin',
                body: JSON.stringify(data)
            })
        } catch (err) {
            alert(`Unable to create user with id ${id}: \n${err}`)
        }
        return response
    }

    async updateUser(id, data) {
        try {
            await fetch(this.serverAddress + '/' + id, {
                method: "PUT",
                mode: "cors",
                cache: "no-cache",
                headers: { 'Content-Type': 'application/json' },                
                credentials: 'same-origin',
                body: JSON.stringify(data)
            })
        } catch (err) {
            alert(`Unable to modify user with id ${id}`)
        }
    }

    async deleteUser(id) {
        try {
            await fetch(this.serverAddress + '/' + id, {
                method: 'DELETE',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin'
            })
        } catch (err) {
            alert(`Unable to delete user with id ${id}`)
        }
    }
}

export default Database
