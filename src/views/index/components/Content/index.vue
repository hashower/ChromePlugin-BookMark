<template>
  <div class="grid grid-cols-1 sm:grid-cols-3 2xl:grid-cols-5 gap-4">
    <div v-for="(item, i) in label" :key="i" class="card group flex items-center p-4 bg-white rounded border border-gray-100 text-gray-600 transition-all duration-300 transform hover:shadow-2xl hover:-translate-y-1">
      <a :href="item.url" title="禾令奇" target="_blank" rel="noopener" class="flex flex-shrink-0">
        <div>
          <img v-if="item.url" :src="'chrome://favicon/' + item.url" class="w-10 h-10 object-cover rounded-full" />

          <svg v-if="!item.url" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
          </svg>
        </div>

        <div class="inline-flex justify-between w-full">
          <div class="w-full pl-4 pr-1.5">
            <p class="text-sm font-medium line-2 transition-all duration-300 transform">
              {{ item.title }}
            </p>
          </div>
        </div>
      </a>
    </div>
  </div>
</template>

<script setup>
  import { ref, watchEffect } from 'vue';
  import { useTabStore } from '@/store';
  const store = useTabStore();
  const label = ref([]);



  watchEffect(() => {

    switch (store.tabId) {
      case 2:
        label.value = [];
        // 书签树
        chrome.bookmarks.getTree((bookmarkArray) => {
          const res = bookmarkArray[0].children;

          // 循环第一层数据
          for (const iterator of res[0].children) {
            //  递归 解决每一层的children
            recursion(iterator);
          }
        });
        break;
      case 3:
        const query = {
          text: '',
        };
        chrome.history.search(query, (res) => {
          label.value = res;
        });
        break;
      default:
        // 得到指定分类的书签
        chrome.bookmarks.getChildren(store.tabId + '', (res) => {
          label.value = res;
        });
        break;
    }
  });

  watchEffect(() => {
    chrome.bookmarks.search(store.searchContent, (res) => {
      label.value = res;
    });

  });


  function recursion(element) {
    if (element.children) {
      for (const iterator of element.children) {
        recursion(iterator);
      }
    } else {
      label.value.push(element);
    }
  }
</script>

<style>
  .card {
    height: 74px;
  }

  .card a {
    width: 200px;
  }
</style>