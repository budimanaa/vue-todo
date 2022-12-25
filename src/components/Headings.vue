<script setup>
import InputTextVue from "./InputText.vue";
import InputSelectVue from "./InputSelect.vue";
import { computed, ref } from "vue";

const isDoneSearch = ref(false);
const props = defineProps({
  formSort: Object,
  formStatus: Object,
  formSearch: String,
});
const emit = defineEmits(["update:formSearch", "search", "filter", "sort"]);

const modelSearch = computed({
  get() {
    if (!props.formSearch) isDoneSearch.value = false;
    return props.formSearch;
  },
  set(value) {
    return emit("update:formSearch", value);
  },
});

function handleSubmitSearch(title) {
  if (isDoneSearch.value) {
    title = modelSearch.value = "";
  }
  emit("search", title);
  isDoneSearch.value = !isDoneSearch.value;
}

function handleFilter(value) {
  emit("filter", value);
}

function handleSort(value) {
  emit("sort", value);
}
</script>

<template>
  <section class="flex flex-col w-full max-w-[500px] gap-4">
    <form
      @submit.prevent="handleSubmitSearch(modelSearch)"
      class="relative inline-flex w-full overflow-hidden rounded-lg"
    >
      <InputTextVue
        v-model:value="modelSearch"
        id="search"
        placeholder="Search by Title"
      />
      <button
        type="submit"
        title="Save"
        class="absolute right-0 flex items-center justify-center h-full px-4 text-lg text-white -translate-y-1/2 rounded-sm top-1/2 bg-sky-600 hover:bg-sky-700"
      >
        {{ isDoneSearch ? "Clear" : "Search" }}
      </button>
    </form>
    <div class="flex justify-around">
      <div class="inline-flex items-center gap-2">
        <label class="text-sm font-medium" for="inputSelect-status"
          >Status:</label
        >
        <InputSelectVue
          :options="props.formStatus.options"
          id="status"
          v-model:value="props.formStatus.value"
          @update:value="handleFilter"
        />
      </div>
      <div class="inline-flex items-center gap-2">
        <label class="text-sm font-medium" for="inputSelect-sort">Sort:</label>
        <InputSelectVue
          :options="props.formSort.options"
          id="sort"
          v-model:value="props.formSort.value"
          @update:value="handleSort"
        />
      </div>
    </div>
  </section>
</template>
