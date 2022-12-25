<script setup>
import PreviewVue from "../components/Preview.vue";
import FormVue from "../components/Form.vue";
import { useTodoStore } from "../stores/useTodoStore";
import { storeToRefs } from "pinia";
import { ref } from "vue";

const store = useTodoStore();
const { todos } = storeToRefs(store);
const { add, update, remove } = store;

const formModel = ref("");

function handleSubmitTodo(item) {
  add(item);
}

function handleUpdateTodo(data) {
  update(data);
}

function handleRemoveTodo(id) {
  remove(id);
}

function handleToggleCompleteTodo(data) {
  update(data);
}
</script>

<template>
  <div class="flex flex-col items-center gap-10 p-10">
    <FormVue v-model:value="formModel" @submit-todo="handleSubmitTodo" />
    <PreviewVue
      :todos="todos"
      @update="handleUpdateTodo"
      @remove="handleRemoveTodo"
      @toggle-complete="handleToggleCompleteTodo"
    />
  </div>
</template>
