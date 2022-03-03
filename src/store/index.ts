import { defineStore } from 'pinia'

export const useTabStore = defineStore('tab', {
  state: () => {
    return { tabId: 3,
    searchContent:''}
  },
  // could also be defined as
  // state: () => ({ count: 0 })
  actions: {
    updateTabId(id:number) {
      this.tabId = id
    },
    updateSearch(search:string){
      this.searchContent = search
    }
  },
})