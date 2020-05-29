<template>
  <admin-container class="grid-table grid-form-container">
    <template slot="header">穿梭框</template>
    <div class="grid-body" flex="dir:top" style="min-width: 900px">
      <div flex-box="0">填充内容</div>
      <el-row flex-box="1" flex class="form-row admin-mt-10">
        <el-col flex-box="0" :span="isLeft" class="admin-position">
          <list ref="listLeft" :form="$data" @submit="pushRightGridList" />
        </el-col>
        <el-col flex-box="0" :span="1" class="admin-position center-container">
          <div class="move">
            <el-button :disabled="isLeftVisible" type="primary" @click="pushLeftGridList">
              <div class="el-icon-arrow-left" />
            </el-button>
            <div class="admin-clearfix" />
            <el-button :disabled="isRightVisible" type="primary" @click="pushRightGridList">
              <div class="el-icon-arrow-right" />
            </el-button>
          </div>
          <el-radio-group v-model="direction" size="mini">
            <el-radio-button label="left">左</el-radio-button>
            <el-radio-button label="middle">中</el-radio-button>
            <el-radio-button label="right">右</el-radio-button>
          </el-radio-group>
        </el-col>
        <el-col flex-box="0" :span="isRight" class="admin-position">
          <list-right ref="listRight" :form="$data" @submit="pushLeftGridList" />
        </el-col>
      </el-row>
      <!--<div flex-box="1" flex>
        <div flex-box="1" class="admin-mr-10 admin-position">
          <el-card shadow="hover">
            <list/>
          </el-card>
        </div>
        <div flex-box="0" class="admin-position center-container">
          <el-radio-group v-model="direction" size="mini">
            <el-radio-button label="left" >左</el-radio-button>
            <el-radio-button label="middle">中</el-radio-button>
            <el-radio-button label="right" >右</el-radio-button>
          </el-radio-group>
        </div>
        <div flex-box="1" class="admin-ml-10 admin-position">
          <el-card shadow="hover">
            <list-right/>
          </el-card>
        </div>
      </div>-->
    </div>
  </admin-container>
</template>

<script>
import elements from '@/mixins/elementsPermission'
import list from './list'
import listRight from './list-right'
import { includes, map } from 'lodash'

export default {
  name: 'TableTransfer',
  components: {
    list,
    listRight
  },
  mixins: [
    elements
  ],
  data() {
    return {
      loading: false,
      direction: 'middle',
      // 左边选中数据临时存储
      tempLeftSelectRow: [],
      // 左边填充数据
      selectLeftData: [],
      // 右边选中数据临时存储
      tempRightSelectRow: [],
      // 右边填充数据
      selectRightData: []
    }
  },
  computed: {
    isLeft() {
      return this.direction === 'middle' ? 12 : this.direction === 'left' ? 2 : 21
    },
    isRight() {
      return this.direction === 'middle' ? 11 : this.direction === 'right' ? 2 : 21
    },
    isLeftVisible() {
      return !(this.tempRightSelectRow.length > 0)
    },
    isRightVisible() {
      return !(this.tempLeftSelectRow.length > 0)
    }
  },
  mounted() {
    // this.$bus.emit('tree-form-right-list')
  },
  methods: {
    // 查询
    handleFilter() {
      this.$bus.emit('tree-form-list', this.treeId)
    },
    // 左边表格数据填充
    pushLeftGridList() {
      for (const i in this.tempRightSelectRow) {
        this.selectRightData.splice(this.selectRightData.findIndex(item => item.id === this.tempRightSelectRow[i].id), 1)
      }
      this.$refs.listLeft.getDataList()
    },
    // 右边表格数据填充
    pushRightGridList() {
      // 右边填充数据Id
      const rightId = map(this.selectRightData, 'id')
      for (const i in this.tempLeftSelectRow) {
        const item = this.tempLeftSelectRow[i]
        // 过滤重复数据
        if (!includes(rightId, item.id)) {
          // 添加一个字段
          this.$set(item, 'input', '测试')
          this.selectRightData.unshift(item)
        }
      }
      this.$refs.listLeft.getDataList()
    }
  }
}
</script>
