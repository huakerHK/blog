<template>
  <div class="container">
    <div class="box">
      <div class="cont">
        <div class="form sign-in">
          <h2>欢迎回来</h2>
          <label>
            <v-text-field
              v-model="data.userName"
              density="compact"
              prepend-inner-icon="mdi-account"
              label="用户名"
              variant="outlined"
              :error="error.name.error"
              :error-messages="error.name.msg"
              :rules="[rules.nameRequired]"
              @update:focused="userNameFocused"
            ></v-text-field>
          </label>
          <label>
            <v-text-field
              v-model="data.userPassword"
              type="password"
              label="密码"
              variant="outlined"
              prepend-inner-icon="mdi-shield-key"
              density="compact"
              :error="error.password.error"
              :error-messages="error.password.msg"
              required
              :rules="[rules.passwordRequired]"
              @update:focused="userPasswordFocused"
            ></v-text-field>
          </label>
          <p class="forgot-pass" @click="handlerForget">忘记密码？</p>
          <button type="button" class="submit" @click="handleLogin">登 录</button>
        </div>
        <div class="sub-cont">
          <div class="img">
            <div class="img__text m--up">
              <h2>还没有账号?</h2>
              <p>点击注册加入我们!</p>
            </div>
            <div class="img__text m--in">
              <h2>我们中的一员?</h2>
              <p>如果您已经有帐户，请登录。我们很想念您!</p>
            </div>
            <div class="img__btn">
              <span class="m--up">注 册</span>
              <span class="m--in">登 录</span>
            </div>
          </div>
          <div class="form sign-up">
            <h2>一起探索世界吧！</h2>
            <label>
              <v-text-field
                v-model="regsiterForm.username"
                density="compact"
                prepend-inner-icon="mdi-account"
                label="用户名"
                variant="outlined"
                :error="error.name.error"
                :error-messages="error.name.msg"
                :rules="[rules.nameRequired]"
                @update:focused="userNameFocused"
              ></v-text-field>
            </label>
            <label>
              <v-text-field
                v-model="regsiterForm.email"
                density="compact"
                prepend-inner-icon="mdi-email"
                append-icon="mdi-send"
                label="邮箱"
                variant="outlined"
                @click:append="handlerEmail"
                :rules="[rules.email]"
                :messages="email.msg"
              ></v-text-field>
            </label>
            <label>
              <v-text-field
                v-model="regsiterForm.code"
                density="compact"
                label="验证码"
                variant="outlined"
                :error="error.code.error"
                :error-messages="error.code.msg"
                :rules="[rules.code]"
                @update:focused="userCodeFocused"
              ></v-text-field>
            </label>
            <label>
              <v-text-field
                v-model="regsiterForm.userpassword"
                type="password"
                label="密码"
                variant="outlined"
                prepend-inner-icon="mdi-shield-key"
                density="compact"
                required
                :rules="[rules.passwordRequired]"
              ></v-text-field>
            </label>
            <button type="button" class="submit" @click="handlerRegsiter">注 册</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { userInfo } from '@/store/userStore'
import { rules } from '../../utils/tool'
const user = userInfo()
const router = useRouter()

const data = reactive({
  msg: '',
  userName: '',
  userPassword: '',
})

let error = ref({
  password: {
    error: false,
    msg: '',
  },
  name: {
    error: false,
    msg: null,
  },
  code: {
    error: false,
    msg: null,
  },
})
const email = ref({
  msg: '',
})
const regsiterForm = reactive({
  username: '',
  userpassword: '',
  email: '',
  code: '',
})

const handlerForget = () => {
  router.push('/user/forget')
}

const userNameFocused = (t) => {
  error.value.name.error = false
  error.value.name.msg = null
}
const userPasswordFocused = () => {
  error.value.password.error = false
  error.value.password.msg = null
}
const userCodeFocused = () => {
  error.value.code.error = false
  error.value.code.msg = null
}
const handleLogin = async () => {
  const res = await user.login({ username: data.userName, password: data.userPassword })
  console.log(res)

  if (res.data.status == 201) {
    error.value.name.msg = res.data.msg
    error.value.name.error = true
    return
  }
  if (res.data.status == 202) {
    error.value.password.msg = res.data.msg
    error.value.password.error = true
  }
  if (res.data.status == 200) {
    window.history.back()
  }
}

const handlerRegsiter = async () => {
  const res = await user.resgsiter(regsiterForm)
  if (res.data.status == 201) {
    error.value.code.msg = res.data.msg
    error.value.code.error = true
    return
  }
  if (res.data.status == 202) {
    error.value.name.msg = res.data.msg
    error.value.name.error = true
  }
  if (res.data.status == 200) {
    change()
  }
}
const handlerEmail = async () => {
  user.emailVerify({ email: regsiterForm.email }).then((res) => {
    email.value.msg = res.msg
  })
}
function change() {
  document.querySelector('.cont').classList.toggle('s--signup')
}
onMounted(() => {
  document.querySelector('.img__btn').addEventListener('click', change)
})
</script>

<style scoped lang="scss">
.container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ebeff3;
  .box {
    // width: 40vw;
    // height: 40vh;
    border-radius: 10px;
    box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.4), -10px -10px 10px white;
  }
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Open Sans', Helvetica, Arial, sans-serif;
  background: #ededed;
}

input,
button {
  border: none;
  outline: none;
  background: none;
  font-family: 'Open Sans', Helvetica, Arial, sans-serif;
}

$contW: 900px;
$imgW: 260px;
$formW: $contW - $imgW;
$switchAT: 1.2s;

$inputW: 300px;
$btnH: 36px;

$diffRatio: ($contW - $imgW) / $contW;

@mixin signUpActive {
  .cont.s--signup & {
    @content;
  }
}

.tip {
  font-size: 20px;
  margin: 40px auto 50px;
  text-align: center;
}

.cont {
  overflow: hidden;
  position: relative;
  width: $contW;
  height: 550px;
  border-radius: 10px;
  // margin: 0 auto 100px;
  // background: #fff;
}

.form {
  position: relative;
  width: $formW;
  height: 100%;
  transition: transform $switchAT ease-in-out;
  padding: 50px 30px 0;
}

.sub-cont {
  overflow: hidden;
  position: absolute;
  left: $formW;
  top: 0;
  width: $contW;
  height: 100%;
  padding-left: $imgW;
  // background: #fff;
  transition: transform $switchAT ease-in-out;

  @include signUpActive {
    transform: translate3d($formW * -1, 0, 0);
  }
}

button {
  display: block;
  margin: 0 auto;
  width: $inputW;
  height: $btnH;
  border-radius: 30px;
  color: #fff;
  font-size: 15px;
  cursor: pointer;
}

.img {
  overflow: hidden;
  z-index: 2;
  position: absolute;
  left: 0;
  top: 0;
  width: $imgW;
  height: 100%;
  padding-top: 360px;
  box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.4), -10px -10px 10px white;

  &:before {
    content: '';
    position: absolute;
    right: 0;
    top: 0;
    width: $contW;
    height: 100%;
    background-image: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/sections-3.jpg');
    background-size: cover;
    transition: transform $switchAT ease-in-out;
  }

  &:after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
  }

  @include signUpActive {
    &:before {
      transform: translate3d($formW, 0, 0);
    }
  }

  &__text {
    z-index: 2;
    position: absolute;
    left: 0;
    top: 50px;
    width: 100%;
    padding: 0 20px;
    text-align: center;
    color: #fff;
    transition: transform $switchAT ease-in-out;

    h2 {
      margin-bottom: 10px;
      font-weight: normal;
    }

    p {
      font-size: 14px;
      line-height: 1.5;
    }

    &.m--up {
      @include signUpActive {
        transform: translateX($imgW * 2);
      }
    }

    &.m--in {
      transform: translateX($imgW * -2);

      @include signUpActive {
        transform: translateX(0);
      }
    }
  }

  &__btn {
    overflow: hidden;
    z-index: 2;
    position: relative;
    width: 100px;
    height: $btnH;
    margin: 0 auto;
    background: transparent;
    color: #fff;
    text-transform: uppercase;
    font-size: 15px;
    cursor: pointer;

    &:after {
      content: '';
      z-index: 2;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      border: 2px solid #fff;
      border-radius: 30px;
    }

    span {
      position: absolute;
      left: 0;
      top: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      transition: transform $switchAT;

      &.m--in {
        transform: translateY($btnH * -2);

        @include signUpActive {
          transform: translateY(0);
        }
      }

      &.m--up {
        @include signUpActive {
          transform: translateY($btnH * 2);
        }
      }
    }
  }
}

h2 {
  width: 100%;
  font-size: 26px;
  text-align: center;
}

label {
  display: block;
  width: $inputW;
  margin: 25px auto 0;
  text-align: center;

  span {
    font-size: 12px;
    color: #cfcfcf;
    text-transform: uppercase;
  }
}

input {
  display: block;
  width: 100%;
  margin-top: 5px;
  padding-bottom: 5px;
  font-size: 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.4);
  text-align: center;
}

.forgot-pass {
  margin-top: 15px;
  text-align: center;
  font-size: 12px;
  color: #3742df;
  cursor: pointer;
}

.submit {
  margin-top: 40px;
  margin-bottom: 20px;
  background: #d4af7a;
  text-transform: uppercase;
}

.fb-btn {
  border: 2px solid #d3dae9;
  color: darken(#d3dae9, 20%);

  span {
    font-weight: bold;
    color: darken(#768cb6, 20%);
  }
}

.sign-in {
  transition-timing-function: ease-out;

  @include signUpActive {
    transition-timing-function: ease-in-out;
    transition-duration: $switchAT;
    transform: translate3d(750px, 0, 0);
  }
}

.sign-up {
  transform: translate3d($contW * -1, 0, 0);

  @include signUpActive {
    transform: translate3d(0, 0, 0);
  }
}

.icon-link {
  position: absolute;
  left: 5px;
  bottom: 5px;
  width: 32px;

  img {
    width: 100%;
    vertical-align: top;
  }

  &--twitter {
    left: auto;
    right: 5px;
  }
}

.link-footer {
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
}
</style>
