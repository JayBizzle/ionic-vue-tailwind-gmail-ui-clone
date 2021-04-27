<template>
  <ion-page>
    <ion-content :fullscreen="true" scrollEvents="true" @ionScroll="watchScrolling($event)" data-cy="inbox">
      <router-link to="/compose"  class="fixed z-50 flex items-center px-4 py-3 text-sm font-semibold tracking-wider text-red-600 bg-white border rounded-full shadow-lg bottom-6 right-6">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
        <span :class="{ 'w-0 opacity-0': hideSearchBanner, 'w-20 ml-3': ! hideSearchBanner }" class="inline-block overflow-hidden transition-all duration-500 line-clamp-1">Compose</span>
      </router-link>
      <div class="fixed z-20 w-full px-4 transition-all duration-500 top-2" :class="{ '-top-20': hideSearchBanner, 'top-2': hideSearchBanner }">
        <div class="flex items-center w-full px-4 py-3 bg-white border rounded-lg shadow top-2" data-cy="search-container">
          <div class="flex-none" @click="menuController.toggle('first')">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </div>
          <div class="flex-1 text-gray-600">
            <input type="text" class="w-full placeholder-gray-500 outline-none" placeholder="Search in emails" @keyup="search($event)" @keypress="search($event)" data-cy="search" />
          </div>
          <div class="flex-none">
            <img src="https://pbs.twimg.com/profile_images/378800000775628335/857bcaffb820e5b6bdd2e83a4b56cf89_400x400.jpeg" class="w-8 h-8 border border-gray-300 rounded-full" />
          </div>
        </div>
      </div>
      <div class="mt-20">
        <div class="mx-4 text-xs font-semibold tracking-widest text-gray-500 uppercase">Primary</div>
        <div class="flex items-center">
          <div class="flex items-center justify-center flex-none w-10 h-10 mx-4 font-semibold text-white">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
          </div>
          <div class="flex-1 pr-4">
            <div class="font-semibold text-gray-800">Promotions</div>
            <div class="font-light text-gray-600 break-all line-clamp-1">Sportsdirect.com, hotukdeals, Country Golf, Marks &amp; Spender</div>
          </div>
          <div class="flex-none mx-4 text-center">
            <div class="px-2 py-1 text-xs font-semibold text-white bg-green-700 rounded-full">49 new</div>
          </div>
        </div>
        <div v-for="(email, index) in Emails.data.value" :key="email.id">
          <div class="relative flex" v-if="email.visible">
            <div class="absolute top-0 flex items-center w-full h-full py-2 bg-red-500">
              <div class="flex-1 pl-6">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>
              <div class="pr-6 text-right">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>
            </div>
            <div class="z-10 flex items-center py-2 bg-white draggable" :data-id="index">
              <div @click="openEmail(email)" :class="email.color" class="flex items-center justify-center flex-none w-10 h-10 mx-4 text-2xl text-white rounded-full" data-cy="email">
                {{ email.from.charAt(0) }}
              </div>
              <div @click="openEmail(email)" class="flex-1 pr-4">
                <div class="text-gray-800" :class="{ 'font-semibold': !email.isRead }">{{ email.from }}</div>
                <div class="text-gray-800 break-all line-clamp-1" :class="{ 'font-semibold': !email.isRead }">{{ email.subject }}</div>
                <div class="font-light text-gray-800 break-all line-clamp-1">{{ email.preview }}</div>
              </div>
              <div @click="star(email)" class="flex-none mx-4 text-center" data-cy="star">
                <div class="mb-4 text-xs text-gray-800">{{ email.date }}</div>
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 m-auto" :class="{ 'fill-current text-yellow-500': email.isStarred, 'text-gray-500': ! email.isStarred }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
  <!-- <span class="bg-gray-500 bg-red-500 bg-yellow-500 bg-green-500 bg-blue-500 bg-pink-500">hack to tailwind doesn't purge these classes</span> -->
</template>

<script lang="ts">
import { IonContent, IonPage } from '@ionic/vue';
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router'
import Emails from '../data/emails'
import { menuController } from '@ionic/vue';

export default defineComponent({
  name: 'Inbox',
  components: {
    IonContent,
    IonPage,
  },
  setup() {
    const router = useRouter()
    const hideSearchBanner = ref(false)


    const watchScrolling = (event: any) => {
      if (event.detail.deltaY > 0 && event.detail.scrollTop > 50) {
        hideSearchBanner.value = true
      } else {
        hideSearchBanner.value = false
      }
    }

    const star = (email: any) => {
      email.isStarred = ! email.isStarred;
    }

    const openEmail = (email: any) => {
      Emails.data.value.map((e) => {
        if (e.id == email.id) {
          e.isRead = true
        }
      })

      router.push(`/email/${email.id}`)
    }

    const deleteEmail = (el: HTMLElement) => {
      setTimeout(() => {
        Emails.data.value = Emails.data.value.filter((e, index) => index.toString() !== el.dataset.id)
      }, 300)
    }

    const search = (e: any) => {
      const searchTerm = e.currentTarget.value.toLowerCase()

      if (searchTerm !== "") {
        Emails.data.value.map(e => {
          if (! (e.from.toLowerCase().includes(searchTerm) || e.subject.toLowerCase().includes(searchTerm) || e.preview.toLowerCase().includes(searchTerm))) {
            e.visible = false
          } else {
            e.visible = true
          }
        })
      } else {
        Emails.data.value.map(e => e.visible = true)
      }
    }

    let startPoint = 0
    let dragItem: HTMLElement | null;

    document.body.addEventListener('touchmove', (e) => {
      const x = e.touches[0].clientX-startPoint;
      
      if (dragItem && (x > 50 || x < -50)) {
        (dragItem as HTMLElement).style.transform = "translate3d(" + x + "px, " + 0 + "px, 0)";
      }
    });

    document.body.addEventListener('touchstart', (e) => {
      startPoint = e.changedTouches[0].clientX;
      const startCoordinates = {x:e.changedTouches[0].clientX, y:e.changedTouches[0].clientY};

      dragItem = (e.target as HTMLElement).closest('.draggable');
      
      const endHandler = (e: any) => {
        const xDragDistance = Math.abs(Math.abs(startCoordinates.x) - Math.abs(e.changedTouches[0].clientX));
        const endPoint = e.changedTouches[0].clientX;

        document.body.removeEventListener('touchend', endHandler, false);

        if (dragItem) {
          if (xDragDistance >= 150) {
            if (startPoint > endPoint) {
              dragItem.style.transform = "translate3d(-500px, 0px, 0)";
            } else {
              dragItem.style.transform = "translate3d(500px, 0px, 0)";
            }

            dragItem.style.transition = "all 0.3s linear";
            deleteEmail(dragItem)
        
          } else {
            dragItem.style.transform = "translate3d(0px, 0px, 0)";
            dragItem.style.transition = "all 0.1s linear";
          }
        }
      };
    
      document.body.addEventListener('touchend', endHandler, false);

    }, false);

    return { Emails, openEmail, star, menuController, watchScrolling, hideSearchBanner, search }
  }
});
</script>