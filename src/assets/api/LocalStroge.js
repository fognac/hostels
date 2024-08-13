// localStorageService.js

export const localStorageService = {
  // 保存数据
  save(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error("保存到 localStorage 失败:", error);
    }
  },

  // 获取数据
  get(key) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error("从 localStorage 获取数据失败:", error);
      return null;
    }
  },

  //  删除数据
  remove(key) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error("从 localStorage 删除数据失败:", error);
    }
  }
};
