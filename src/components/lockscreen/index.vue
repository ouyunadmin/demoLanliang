<template>
  <div class="lock-screen-btn-con" @click="lockScreen">
    <svg t="1503994776084" class="lockscreen-svg" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9662" xmlns:xlink="http://www.w3.org/1999/xlink" width="64" height="64">
      <path d="M818.246893 412.326906l-45.988404 0 0-70.991868c0-152.307871-123.463939-275.778974-275.778974-275.778974s-275.78102 123.471103-275.78102 275.778974l0 70.991868-45.987381 0c-25.379017 0-45.988404 20.566408-45.988404 45.987381l0 455.407074c0 25.428136 20.560268 45.988404 45.988404 45.988404l643.535779 0c25.37697 0 45.988404-20.560268 45.988404-45.988404L864.235296 458.314287C864.190271 432.893314 843.623863 412.326906 818.246893 412.326906L818.246893 412.326906zM680.331823 412.326906 312.62516 412.326906l0-70.991868c0-101.55393 82.344426-183.853331 183.854355-183.853331 101.509928 0 183.853331 82.343403 183.853331 183.853331L680.332846 412.326906 680.331823 412.326906zM680.331823 412.326906" p-id="9663" />
    </svg>
  </div>
</template>

<script>
import Cookies from 'js-cookie'

const setLockBackSize = () => {
  const x = document.body.clientWidth
  const y = document.body.clientHeight
  const r = Math.sqrt(x * x + y * y)
  return parseInt(r)
}

export default {
  name: 'LockScreen',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    var lockScreenBack
    if (!document.getElementById('lock_screen_back')) {
      var lockdiv = document.createElement('div')
      lockdiv.setAttribute('id', 'lock_screen_back')
      lockdiv.setAttribute('class', 'lock-screen-back')
      document.body.appendChild(lockdiv)
      lockScreenBack = document.getElementById('lock_screen_back')
      window.addEventListener('resize', () => {
        const size = setLockBackSize()
        this.lockScreenSize = size
        lockScreenBack.style.transition = 'all 0s'
        lockScreenBack.style.width = lockScreenBack.style.height = size + 'px'
      })
    } else {
      lockScreenBack = document.getElementById('lock_screen_back')
    }
    const size = setLockBackSize()
    this.lockScreenSize = size
    lockScreenBack.style.transition = 'all 3s'
    lockScreenBack.style.width = lockScreenBack.style.height = size + 'px'
  },
  methods: {
    lockScreen() {
      var lockScreenBack = document.getElementById('lock_screen_back')
      lockScreenBack.style.transition = 'all 3s'
      lockScreenBack.style.zIndex = 10000
      lockScreenBack.style.boxShadow = '0 0 0 ' + this.lockScreenSize + 'px #667aa6 inset'
      this.showUnlock = true
      Cookies.set('last_page_name', this.$route.name) // 本地存储锁屏之前打开的页面以便解锁后打开
      setTimeout(() => {
        lockScreenBack.style.transition = 'all 0s'
        this.$router.push({
          name: 'locking'
        })
      }, 800)
      Cookies.set('locking', '1')
    }
  }
}
</script>

<style scoped>
.lockscreen-svg {
  display: inline-block;
  cursor: pointer;
  fill: #ffffff;
  width: 1em;
  height: 1em;
  vertical-align: -0.18em;
  overflow: hidden;
  font-size: 20px;
}
</style>
