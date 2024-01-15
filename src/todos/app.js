import html from './app.html?raw';
import todoStore, { Filters } from '../store/todo.store';
import { renderTodos, renderPending } from './use-cases';
import { sign } from '../sign'

const ElementIDs = {
    TodoList: '.todo-list',
    newTodoInput: '#new-todo-input',
    clearCompletedClass: '.clear-completed',
    todoFilters: '.filtro',
    pendingCountLabel: '#pending-count',
}
/**
 * 
 * @param {String} elementId 
 */
export const App = ( elementId ) => {

    const displayTodos = () => {
        const todos = todoStore.getTodos( todoStore.getCurrentFilter() );
        renderTodos( ElementIDs.TodoList, todos);
        updatePendingCount();
    }

    const updatePendingCount = () => {
        renderPending( ElementIDs.pendingCountLabel );
    }

    // Función autoinvocada cuando se lama App()
    (() => {
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append(app);
        displayTodos();
        sign;
    })();

    //Referencias HTML
    const newDescriptionInput   = document.querySelector( ElementIDs.newTodoInput );
    const todoListUL            = document.querySelector( ElementIDs.TodoList );
    const clearCompletedBtn     = document.querySelector( ElementIDs.clearCompletedClass );
    const filterLIs             = document.querySelectorAll( ElementIDs.todoFilters );

    //Listeners
    newDescriptionInput.addEventListener('keyup', (event) => {
        if ( event.key !== "Enter") return;
        if ( event.target.value.trim().length === 0 ) return;

        todoStore.addTodo( event.target.value );
        displayTodos();
        event.target.value = '';
    });

    todoListUL.addEventListener('click', ( event ) => {
        const element = event.target.closest('[data-id]');
        todoStore.toggleTodo(element.getAttribute('data-id'));
        displayTodos();
    });

    todoListUL.addEventListener('click', ( event ) => {
        const isDestroyElement = event.target.className === 'destroy';
        const element = event.target.closest('[data-id]');

        if ( !element || !isDestroyElement ) return;

        todoStore.deleteTodo(element.getAttribute('data-id'));
        displayTodos();
    });

    clearCompletedBtn.addEventListener('click', () => {
        todoStore.deleteCompleted();
        displayTodos();
    });

    filterLIs.forEach( element => {
        element.addEventListener('click', (element) => {
            filterLIs.forEach ( elem => elem.classList.remove('selected') );
            element.target.classList.add('selected');
            
            switch (element.target.text) {
                case 'Todos':
                    todoStore.setFilter( Filters.All );
                    break;
                case 'Pendientes':
                    todoStore.setFilter( Filters.Pending );
                    break;
                case 'Completados':
                    todoStore.setFilter( Filters.Completed );
                    break;
            }

            displayTodos();
        });
    });
}

