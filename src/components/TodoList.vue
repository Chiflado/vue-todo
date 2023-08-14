<script setup>
import {ref, onMounted, computed } from 'vue';
import { useTodoStore } from '../stores/TodoStore'

const todoStore = useTodoStore();

const todos = ref(todoStore.todos);

const todos_asc = computed(() => todos.value.sort((a,b) => {
  return b.createdAt - a.createdAt;
}));

const removeTodo = (todo) => {
  todoStore.removeTodo(todo);
}

onMounted(() => {
  todos.value = todoStore.todos;
});

</script>

<template>
    <section class="todo-list">
      <div class="list">
        <div v-for="todo in todos_asc" :class="`todo-item ${todo.done && 'done'}`">
          <label>
            <input type="checkbox" v-model="todo.done">
            <span :class="`bubble ${todo.category}`"></span>
          </label>

          <div class="todo-content">
            <input type="text" v-model="todo.content">
          </div>

          <div class="actions">
            <button class="delete" @click="removeTodo(todo)">Delete</button>
          </div>
        </div>
      </div>
    </section>
</template>