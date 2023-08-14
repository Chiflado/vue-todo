import { defineStore } from "pinia";
import { cloneDeep } from "lodash";

export const useTodoStore = defineStore('todoStore', {
    state: () => ({
        todos: JSON.parse(localStorage.getItem('todos')) || []
    }),
    actions: {
        addTodo(todo) {
            this.todos.push(todo);
            localStorage.setItem('todos', JSON.stringify(this.todos));
        },
        removeTodo(todo) {
            const objWithIdIndex = this.todos.findIndex((obj) => obj.createdAt === todo.createdAt);
            this.todos.splice(objWithIdIndex, 1);
            localStorage.setItem('todos', JSON.stringify(this.todos));
        }
    }
});