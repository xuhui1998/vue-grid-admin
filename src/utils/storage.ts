export default class MyStorage {
  constructor() {
    this.getStorage = this.getStorage.bind(this);
    this.setStorage = this.setStorage.bind(this);
  }

  getStorage(name: string) {
    const storageData = localStorage.getItem(name);
    return JSON.parse(storageData, function (key, val) {
      if (key === 'sorter') {
        // return eval('(' + val + ')')
        return Function(`"use strict";return (${val})`)();
      }
      return val;
    });
  }

  setStorage(name: string, data: any) {
    const storageData = JSON.stringify(data, function (key, val) {
      if (typeof val === 'function') {
        return val.toString();
      }
      return val;
    });
    localStorage.setItem(name, storageData);
  }
}
