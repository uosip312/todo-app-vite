import { Todo } from '../todos/models/todo.model';

const Filters = {
    All: 'all',
    Completed: 'Completed',
    Pending: 'Pending'
};

const state = {
    todos: [
        new Todo('Programar'),
        new Todo('Estudiar'),
        new Todo('Comer'),
    ],
    filter: Filters.All,
};

const initStore = () => {
    console.log('InitStore {{Edi/Byte}} 💻');
}

const loadStore = () => {
    throw new Error('No implementado');
}
/**
 * 
 * @param {String} filter filtros válidos: All | Completed | Pending
 * @returns {Array<Object>}
 */
const getTodos = ( filter = Filters.All ) => {
    switch ( filter ) {
        case Filters.All:
            return [...state.todos];
        case Filters.Completed:
            return state.todos.filter( todo => todo.done);
        case Filters.Pending:
            return state.todos.filter( todo => !todo.done);
        default:
            throw new Error(`La opción ${filter} no es valida.`);
            break;
    }
}

/**
 * 
 * @param {String} description 
 */
const addTodo = ( description ) => {
    if(!description) throw new Error('Descripción requerida');
    state.todos.push( new Todo(description) );
}

/**
 * 
 * @param {String} todoId Identificador del todo
 */
const toggleTodo = ( todoId ) => {
    state.todos = state.todos.map( todo => {
        if ( todo.id === todoId ) {
            todo.done = !todo.done;
        }
        return todo;
    });
}
/**
 * 
 * @param {String} todoId Identificador del todo
 */
const deleteTodo = ( todoId ) => {
    if(!todoId) throw new Error('Id requerido');
    state.todos = state.todos.filter( todo => todo.id !== todoId );
}

const deleteCompleted = () => {
    state.todos = state.todos.filter( todo => todo.done );
}

/**
 * 
 * @param {Filters} newFilter All | Completed | Pending
 */
const setFilter = ( newFilter = Filters.All ) => {
    if( !Object.keys(Filters).includes(newFilter) ) throw new Error('Filtro invalido');
    state.filter = newFilter;
}

const getCurrentFilter = () => {
    return state.filter;
}

export default {
    addTodo,
    deleteCompleted,
    deleteTodo,
    getCurrentFilter,
    getTodos,
    initStore,
    loadStore,
    setFilter,
    toggleTodo,
}