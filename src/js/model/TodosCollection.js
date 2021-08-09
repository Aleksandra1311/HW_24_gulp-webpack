// model

export default class TodosCollection {
    constructor(url) { // url для того что бы передавать данные на сервер
        this._url = url; // в constructor мы перечисляем все свойства которые у нас есть
        this.list = []; // и указываем начальные значения, что бы понимать что там хранится
        this.item = null;
    }
    fetchTodos() {
        return fetch(this._url)
            .then(resp => resp.json())
            .then((data) => this.setData(data))
        
    }

    setData(data) {
        this.list = data;
    }

    addTodo(data) {
        if (data.title === '') {
            return;
        }
         return fetch(`${this._url}`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
            'Content-Type': 'application/json',
             },
         })
             .then(resp => resp.json())
             .then((data) => this.list.push(data))
    }

    toggleTodo(id) {
        this.item = this.list.find((item) => item.id == id);
        this.item.isDone = !this.item.isDone;

        return fetch(`${this._url}/${id}`, {
            method: 'PUT',
            body: JSON.stringify(this.item),
            headers: {
            'Content-Type': 'application/json',
             },
        }).then(resp => resp.json());
    }

    deleteTodo(id) {
        
        this.list = this.list.filter(item => item.id != id); // возможно нужно !==

        return fetch(`${this._url}/${id}`, {
            method: 'DELETE',
        })
            .then(resp => resp.json());
    }
}
