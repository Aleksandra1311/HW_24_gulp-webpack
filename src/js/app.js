// В ECMAScript modules исп другой синтаксис

// import TodosController from './controller/TodosController' // но это пока не работает, в процессе внедрения
import TodosController from '../js/controller/TodosController';

$(() => {
    new TodosController($('.container'));
});
