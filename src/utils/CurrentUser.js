window._ = {
  setStore: (name, content) => {
    window.localStorage.setItem(name, content);
  },

  getStore: (name) => {
    const user = window.localStorage.getItem(name);
    return user;
  },
  clear: () => {
    window.localStorage.clear();
  },
};
export default window._;
