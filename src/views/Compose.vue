<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div class="fixed z-10 flex items-center w-full p-4 bg-white">
        <div class="flex-none">
          <svg @click="back()" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
          </svg>
        </div>
        <div class="flex-1 pl-4 text-lg tracking-wider">
          Compose
        </div>
        <div class="flex items-center flex-initial space-x-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 mr-2 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-gray-600 transform rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
        </div>
      </div>
      <div class="p-4 pt-16 space-y-4 divide-y">
        <div class="flex items-center pt-4">
          <div class="flex-none pr-4 text-gray-500">From</div>
          <div class="flex-1 text-gray-800">ionic@framework.com</div>
          <div class="flex-none">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        <div class="flex items-center pt-4">
          <div class="flex-none pr-4 text-gray-500">To</div>
          <div class="flex-1 text-gray-800"><input type="text" class="w-full outline-none"></div>
          <div class="flex-none">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        <div class="flex items-center pt-4">
          <div class="flex-1"><input type="text" class="w-full placeholder-gray-500 outline-none" placeholder="Subject"></div>
        </div>
        <div class="flex items-center pt-4">
          <div class="flex-1"><textarea type="text" class="w-full placeholder-gray-500 outline-none h-60" placeholder="Compose Email"></textarea></div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonPage } from '@ionic/vue';
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'Compose',
  components: {
    IonContent,
    IonPage
  },
  setup() {
    const router = useRouter();

    const back = () => { router.back() }

    return { back }
  }
});
</script>