<script setup>
import { storeToRefs } from "pinia";
import { computed, reactive, ref } from "vue";
import HeadingsVue from "../components/Headings.vue";
import PreviewVue from "../components/Preview.vue";
import { useTodoStore } from "../stores/useTodoStore";

const store = useTodoStore();
const { update, remove } = store;
const { todos } = storeToRefs(store);

const forms = reactive({
  formSort: {
    options: ["None", "Title", "Date Added"],
    value: "None",
  },
  formStatus: {
    options: ["All", "Completed", "Incomplete"],
    value: "All",
  },
  formSearch: "",
});

const filterBy = ref(["none", "search", "status", "sort"]);
const appliedFilter = ref("none");

const filteredItems = computed(() => {
  if (
    !forms.formSearch &&
    forms.formSort.value === "None" &&
    forms.formStatus.value === "All"
  ) {
    appliedFilter.value = filterBy.value[0];
  }

  if (appliedFilter.value === filterBy.value[1]) {
    const term = forms.formSearch.toLowerCase();
    return todos.value.filter((todo) => todo.item.toLowerCase().includes(term));
  }

  if (appliedFilter.value === filterBy.value[2]) {
    const status = forms.formStatus.value === "Completed" ? true : false;
    return todos.value.filter((todo) => todo.completed === status);
  }

  if (appliedFilter.value === filterBy.value[3]) {
    const sort = forms.formSort.value;
    return todos.value.sort((a, b) => {
      if (
        a[sort === "Title" ? "item" : "created_at"] <
        b[sort === "Title" ? "item" : "created_at"]
      ) {
        return -1;
      }
      if (
        a[sort === "Title" ? "item" : "created_at"] >
        b[sort === "Title" ? "item" : "created_at"]
      ) {
        return 1;
      }
      return 0;
    });
  }

  return todos.value;
});

function resetSearch() {
  forms.formSearch = "";
}

function resetSort() {
  forms.formSort.value = "None";
}

function resetFilter() {
  forms.formStatus.value = "All";
}

function handleSearch() {
  resetSort();
  resetFilter();
  appliedFilter.value = filterBy.value[1];
}

function handleSort() {
  resetSearch();
  resetFilter();
  appliedFilter.value = filterBy.value[3];
}

function handleFilter() {
  resetSearch();
  resetSort();
  appliedFilter.value = filterBy.value[2];
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
  <div class="flex flex-col items-center gap-10">
    <HeadingsVue
      v-model:form-search="forms.formSearch"
      v-model:form-sort="forms.formSort"
      v-model:form-status="forms.formStatus"
      @sort="handleSort"
      @search="handleSearch"
      @filter="handleFilter"
    />
    <PreviewVue
      :todos="filteredItems"
      @update="handleUpdateTodo"
      @remove="handleRemoveTodo"
      @toggle-complete="handleToggleCompleteTodo"
    />
  </div>
</template>
