<template>
  <!-- Breadcrumb -->
  <nav
    v-if="store.tabId != 987 && store.tabId !== 988"
    class="flex py-3 px-5 mb-5 rounded-lg text-black border bg-white"
    aria-label="Breadcrumb"
  >
    <ol class="inline-flex items-center space-x-1 md:space-x-3">
      <li
        v-for="(item, i) in tabs"
        @click="store.updateTabId(item.id)"
        class="inline-flex items-center"
      >
        <a
          href="#"
          class="inline-flex items-center text-sm font-medium text-black hover:text-gray-900"
        >{{ item.title }}</a>

        <svg
          v-if="i != tabs.length"
          class="w-6 h-6 text-gray-400"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clip-rule="evenodd"
          />
        </svg>
      </li>
    </ol>
  </nav>
  <div class="grid grid-cols-1 sm:grid-cols-3 2xl:grid-cols-5 gap-4">
    <div
      v-for="(item, i) in label"
      :key="i"
      @click="handleGetBookMark(item.id, item.url)"
      class="card group flex items-center p-4 bg-white rounded border border-gray-100 text-gray-600 transition-all duration-300 transform hover:shadow-2xl hover:-translate-y-1"
    >
      <div class="flex flex-shrink-0">
        <img
          v-if="item.url"
          :src="'chrome://favicon/' + item.url"
          class="w-10 h-10 object-cover rounded-full"
        />

        <svg
          v-if="!item.url"
          xmlns="http://www.w3.org/2000/svg"
          class="h-10 w-10"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
        </svg>
      </div>

      <div class="inline-flex justify-between w-full">
        <div class="w-full pl-4 pr-1.5">
          <p
            class="text-sm font-medium line-2 transition-all duration-300 transform"
          >{{ item.title }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue';
import { useTabStore } from '@/store';
const store = useTabStore();
const label = ref([]);
const tabs = ref([]);

watchEffect(() => {

  if (store.tabId == 988) {
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
  } else if (store.tabId == 987) {
    const query = {
      text: '',
    };
    chrome.history.search(query, (res) => {
      label.value = res;
    });
  } else {
    // 得到指定分类的书签
    chrome.bookmarks.getChildren(store.tabId + '', (res) => {
      label.value = res;
    });

    tabs.value = []
    getBookmarkBreadcrumb(store.tabId + '', store.tabId + '')
  }

});

const getBookmarkBreadcrumb = (id, cb) => {
  chrome.bookmarks.get(id, arr => {
    tabs.value.push(arr[0]);
    if (arr[0].parentId === '0') {
      tabs.value = tabs.value.reverse()
    } else {
      getBookmarkBreadcrumb(arr[0].parentId, cb);
    }
  });

};



const handleGetBookMark = (id, url) => {
  if (url) {
    window.open(url, "_blank")
  } else {
    store.updateTabId(id)
  }
}
watchEffect(() => {
  chrome.bookmarks.search(store.searchContent, (res) => {
    label.value = res;
  });

});


const recursion = element => {
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
.card:hover {
  cursor: pointer;
}
.card a {
  width: 200px;
}

nav {
  height: 50px;
}
</style>