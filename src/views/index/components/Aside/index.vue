<template>
  <!-- Desktop sidebar -->
  <aside
    class="aside flex flex-col h-full fixed left-0 z-40 w-52 overflow-y-auto md:flex flex-shrink-0 transform -translate-x-full lg:-translate-x-0"
  >
    <div class="flex flex-col w-full py-4 text-gray-500">
      <a href="#" rel="home" class="mx-8 mt-2 text-2xl">BOOKMARK</a>
      <ul class="mt-6">
        <li
          class="relateive"
          v-for="(item, i) in tabs"
          :key="i"
          @click="getTabChildren(item.id, i)"
        >
          <a
            class="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 px-6 py-2.5 border-l-4 border-transparent"
            :class="{ textred500: active == i, borderred500: active == i }"
          >
            <span class="inline-flex items-center">
              <i class="text-xl sui-shangdian w-5"></i>
              <span class="ml-4">{{ item.title }}</span>
            </span>
          </a>
        </li>
      </ul>
    </div>
    <!-- <div class="flex mt-auto py-4 text-gray-500">
      <ul class="mt-6 w-full">
        <li class="relative px-6 py-2.5 border-l-4 border-transparent">
          <a class="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800" href="https://blog.zezeshe.com/tepass/signin"><span class="inline-flex items-center"><i class="text-xl sui-send w-5"></i><span class="ml-4">登录注册</span></span></a>
        </li>
      </ul>
    </div>-->
  </aside>
</template>

<script setup>
import { useTabStore } from '@/store';
import { ref } from 'vue';
const active = ref(0);
const tabs = ref([]);
const store = useTabStore();

chrome.bookmarks.getTree((bookmarkArray) => {
  const res = bookmarkArray[0].children;
  const bookmarks = res[0];

  tabs.value = bookmarks.children.filter((item) => item.children);

  const base = [
    { id: 987, title: '浏览历史' },
    { id: 988, title: '所有书签' },
    { id: 1, title: '书签栏' },
  ];

  tabs.value.unshift(...base);
});

const getTabChildren = (id, i) => {
  active.value = i;
  store.updateTabId(id);
};
</script>

<style>
@font-face {
  font-family: "Dressedless";
  src: url("./Dressedless.ttf") format("truetype");
}

aside div > a {
  font-family: Dressedless;
}

aside:hover {
  cursor: pointer;
}
.textred500 {
  --tw-text-opacity: 1;
  color: rgba(239, 68, 68, var(--tw-text-opacity));
}

.borderred500 {
  --tw-border-opacity: 1;
  border-color: rgba(239, 68, 68, var(--tw-border-opacity));
}
</style>
