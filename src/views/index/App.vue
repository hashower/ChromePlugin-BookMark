<template>
  <div class="flex h-screen">
<Aside />
    <!-- Mobile sidebar -->
    <!-- Backdrop -->
    <div
      class="fixed inset-0 z-50 flex items-end bg-black bg-opacity-50 sm:items-center sm:justify-center hidden"
    ></div>
    <div
      class="fixed inset-0 z-40 flex items-end bg-black bg-opacity-50 sm:items-center sm:justify-center hidden"
    ></div>

    <div class="wrap flex flex-col flex-1 w-full lg:ml-52">

        <Header />

        <div class="wrap container px-4 lg:px-10 2xl:px-8 mx-auto mt-8 xl:mt-8">
          <div class="mx-auto">
            <Content />
          </div>
          <Footer />
        </div>
    </div>
  </div>
</template>

<script setup>
import Header from './components/Header/index.vue'
import Aside from './components/Aside/index.vue'
import Footer from './components/Footer/index.vue'
import Content from './components/Content/index.vue'
import { getBookMarkMenu,getBookmarkBreadcrumb } from '../../utils/BookmarkLib'
// console.log('@@@@', getBookMarkMenu());
// console.log('@@@@@@@@',getBookmarkBreadcrumb(6));
</script> 

<style>
.wrap{
    background-color: #eceef5;
}
</style> 
