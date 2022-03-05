<template>
  <main>
    <header id="main_header" class="z-30 py-4 bg-white border-b sticky top-0">
      <div
        class="container flex items-center justify-between h-full px-3 mx-auto text-gray-900 2xl:px-8"
      >
        <div class="flex justify-left flex-1 lg:mr-32">
          <div class="relative flex comment-form-body bg-gray-200 rounded">
            <input
              v-model="search"
              class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight"
              id="inline-full-name"
              type="text"
              placeholder="搜索"
            />
            <button
              @click="handleSearch()
              "
              type="submit"
              class="flex-none border-0 py-2 px-4 text-gray-600 hover:text-red-500 dark:text-gray-200 focus:outline-none"
            >
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 text-gray-700 text-sm"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </button>
          </div>
        </div>

        <ul class="flex items-center flex-shrink-0 space-x-6">
          <li v-for="(item, i) in subTabs" :key="i" @click="store.updateTabId(id)">
            <a :href="item.url" class="text-base text-grey-600 font-semibold">
              {{
              item.title
              }}
            </a>
          </li>
        </ul>
      </div>
      <div class="header__blur"></div>
    </header>
  </main>
</template>

<script setup>
import { ref, watchEffect } from 'vue';
import { useTabStore } from '@/store';
const store = useTabStore();
const search = ref('')

watchEffect(() => {

  if (search.value.length == 0) {
    store.updateTabId(987)
  } else {
    store.updateSearch(search);
  }

})
</script>

<style>
#main_header {
  height: 64px;
}

.header {
  position: fixed;
  width: 100%;
  z-index: 2;
}
</style>