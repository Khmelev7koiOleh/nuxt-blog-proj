import { defineStore } from "pinia";

interface IKannbanStore {
  title: string;
  description: string;
  image: string;
  status: boolean;
}

const defaultValue: { blog: IKannbanStore } = {
  blog: {
    title: "",
    description: "",
    image: "",
    status: false,
  },
};

export const IUseKannbanStore = defineStore("kannban", {
  state: () => defaultValue,

  actions: {
    set(input: IKannbanStore) {
      this.$patch({ blog: input });
    },
  },
});

export const IUseKannban = defineStore("kannban", {
  state: () => ({
    onOpenBlog: false, // Default to false
  }),

  actions: {
    set(data: boolean) {
      this.$patch({ onOpenBlog: data });
    },
  },
});
