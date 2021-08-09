// controller
import TodosView from '../view/TodosView';
import TodosCollection from '../model/TodosCollection';
import { TODOS_URL } from '../config';

export default class TodosController {        // инициализируется Controller
    constructor($el) {         // приняли аргумент jquery el в котором нужно постоить интерфейс  и передаст view
        this.initCollection(); //вызвали model (collection)
        this.initView($el);    //вызвали view
       
    }

    initCollection() {
        this.todosCollection = new TodosCollection(TODOS_URL); // инициализируется model(Collection) 
        this.todosCollection
            .fetchTodos()
            // .then(() => console.log(this.todosCollection.list)); //this.todosCollection.list) это мы получаем данные, тоже самое переписали ниже
            .then(() => this.renderList());
    }

    initView($el) {
        this.todosView = new TodosView($el, {          //инициализируется view
            onDelete: this.deleteTodo.bind(this),                  // сюда передаём функции которые передадим в config View и они выполняться когда произойдёт событие
            onToggle: this.toggleTodo.bind(this),                  // ДЗ для переключения Done isDone
            onSubmit: this.submitForm.bind(this),                  // ДЗ для ADD todo btn  добавления новой Todo
        });
    }

    renderList() {
        this.todosView.renderList(this.todosCollection.list);
    }

    submitForm(data) {
        this.todosCollection.addTodo(data)
            .then(() => this.renderList());
    }
    
    toggleTodo(id) {
        this.todosCollection.toggleTodo(id);

        this.renderList();
    }

    deleteTodo(id) {  // задача: сказать model Collection что бы он удалил
        this.todosCollection.deleteTodo(id);

        this.renderList();
    }
}