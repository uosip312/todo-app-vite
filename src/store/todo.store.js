import { Todo } from '../todos/models/todo.model';

const Filters = {
    All: 'all',
    Completed: 'Completed',
    Pending: 'Pending'
}

const state = {
    todos: [
        new Todo('Programar'),
        new Todo('Estudiar'),
        new Todo('Comer'),
    ],
    filter: Filters.All,
}

const initStore = () => {
    console.log(state);
    console.log('InitStore {{Edi/Byte}} 💻');
}

export default {
    initStore
}