<template>
  <q-layout view="HHh Lpr lFf">
    <q-header class="tw-bg-primarybg tw-h-14" style="">
      <div class="tw-flex tw-justify-between tw-h-full tw-items-center tw-px-5">
        <div class="tw-flex tw-items-center">
          <img src="/logo.svg" class="tw-h-6 tw-my-auto"/> <span class="tw-mt-3 tw-ml-1.5">by <a href="https://incentius.com/" target="_blank" class="tw-text-hara">incentius.com</a></span>
        </div>

        <div @click="openPopUp()" class="tw-flex tw-items-center tw-justify-between tw-gap-12">
          <div class="tw-text-blue-500 tw-flex tw-items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                 stroke="currentColor" class="tw-w-6 tw-h-6 tw-text-hara cursor-pointer">
              <path stroke-linecap="round" stroke-linejoin="round"
                    d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"/>
            </svg>
            <span v-if="$q.platform.is.desktop" class="tw-text-hara cursor-pointer tw-font-medium tw-text-sm tw-ml-3">
              What's This?
            </span>
          </div>
        </div>
      </div>
    </q-header>

    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: 'MainLayout',

  methods: {
    openPopUp() {
      this.$bus.emit('openPopUp');
    },
  }
})
</script>
