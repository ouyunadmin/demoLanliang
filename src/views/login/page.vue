<template>
  <div class="page-login">
    <div class="page-login--layer page-login--layer-area">
      <ul class="circles">
        <li v-for="n in 10" :key="n" />
      </ul>
    </div>
    <!--<div
      class="page-login--layer page-login--layer-time"
      flex="main:center cross:center">
      {{time}}
    </div>-->
    <div class="page-login--layer">
      <div
        class="page-login--content"
        flex="dir:top main:justify cross:center box:justify"
      >
        <div class="page-login--content-header" />
        <div class="login-container" flex="dir:top main:center cross:center">
          <el-form ref="loginForm" class="login-form" auto-complete="on" :model="loginForm" :rules="loginRules" label-position="right">
            <div class="title-container">
              <h3 class="title">红狮环保 - 系统登录</h3>
            </div>
            <el-form-item prop="username">
              <span class="svg-container svg-container_login">
                <svg-icon icon-class="user" />
              </span>
              <el-input v-model.trim="loginForm.username" name="username" type="text" auto-complete="on" placeholder="请输入员工编号" />
            </el-form-item>
            <el-form-item prop="password">
              <span class="svg-container">
                <svg-icon icon-class="password" />
              </span>
              <el-input v-model.trim="loginForm.password" name="password" :type="passwordType" auto-complete="off" placeholder="密码" />
              <span class="show-pwd" @click="showPwd">
                <svg-icon icon-class="eye" />
              </span>
            </el-form-item>
            <el-form-item prop="code">
              <span class="svg-container svg-container_code">
                <svg-icon icon-class="verification_code" />
              </span>
              <el-input v-model.trim="loginForm.code" name="code" type="text" auto-complete="off" placeholder="验证码" @keyup.enter.native="handleLogin" />
              <span class="show-code">
                <img class="captcha" width="100" height="34" :src="imgURL" @click="refreshCode">
              </span>
            </el-form-item>
            <!--<div>
              <span class="link-type" @click="showDialog=true"><admin-icon name="question-circle"/> 忘记密码</span>
            </div>-->
            <el-button type="primary" style="width:100%;margin-bottom:30px;" :loading="loading" @click.native.prevent="handleLogin">登录</el-button>
          </el-form>
          <psw-dialog :is-active="showDialog" :toggle-click="toggleClick" />
        </div>
        <div class="page-login--content-footer">
          <p class="page-login--content-footer-options">
            <a href="http://www.hongshigroup.com/" target="_blank">红狮控股集团</a>|
            <a href="http://www.hs56.com/" target="_blank">红狮物流</a>|
            <a href="http://www.goushuini.com/" target="_blank">购水泥网</a>|
            <a href="http://www.hsmro.cn/" target="_blank">MRO商城</a>|
            <a href="http://www.ucoal.com/" target="_blank">优煤网</a>|
            <a href="http://www.runlion.com/" target="_blank">杭州兰亮网络</a>
          </p>
          <p class="page-login--content-footer-copyright">
            版权所有<admin-icon name="copyright" /> 2017 hs56.com  浙ICP备15044248号-2
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { isvalidUsername } from '@/plugin/validate'
// import dayjs from 'dayjs'
import { mapActions } from 'vuex'
import PswDialog from './PswDialog'
import imgURL from '@/assets/images/1.jpg'

export default {
  name: 'Login',
  components: {
    PswDialog
  },
  data() {
    /* const validateUsername = (rule, value, callback) => {
      if (!validatPhone(value)) {
        callback(new Error('请输入正确的手机号码'))
      } else {
        callback()
      }
      if (!isvalidUsername(value)) {
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (!value && value.length < 6 && value.length > 12) {
        callback(new Error('密码不能少于6位，大于12位数'))
      } else {
        callback()
      }
    } */
    const checkCode = (rule, value, callback) => {
      if (!value) {
        callback(new Error('验证码不能为空 '))
      } else if (value.length !== 4) {
        callback(new Error('请输入4位验证码 '))
      } else {
        callback()
      }
    }
    return {
      timeInterval: null,
      // time: dayjs().format('HH:mm:ss'),
      imgURL,
      loginForm: {
        username: 'admin',
        password: '000000',
        code: '1234'
      },
      loginRules: {
        // username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        // password: [{ required: true, trigger: 'blur', validator: validatePassword }]
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '验证码不能为空', trigger: 'blur' },
          { validator: checkCode, trigger: 'blur' }
        ]
      },
      passwordType: 'password',
      loading: false,
      showDialog: false
    }
  },
  mounted() {
    this.timeInterval = setInterval(() => {
      this.refreshTime()
    }, 1000)
  },
  beforeDestroy() {
    clearInterval(this.timeInterval)
  },
  methods: {
    ...mapActions('admin/account', [
      'login'
    ]),
    refreshTime() {
      // this.time = dayjs().format('HH:mm:ss')
    },
    // 刷新验证码
    refreshCode() {
      // this.imgURL = global.zh.generateCode + '&s=' + Math.random()
    },
    toggleClick() {
      this.showDialog = false
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          // 登录
          this.login(this.loginForm)
            .then(() => {
              this.loading = false
              const redirect = this.$route.query.redirect
              if (redirect) {
                // 重定向到指定的页面
                this.$router.replace(redirect)
              } else {
                // 重定向到开始路径
                this.$router.replace('/')
              }
            }).catch(() => {
              this.refreshCode()
              this.loading = false
            })
        } else {
          // 登录表单校验失败
          // this.$message.error('表单校验失败')
        }
      })
    }
  }
}
</script>
