<script setup>

import {ref, onMounted, watch } from 'vue';

import { useTodoStore } from '../stores/TodoStore';

import { storeToRefs } from "pinia";

const todoStore = useTodoStore();


const input_content = ref('');
const input_category = ref(null);

const {todos} = storeToRefs(todoStore);

const addTodo = () => {
  if(input_content.value.trim() === '' || input_category.value === null) {
    return;
  }

  const newTodo = {
    content: input_content.value,
    category: input_category.value,
    done: false,
    createdAt: new Date().getTime()
  };

  todoStore.addTodo(newTodo);

  todos.value.push({
    content: input_content.value,
    category: input_category.value,
    done: false,
    createdAt: new Date().getTime()
  })

  input_content.value = '';
  input_category.value = null;
};

watch(todos, newVal => {
  localStorage.setItem('todos', JSON.stringify(newVal));
}, {deep: true});

onMounted(() => {
  todos.value =JSON.parse(localStorage.getItem('todos'));
});

</script>

<template>

    <section class="create-todo">
      <h3>CREATE TODO</h3>
      <form @submit.prevent="addTodo">
      <h4>What's on your todo list?</h4>
      <input 
        type="text"
        placeholder="e.g. make a video"
        v-model="input_content">
        <h4>Pick a category</h4>
        <div class="options">
          <label>
            <input  type="radio"
              name="category"
              value="business"
              v-model="input_category"/>
              <span class="bubble business"></span>
              <div>Business</div>
          </label>
          <label>
            <input  type="radio"
              name="category"
              value="personal"
              v-model="input_category"/>
              <span class="bubble personal"></span>
              <div>Personal</div>
          </label>
        </div>
        <input type="submit" value="Add todo">
      </form>
    </section>

</template>