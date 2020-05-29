<template>
  <div class="admin-mb">
    <el-radio-group v-model="$i18n.locale">
      <el-radio-button
        v-for="language in $languages"
        :key="language.value"
        :label="language.value"
      >
        {{ language.label }}
      </el-radio-button>
    </el-radio-group>

    <!-- <el-radio-group v-model="lang">
      <el-radio-button v-for="(item, index) in list" :key="index" :label="item.label">{{ item.name }}</el-radio-button>
    </el-radio-group> -->
  </div>
</template>

<script>
// import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  // computed: {
  //   ...mapState('admin/lang', [
  //     'list'
  //   ]),
  //   ...mapGetters('admin/lang', [
  //     'activeSetting'
  //   ]),
  //   lang: {
  //     get() {
  //       return this.activeSetting.label
  //     },
  //     set(lang) {
  //       this.set(lang)
  //         .then(() => {
  //           this.$i18n.locale = lang
  //         })
  //     }
  //   }
  // },
  // methods: {
  //   ...mapActions('admin/lang', [
  //     'set'
  //   ])
  // }
}
</script>
