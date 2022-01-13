import { reactive } from "vue";

interface User {
  username: string;
  phone: string;
  enterprise: {
    name: string;
    legal_name: string;
  };
}

export const app = new (class {
  user = reactive<User>({} as any);

  constructor() {
    this.user = (() => {
      try {
        return JSON.parse(localStorage.getItem("user") as any);
      } catch (e) {
        //
      }
    })();
  }

  setUser(data: any) {
    this.user = data;
    localStorage.setItem("user", JSON.stringify(data));
  }

  invalidateUser() {
    localStorage.removeItem("token");
  }

  hasToken() {
    return !!localStorage.getItem("user");
  }
})();
