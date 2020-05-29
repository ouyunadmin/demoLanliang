<template>
  <admin-container>
    <template slot="header">拖拽列表</template>

    <el-card shadow="always" class="admin-mb">
      <div slot="header" class="admin-clearfix">待办事项</div>
      <draggable class="drop-box1" :class="dropConClass.left" :options="options" :value="list1" @input="handleListChange($event, 'left')" @end="handleEnd($event, 'left')">
        <div v-for="(itemLeft, index) in list1" :key="`drag_li1_${index}`" class="drag-list-item admin-mt-0">
          {{ itemLeft.name }}
        </div>
      </draggable>
    </el-card>

    <el-card shadow="always" class="admin-mb">
      <div slot="header" class="admin-clearfix">完成事项</div>
      <draggable class="drop-box2" :class="dropConClass.right" :options="options" :value="list2" @input="handleListChange($event, 'right')" @end="handleEnd($event, 'right')">
        <div v-for="(itemLeft, index) in list2" :key="`drag_li2_${index}`" class="drag-list-item admin-mt-0">
          {{ itemLeft.name }}
        </div>
      </draggable>
    </el-card>

    <el-card shadow="always" class="admin-mb">
      <div slot="header" class="admin-clearfix">操作记录</div>
      <div class="handle-inner-box">
        <p v-for="(item, index) in handleList" :key="`handle_item_${index}`">{{ item }}</p>
      </div>
    </el-card>

    <div class="res-show-box">
      <pre>{{ list1 }}</pre>
    </div>

    <div class="res-show-box">
      <pre>{{ list2 }}</pre>
    </div>
  </admin-container>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  name: 'PlaygroundList',
  components: {
    draggable
  },
  data() {
    return {
      options: { group: 'drag_list' },
      list1: [],
      list2: [],
      dropConClass: {
        left: ['drop-box', 'left-drop-box'],
        right: ['drop-box', 'right-drop-box']
      },
      handleList: []
    }
  },
  mounted() {
    this.list1 = [
      { id: 1, name: '1 item' },
      { id: 2, name: '2 item' },
      { id: 3, name: '3 item' },
      { id: 4, name: '4 item' },
      { id: 5, name: '5 item' }
    ]
    this.list2 = [
      { id: 10, name: '10 item' }
    ]
  },
  methods: {
    handleChange({ src, target, oldIndex, newIndex }) {
      this.handleList.unshift(`${src} => ${target}, ${oldIndex} => ${newIndex}`)
    },
    handleListChange(value, type) {
      if (type === 'left') this.list1 = value
      else this.list2 = value
    },
    handleEnd(event, type) {
      const srcClassName = (event.srcElement || event.target).classList[0]
      const targetClassName = event.to.classList[0]
      let src = ''
      let target = ''
      if (srcClassName === targetClassName) {
        if (type === 'left') {
          src = 'left'
          target = 'left'
        } else {
          src = 'right'
          target = 'right'
        }
      } else {
        if (type === 'left') {
          src = 'left'
          target = 'right'
        } else {
          src = 'right'
          target = 'left'
        }
      }
      this.handleChange({
        src: src,
        target: target,
        oldIndex: event.oldIndex,
        newIndex: event.newIndex
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .drag-list-item {
    cursor: pointer;
    width: 100%;
    height: 64px;
    margin: 10px 0;
    background-color: #fff;
    text-align: left;
    line-height: 54px;
    padding: 5px 10px;
    box-sizing: border-box;
    border: 1px solid #dcdee2;
    box-shadow: 0px 1px 3px 0 rgba(0, 0, 0, 0.2);
  }
  .drop-box {
    min-height: 60px;
  }
  .handle-inner-box{
    p{
      padding: 14px 0;
      margin: 0 14px;
      border-bottom: 1px dashed #eeeeee;
    }
  }
  .res-show-box {
    display: inline-block;
    margin-left: 10px;
    background-color: #fff;
    border: 1px solid #eee;
    vertical-align: top;
    width: 300px;
    height: 500px;
  }
  /deep/ .el-card.is-always-shadow {
    width: 300px;
    overflow: hidden;
    float: left;
    &+ .el-card.is-always-shadow {
      margin-left: 10px;
    }
  }
  /deep/ .el-card__body {
    // background: #f0f0f0;
    max-height: 405px;
    overflow: auto;
  }
</style>
