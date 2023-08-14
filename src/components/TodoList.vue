<script>
import {ref, onMounted, computed, watch } from 'vue';
import { useTodoStore } from '../stores/TodoStore';
import { storeToRefs } from "pinia";


const todoStore = useTodoStore();

const {todos} = storeToRefs(todoStore);

const todos_asc = computed(() => todos.value.sort((a,b) => {
  return b.createdAt - a.createdAt;
}));

const removeTodo = (todo) => {
  todos.value = todos.value.filter(t => t !== todo);
}

watch(todos, newVal => {
  localStorage.setItem('todos', JSON.stringify(newVal));
}, {deep: true});


onMounted(() => {
  todos.value =JSON.parse(localStorage.getItem('todos'));
});

</script>

<template>
    <section class="todo-list">
      <h3>TODO LIST</h3>
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