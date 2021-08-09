// viev
import '../../css/style.css';

const DELETE_BTN_SELECTOR = '.delete-btn';
const ITEM_SELECTOR = '.task-item';
const ADD_BTN_SELECTOR = '.addTodoBtn';
const TASK_DONE_CLASS = 'done';
const taskListTemplate = $('.task-list');
const taskItemTemplate = $("#taskItemTemplate").html();

export default class TodosView {
    constructor($el, config = {}) {           // принял  $el 
        this._$task = $('#newTodoInput');
        this._container = $el;   // это наш елемент куда мы помещаем все остальные ul
        this._$list = null;// мы пока не знаем что там будет хранился
        this._config = config; //это аргумент {} у которого будет в качестве ключа будут события, в значение будет ф-я которую которую нужно будет ызвать когда событие произойдёт
        
        this.initView();
    }

    initView() {
        this._$list = $(taskListTemplate); // это лучше выносить отдельно
        this._$list.on('click', DELETE_BTN_SELECTOR, this.onListClick.bind(this));
        this._$list.on('click', ITEM_SELECTOR, this.onToggleTaskStateClick.bind(this));
        this._container.on('click', ADD_BTN_SELECTOR, this.onAddTodoClick.bind(this));
        this._container.append(this._$list);
    }

    onListClick(e) {
        e.stopPropagation();

        const id = this.getElementId($(e.target));
        this._config.onDelete(id);
    }

    onToggleTaskStateClick(e) {
        const id = this.getElementId($(e.target));

        this._config.onToggle(id);
    }

    onAddTodoClick(e) {
        const task =  {
            title: this._$task.val(),
            isDone: false,
        };

        this._config.onSubmit(task);

        this.clearInput();
    }

    clearInput() {
        this._$task.val('');
    }

    renderList(list) { //list массив который нам нужно отрендерить
        this._$list.html(list.map(this.getListItemHtml).join('')); //взяли list идём по [], и каждый ел генерируется через ф-ю getListItemHtml и превращает его в html
    
    }

    getListItemHtml({id, title, isDone}) {
        return  taskItemTemplate
            .replace('{{id}}', id)
            .replace('{{doneClass}}', isDone ? TASK_DONE_CLASS : '')
            .replace('{{title}}', title);
    }

    getElementId($el) { // поиск ID по ближайшему родителю 
        return $el.closest(ITEM_SELECTOR).data('todoId');
    }

    

}