<template>
  <ion-page>
    <ion-content :fullscreen="true" data-cy="read-view">
      <div class="fixed z-10 flex items-center w-full p-4 bg-white">
        <div class="flex-1">
          <svg @click="back()" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-cy="read-view--back">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
          </svg>
        </div>
        <div class="flex items-center flex-initial space-x-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
          </svg>
          <svg @click="deleteEmail(email)" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-cy="delete">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
        </div>
      </div>
      <div class="p-4 pt-14">
        <div class="flex items-center mb-6 text-xl">
          <div class="flex-1 mr-4">
            {{ email.subject }}
            <span class="text-gray-600 bg-gray-200 text-xs px-2 py-0.5 rounded relative -top-0.5">Inbox</span>
          </div>
          <svg @click="star(email)" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 m-auto" :class="{ 'fill-current text-yellow-500': email.isStarred, 'text-gray-500': ! email.isStarred }" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-cy="read-view--star">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
        </div>

        <div class="flex items-center mb-6">
          <div :class="email.color" class="flex items-center justify-center flex-none w-10 h-10 mr-4 text-2xl text-white rounded-full">
            {{ email.from.charAt(0) }}
          </div>
          <div class="flex-1 pr-4">
            <div class="font-semibold text-gray-800">{{ email.from }} <span class="text-xs font-normal text-gray-600">{{ email.date }}</span></div>
            <div class="flex items-center text-sm text-gray-600">
              to me
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 ml-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          <div class="flex-none mr-4 text-right">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
            </svg>
          </div>
          <div class="flex-none text-right">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </div>
        </div>

        <div class="mb-4 text-sm text-gray-600">Th’art nesh thee nay lad soft lad wacken thi sen up t’foot o’ our stairs.</div>
        <div class="mb-4 text-sm text-gray-600">Nay lad where’s tha bin. Th’art nesh thee a pint ‘o mild any rooad t’foot o’ our stairs. Where there’s muck there’s brass t’foot o’ our stairs ah’ll gi’ thee a thick ear.</div>
        <div class="mb-4 text-sm text-gray-600">Ah’ll learn thi tintintin tell thi summat for nowt soft lad mardy bum. Chuffin’ nora ah’ll box thi ears soft lad ee by gum tell thi summat for nowt ah’ll gi’ thee a thick ear. Bobbar nay lad. Breadcake soft southern pansy wacken thi sen up. Be reet where’s tha bin mardy bum mardy bum.</div>
        <div class="mb-4 text-sm text-gray-600">Tell thi summat for nowt where there’s muck there’s brass shu’ thi gob. Dahn t’coil oil. That’s champion ey up will ‘e ‘eckerslike shurrup by ‘eck. Eeh. Shu’ thi gob face like a slapped arse god’s own county soft lad th’art nesh thee tha daft apeth.</div>
        <div class="mb-4"><img src="https://picsum.photos/id/0/500/300" class="w-full rounded" /></div>
        <div class="mb-4 text-sm text-gray-600">Ah’ll learn thi tintintin tell thi summat for nowt soft lad mardy bum. Chuffin’ nora ah’ll box thi ears soft lad ee by gum tell thi summat for nowt ah’ll gi’ thee a thick ear. Bobbar nay lad. Breadcake soft southern pansy wacken thi sen up. Be reet where’s tha bin mardy bum mardy bum.</div>
        <div class="mb-4 text-sm text-gray-600">Tell thi summat for nowt where there’s muck there’s brass shu’ thi gob. Dahn t’coil oil. That’s champion ey up will ‘e ‘eckerslike shurrup by ‘eck. Eeh. Shu’ thi gob face like a slapped arse god’s own county soft lad th’art nesh thee tha daft apeth.</div>

        <div class="flex mt-10 space-x-3">
          <div class="flex justify-center flex-1 py-3 text-sm font-semibold text-center text-gray-500 border-2 rounded">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
            </svg>
            Reply
          </div>
          <div class="flex justify-center flex-1 py-3 text-sm font-semibold text-center text-gray-500 border-2 rounded">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
            </svg>
            Reply all
          </div>
          <div class="flex justify-center flex-1 py-3 text-sm font-semibold text-center text-gray-500 border-2 rounded">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
            Forward
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonPage } from '@ionic/vue';
import { defineComponent } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import Emails from '../data/emails'

export default defineComponent({
  name: 'Email',
  components: {
    IonContent,
    IonPage
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const email = Emails.data.value.filter((email) => route.params.id.toString() == email.id.toString())[0]

    const star = (email: any) => {
      email.isStarred = ! email.isStarred;
    }
    
    const back = () => { router.back() }

    const deleteEmail = (email: any) => {
      setTimeout(() => {
        Emails.data.value = Emails.data.value.filter((e) => e.id !== email.id)
      }, 300)

      back()
    }

    return { email, back, deleteEmail, star }
  }
});
</script>