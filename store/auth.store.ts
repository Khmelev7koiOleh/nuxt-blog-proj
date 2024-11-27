import { defineStore } from "pinia";

interface IAuthStore {
  email: string;
  name: string;
  status: boolean;
}

const defaultValue: { user: IAuthStore } = {
  user: {
    email: "",
    name: "",
    status: false,
  },
};

export const useAuthStore = defineStore("auth", {
  state: () => defaultValue,

  getters: {
    isAuth: (state) => state.user.status, // Renamed to avoid conflict
    getUser: (state) => state.user, // Getter to return the whole user object
  },

  actions: {
    clear() {
      this.$patch(defaultValue);
    },

    set(input: IAuthStore) {
      this.$patch({ user: input });
    },
  },
});

export const useIsLoadingStore = defineStore("isLoading", {
  state: () => ({
    isLoading: false, // Default to false
  }),

  actions: {
    set(data: boolean) {
      this.$patch({ isLoading: data });
    },
  },
});
