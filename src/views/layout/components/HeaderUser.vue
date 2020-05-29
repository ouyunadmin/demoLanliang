<template>
  <el-dropdown size="small" class="admin-mr">
    <span class="btn-text">你好 {{ info.name }}</span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item @click.native="logOff">
        <admin-icon name="power-off" class="admin-mr-5" />注销
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'HeaderUser',
  computed: {
    ...mapState('admin/user', [
      'info'
    ])
  },
  methods: {
    ...mapActions('admin/account', [
      'LogOut'
    ]),
    /**
     * @description 登出
     */
    logOff() {
      this.LogOut({
        vm: this,
        confirm: true
      })
    }
  }
}
</script>
