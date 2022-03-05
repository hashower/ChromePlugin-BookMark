import { defineStore } from 'pinia'

export const useTabStore = defineStore('tab', {
  state: () => {
    return { 
    tabId: 987,
    searchContent:''
  }
  },
  // could also be defined as
  // state: () => ({ count: 0 })
  actions: {
    updateTabId(id:any) {
      this.tabId = id
    },
    updateSearch(search:string){
      this.searchContent = search
    }
  },
})