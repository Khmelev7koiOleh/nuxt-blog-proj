import { defineStore } from "pinia";

// Define the interface for the user
interface IAuthStore {
  email: string;
  name: string;
  status: boolean;
}

// Default user state
const defaultValue: { user: IAuthStore } = {
  user: {
    email: "",
    name: "",
    status: false,
  },
};
export const useIsLoadingStore = defineStore("isLoading", {
  state: () => ({
    isLoading: false, // Initialize to false
  }),

  actions: {
    /**
     * Update the loading state
     */
    set(data: boolean) {
      this.$patch({ isLoading: data });
    },

    /**
     * Reset loading state to false
     */
    reset() {
      this.$patch({ isLoading: false });
    },
  },
});

// Auth store definition
export const useAuthStore = defineStore("auth", {
  state: () => ({ ...defaultValue }),

  /*************  ✨ Codeium Command ⭐  *************/
  /**
   * Resets the user state to its default values.
   */
  /******  3c8d4ba7-aa41-4f72-8a62-512e6a360d97  *******/ getters: {
    // Renamed getter to avoid conflict with state property
    isAuthenticated: (state) => state.user.status,
  },

  actions: {
    /**
     * Clear user data by resetting to default value
     */
    clear() {
      this.$patch({ user: { ...defaultValue.user } });
    },

    /**
     * Update user data with provided input
     */
    set(input: IAuthStore) {
      this.$patch({ user: input });
    },
  },
});
