export const TDT_TOKEN = '7a47a0fc5008f167eed134ef12125221'
export const TDT_SUBBDOMAINS = ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7']
export const CESIUM_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiY2UyZTUzZi05YmM5LTRlYzAtYmUyNi02NGYzNjE1ZGFkNGQiLCJpZCI6Njc4NTksImlhdCI6MTYzMjE0Mjg3Mn0.LIVC0sPo5GDd6c1GTDmCqSZOMIijKc5bPACcNI8Sxpc'
export const TDT_IMAGE = [
  {
    name: '矢量底图',
    key: 'vec_w',
  },
  {
    name: '影像底图',
    key: 'img_w',
  },
  {
    name: '地形晕渲',
    key: 'ter_w',
  },
]
export const TDT_Annotation = [
  {
    name: '矢量注记',
    key: 'cva_w',
  },
  {
    name: '影像注记',
    key: 'cia_w',
  },
  {
    name: '地形注记',
    key: 'cta_w',
  },
]
export const geoCode = [
  { name: '上海', spell: 'shanghai', coord: [121.46, 31.28] },
  { name: '河北', spell: 'hebei', coord: [116.21, 39.44] },
  { name: '山西', spell: 'shanxi', coord: [111.95, 37.65] },
  { name: '内蒙古', spell: 'neimenggu', coord: [112.17, 45.81] },
  { name: '辽宁', spell: 'liaoning', coord: [122.42, 41.29] },
  { name: '吉林', spell: 'jilin', coord: [126.32, 43.68] },
  { name: '黑龙江', spell: 'heilongjiang', coord: [128.34, 48.85] },
  { name: '江苏', spell: 'jiangsu', coord: [119.26, 33.04] },
  { name: '浙江', spell: 'zhejiang', coord: [120.15, 29.28] },
  { name: '安徽', spell: 'anhui', coord: [117.28, 31.86] },
  { name: '福建', spell: 'fujian', coord: [118.31, 26.07] },
  { name: '江西', spell: 'jiangxi', coord: [115.89, 27.97] },
  { name: '山东', spell: 'shandong', coord: [118.01, 36.37] },
  { name: '河南', spell: 'henan', coord: [113.46, 34.25] },
  { name: '湖北', spell: 'hubei', coord: [112.29, 30.98] },
  { name: '湖南', spell: 'hunan', coord: [112.08, 27.79] },
  { name: '广东', spell: 'guangdong', coord: [113.98, 22.82] },
  { name: '广西', spell: 'guangxi', coord: [108.67, 23.68] },
  { name: '海南', spell: 'hainan', coord: [110.03, 19.33] },
  { name: '四川', spell: 'sichuan', coord: [103.36, 30.65] },
  { name: '贵州', spell: 'guizhou', coord: [106.91, 26.67] },
  { name: '云南', spell: 'yunnan', coord: [101.71, 24.84] },
  { name: '西藏', spell: 'xizang', coord: [89.13, 31.76] },
  { name: '陕西', spell: 'shanxi1', coord: [108.94, 35.86] },
  { name: '甘肃', spell: 'gansu', coord: [100.82, 38.05] },
  { name: '青海', spell: 'qinghai', coord: [96.07, 35.62] },
  { name: '宁夏', spell: 'ningxia', coord: [106.27, 37.56] },
  { name: '新疆', spell: 'xinjiang', coord: [84.61, 42.89] },
  { name: '北京', spell: 'beijing', coord: [116.4, 40.4] },
  { name: '天津', spell: 'tianjin', coord: [117.44, 39.52] },
  { name: '重庆', spell: 'chongqing', coord: [107.51, 30.33] },
  { name: '香港', spell: 'xianggang', coord: [114.17, 22.38] },
  { name: '澳门', spell: 'aomen', coord: [113.55, 22.17] },
  { name: '台湾', spell: 'taiwan', coord: [121.01, 23.54] },
]

const a = [
  // 登录展示页面
  {
    path: '/posts/new',
    component: () => import('@/views/post/new.vue'),
    meta: {
      title: '发起话题',
    },
  },
  {
    path: '/posts/edit/:id',
    component: () => import('@/views/post/edit.vue'),
    meta: {
      title: '发起话题',
    },
  },
  {
    path: '/categories/new',
    component: () => import('@/views/post/categories-new.vue'),
  },
]
