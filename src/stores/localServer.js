// AuthService.js
export const isAuthenticated = () => {
  return localStorage.getItem("isLogin") === "true"
}

export const login = () => {
  localStorage.setItem("isLogin", "true")
}

export const logout = () => {
  localStorage.removeItem("isLogin")
}
