import { defineStore } from "pinia";

export const useTodoStore = defineStore('todoStore', {
    state: () => ({
        todos: []
    }),
    actions: {
        addTodo(todo) {
            this.todos.push(todo);
        },
        removeTodo(todo) {
            this.todos = this.todos.filter(t => t !== todo);
        }
    }
});