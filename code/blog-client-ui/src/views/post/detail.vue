<template>
  <div class="containner">
    <side-main>
      <template #main>
        <v-sheet class="pa-5">
          <v-card flat min-height="900px">
            <v-card-title>
              <h2 style="font-weight: 1000">
                {{ store.data.title }}
              </h2>
            </v-card-title>
            <v-card-subtitle>
              <div style="display: flex; gap: 10px; align-items: center">
                <v-avatar size="30">
                  <v-img :src="store.data.auther.avatar" :alt="store.data.auther.username"></v-img>
                </v-avatar>
                <span>{{ store.data.auther.username }}</span>
                ·
                <span style="color: rgba(0, 0, 0, 0.5); font-size: 12px">
                  {{ dateFormat(store.data.date) }}
                </span>
                · <span>{{ store.data.readcount || 0 }} 阅读量</span>
              </div>
            </v-card-subtitle>
            <v-card-text>
              <div>
                <edit type="viewer" :markdownContent="store.data.body"></edit>
                <!-- <div id="viewer"></div> -->
              </div>
            </v-card-text>
          </v-card>
        </v-sheet>
        <div style="border-top: 1px solid #fec939">
          <v-sheet class="pa-5">
            <div style="width: 100%; display: flex; justify-content: space-between; align-items: center">
              <div style="display: flex; gap: 10px; align-items: center">
                <v-avatar size="80">
                  <v-img :src="store.data.auther.avatar" :alt="store.data.auther.username"></v-img>
                </v-avatar>
                <span>{{ store.data.auther.username }}</span>
                ·
                <span style="color: rgba(0, 0, 0, 0.5); font-size: 12px">
                  {{ dateFormat(store.data.date) }}
                </span>
              </div>
              <div></div>
              <div>
                <v-btn flat variant="tonal" color="#fec939" @click="handlerContact">联系他</v-btn>
              </div>
            </div>
          </v-sheet>
        </div>
        <v-sheet style="margin-top: 10px" class="pa-5">
          <v-textarea v-model="userComment" hide-details label="评论" rows="2" placeholder="友善评论，恶语伤人心" variant="outlined">
            <template #prepend>
              <v-avatar size="50">
                <v-img :src="user.user.avatar || ''"></v-img>
              </v-avatar>
            </template>
            <template #append>
              <v-btn flat variant="tonal" color="#2196F3" @click="handlerComment">发送</v-btn>
              <!-- <v-avatar size="50">
                <v-img :src="user.user.avatar"></v-img>
              </v-avatar> -->
            </template>
          </v-textarea>
        </v-sheet>
        <v-sheet style="margin-top: 10px" class="pa-5">
          <list v-if="comments.length > 0" lines="three" bg-color="#e5e5e5" density="compact">
            <v-list-item v-for="item in comments" :key="item._id">
              <template #prepend>
                <v-avatar size="50">
                  <v-img :src="item.auther.avatar"></v-img>
                </v-avatar>
              </template>
              <v-list-title>{{ item.auther.username }}</v-list-title>
              <v-list-item-subtitle>{{ item.content }}</v-list-item-subtitle>
              <span style="font-size: 10px">{{ item.date }}</span>
              <br />
              <v-divider></v-divider>
            </v-list-item>
          </list>
          <div v-else>暂无评论</div>
        </v-sheet>
      </template>
      <template #side>
        <publish></publish>
      </template>
    </side-main>
  </div>
</template>

<script setup>
import { reactive, ref, onBeforeMount, onMounted, onUnmounted, computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import moment from 'moment'

import publish from '@/components/publish.vue'
import edit from '../../components/edit.vue'

import { getArticleDetal, getComments, newComment, postReadCount } from '@/http/article'
import { userInfo } from '../../store/userStore'

const router = useRouter()
const route = useRoute()
const user = userInfo()
let md = ref()

let timer = ref(null)
const store = reactive({
  data: {
    title: '',
    date: '',
    body: '',
    auther: {},
  },
  user: {},
})
const comments = ref([])
const userComment = ref()
const dateFormat = (date) => {
  return moment(date).format('YYYY-MM-DD HH:mm')
}
function allADemo() {
  const allA = document.querySelectorAll('.table-of-contents a')
  allA.forEach((item) => {
    item.style.color = 'rgba(0,0,0,0.5)'
    item.style.fontWeight = 800
    console.log(item)
    item.addEventListener('click', function (e) {
      e.preventDefault()

      item.scrollIntoView(true)
    })
  })
}
// function query(params) {
//   getArticleList(params).then((res) => {
//     data.data = res.data
//   })
// }

function handlerContact() {
  router.push({
    path: `/userSpace/${store.data.u_id}`,
  })
}
function handlerComment() {
  if (!user.isLogin) {
    return router.login({ name: 'login' })
  }
  const params = {
    p_id: route.params.id,
    content: userComment.value,
  }
  newComment(params).then((res) => {
    if (res.status == 200) {
      userComment.value = ''
      queryComments()
    }
  })
}
function queryComments() {
  const postId = route.params.id
  getComments({ p_id: postId }).then((res) => {
    comments.value = res.data
  })
}
async function getData() {
  const postId = route.params.id
  getArticleDetal({ _id: postId }).then((res) => {
    store.data = res.data
    document.title = res.data.title
    initMd()
  })
}
// watch(
//   () => route.name,
//   () => {
//     query({ captcha_id: route.params.id })
//   },
//   { immediate: true, deep: true }
// )

onMounted(() => {
  if (timer.value == null) {
    timer.value = setTimeout(function () {
      postReadCount({ _id: route.params.id })
    }, 10000)
  }
  getData()
  queryComments()
  // const dom = document.querySelector('.custom')
  // dom.style.color = 'black'
})
onUnmounted(() => {
  clearTimeout(timer.value)
  timer.value = null
})
</script>
<style lang="scss" scoped>
.containner {
  background: #edf2f7;
  min-height: calc(100vh - 48px);
}
</style>
