<template>
  <v-container style="height: 48px" class="d-flex align-center">
  <div
    class="font-weight-bold"
    style="display: flex; justify-content: center; align-items: center; width: 40px; height: 40px; text-align: center; cursor: pointer"
    @click="handlerToHome"
  >
    <v-avatar color="blue-darken-2" rounded="0">
      <v-img src="/logo.webp"></v-img>
    </v-avatar>
  </div>
  <span style="text-indent: 10px">时光印记</span>
  <v-spacer></v-spacer>

  <search></search>
  <v-spacer></v-spacer>
  <ul class="navigation">
    <li v-for="item in store.menu" :key="item.url">
      <a :href="item.url"
        ><span>{{ item.name }}</span></a
      >
      <ul v-if="item.children.length" class="navigation-item">
        <li v-for="i in item.children" :key="i.url">
          <a :href="i.url"
            ><span>{{ i.name }}</span></a
          >
        </li>
      </ul>
    </li>
  </ul>
  <login></login>
  </v-container>
</template>

<script setup>
import { reactive, defineEmits, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
// components
import login from '@/components/user/login.vue'
import userMenu from './user/userMenu.vue'
// import regsiter from "@/components/user/regsite.vue";
import search from './input/search.vue'

// pinia
import { userInfo } from '../store'
import { userSearchFilters } from '@/store'

const data = reactive({
  serachValue: '',
  historyItems: [],
})
const store = reactive({
  menu: [
    {
      id: '1',
      pid: '0',
      icon: '',
      name: '往昔册',
      url: '/',
      thirdParty: false,
      tag: false,
      children: [],
    },
    {
      id: '1',
      pid: '0',
      icon: '',
      name: '易事屋',
      url: '/easyHouse',
      tag: false,
      children: [],
    },
    {
      id: '1',
      pid: '0',
      icon: '',
      name: '可视化',
      tag: false,
      children: [
        {
          id: '1',
          pid: '0',
          icon: '',
          name: 'GIS',
          url: '/easyHouse',
          tag: false,
          children: [],
        },
      ],
    },
    {
      id: '1',
      pid: '0',
      icon: '',
      name: '需求墙',
      url: '/demand',
      tag: false,
      children: [],
    },
  ],
  login: true,
  dialog: false,
  token: localStorage.getItem('token'),
})

const router = useRouter()
const route = useRoute()

const user = userInfo()
const serachFilters = userSearchFilters()

const focused = (boolean) => {
  if (boolean) {
    const history = serachFilters.history()
    data.historyItems = history
  }
}

const clearHandler = () => {
  serachFilters.clear()
}
function handlerChip(item) {
  data.serachValue = item
  handlerEnter()
}

function handlerToHome() {
  router.push('/')
}
async function handlerEnter() {
  // 键盘enter事件
  if (data.serachValue) {
    const serach = await serachFilters.query({ title: data.serachValue })
    data.serachValue = ''
    // router.push('search')
  }
}

onMounted(() => {})

function onDialogShow() {
  store.dialog = !store.dialog
}

function close() {
  store.dialog = !store.dialog
}

function onTorouter(obj) {
  if (obj.thirdParty) {
    window.open(obj.url, '_blank')
    return false
  }
  if (obj.tag) {
    const href = router.resolve(obj.url)
    window.open(href.href, '_blank')
  } else {
    router.push(obj.url)
  }
}
</script>

<style scoped lang="scss">
.logo {
  cursor: pointer;
  font-weight: 800;
}

ul {
  list-style: none;
  margin: 0;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-flex-flow: row wrap;
  justify-content: flex-end;
}
.navigation > li {
  position: relative;
  cursor: pointer;
}
.navigation a {
  text-decoration: none;
  display: block;
  padding: 1em;
  color: black;
}
.navigation > li > ul {
  display: none;
  position: absolute;
  z-index: 2000;
  top: 100%;
}
.navigation li a:hover {
  color: deepskyblue;
}

.navigation > li:hover ul {
  display: block;
  left: 0;
}

@media all and (max-width: 800px) {
  .navigation {
    justify-content: space-around;
  }
}

@media all and (max-width: 600px) {
  .navigation {
    -webkit-flex-flow: column wrap;
    flex-flow: column wrap;
    padding: 0;
  }

  .navigation a {
    text-align: center;
    padding: 10px;
    border-top: 1px solid rgba(255, 255, 255, 0.3);
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }

  .navigation li:last-of-type a {
    border-bottom: none;
  }
}
</style>
