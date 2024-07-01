import { defineStore } from "pinia"

export const useLoginStore = defineStore("login", {
  state: () => ({
    user: "admin",
    pass: "a123456",
  }),
  actions: {
    subLogin(user, pass) {
      if (user === this.user && pass === this.pass) {
        return true
      } else {
        return false
      }
    },
    registForm(pass, pass2) {
      if (pass !== pass2) {
        return false
      } else {
        return true
      }
    },
  },
})
