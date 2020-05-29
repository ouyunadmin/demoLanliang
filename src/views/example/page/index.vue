<template>
  <admin-container>
    <template slot="header">标签页管理</template>

    <!-- 证明有缓存 -->
    <p class="admin-mt-0">在下面的输入框输入任意字符后，切换到其它页面，再回到此页时输入框文字保留，证明被缓存</p>
    <el-input v-model="value" placeholder="input here" />
    <!-- 页签操作 -->
    <p>关闭标签页</p>
    <el-button-group>
      <el-button @click="handleCloseCurrent">
        <admin-icon name="times" /> 当前
      </el-button>
      <el-button @click="handleCloseNewCurrent">
        <admin-icon name="times" /> 当前，打开新标题并执行方法
      </el-button>
      <el-button @click="handleCloseLeft">
        <admin-icon name="arrow-left" /> 左侧
      </el-button>
      <el-button @click="handleCloseRight">
        右侧 <admin-icon name="arrow-right" />
      </el-button>
      <el-button @click="handleCloseOther">
        其它 <admin-icon name="times" />
      </el-button>
      <el-button @click="handleCloseAll">
        全部 <admin-icon name="times-circle" />
      </el-button>
    </el-button-group>
    <p>打开标签页</p>
    <el-button-group>
      <el-button @click="handleAddCurrent">
        <admin-icon name="plus-square" /> 多个路由绑定同一组件
      </el-button>
      <el-button v-addRoutes:query="{'id': '2'}" v-addRoutes="{'name': 'PageTag', 'query': {'id': '1'}}">
        <admin-icon name="plus-square" /> 指令，多个路由绑定同一组件
      </el-button>
    </el-button-group>
    <p>刷新</p>
    <el-button-group>
      <el-button @click="handleCleanCacheAndRefreshCurrent">
        <admin-icon name="refresh" />
        清空当前页缓存并刷新
      </el-button>
      <el-button @click="handleCleanCacheAndRefreshAll">
        <admin-icon name="refresh" />
        清空所有缓存并刷新
      </el-button>
    </el-button-group>
  </admin-container>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'

export default {
  name: 'PageTag',
  data() {
    return {
      value: ''
    }
  },
  methods: {
    ...mapMutations('admin/page', [
      'keepAliveRemove',
      'keepAliveClean'
    ]),
    ...mapActions('admin/page', [
      'close',
      'closeLeft',
      'closeRight',
      'closeOther',
      'closeAll'
    ]),
    ...mapActions('admin/app', [
      'routeRefresh'
    ]),
    // 多个路由绑定同一组件
    handleAddCurrent() {
      this.$addRoute({ 'name': 'PageTag', 'query': { 'id': 1000 }})
    },
    // 关闭当前，打开新标题并执行方法
    handleCloseNewCurrent() {
      this.close({
        tagName: this.$route.name,
        to: { name: 'TableCommon' },
        fnc: 'getList'
      })
      /* .then(res => {
        if (res !== -1) {
          setTimeout(() => {
            const { getList } = this.$root.$children[0].$refs['root'].$refs['routerview']
            if (typeof getList === 'function') {
              getList()
            }
            // this.$root.$children[0].$refs['root'].$refs['routerview'].getList()
            // 跳到指定页面，执行页面方法，父节点可能不同
            // this.$parent.$refs.routerview.getList()
          }, 200)
        }
      }) */
    },
    // 关闭当前
    handleCloseCurrent() {
      this.close({
        tagName: this.$route.name
      })
    },
    // 关闭左侧
    handleCloseLeft() {
      this.closeLeft({
        tagName: this.$route.name
      })
    },
    // 关闭右侧
    handleCloseRight() {
      this.closeRight({
        tagName: this.$route.name
      })
    },
    // 关闭其他
    handleCloseOther() {
      this.closeOther({
        tagName: this.$route.name
      })
    },
    // 关闭全部
    handleCloseAll() {
      this.closeAll()
    },
    // 清空当前页缓存并刷新此页面
    handleCleanCacheAndRefreshCurrent() {
      this.routeRefresh(this.$route.name)
      // this.keepAliveRemove(this.$route.name)
      // this.$nextTick(this.$router.replace('/refresh'))
    },
    // 清空所有的缓存并刷新此页面
    handleCleanCacheAndRefreshAll() {
      this.keepAliveClean()
      this.$nextTick(this.$router.replace('/refresh'))
    }
  }
}
</script>
