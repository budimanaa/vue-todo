import { defineStore } from "pinia";

export const useTodoStore = defineStore("todo", {
  state: () => ({
    todos: [],
    id: 0,
  }),
  actions: {
    add(item) {
      this.todos.push({
        item,
        id: this.id++,
        completed: false,
        created_at: new Date(),
        updated_at: new Date(),
      });
    },
    remove(id) {
      this.todos = this.todos.filter((obj) => obj.id !== id);
    },
    update(item) {
      const index = this.todos.findIndex((obj) => obj.id === item.id);
      if (index < 0) {
        this.add(item);
      } else {
        this.todos[index] = {
          ...this.todos[index],
          ...item,
          updated_at: new Date(),
        };
      }
    },
  },
  // getters: {
  //   filterByTitle: (title) => {
  //     return this.todos.filter((todo) =>
  //       todo.item.toLowerCase().includes(title.toLowerCase())
  //     );
  //   },
  // },
});
