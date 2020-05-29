<template>
  <admin-container>
    <!-- header -->
    <template slot="header">Rate 评分</template>

    <!-- body -->
    <el-row :gutter="20">
      <!-- content -->
      <el-col :span="24">
        <!-- base -->
        <el-card shadow="always" class="admin-mb">
          <div slot="header" class="admin-clearfix">
            <span>基础用法</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-row class="mb-20">
                <div class="inline">
                  <el-tag>标签一</el-tag>
                  <el-tag type="success">标签二</el-tag>
                  <el-tag type="info">标签三</el-tag>
                  <el-tag type="warning">标签四</el-tag>
                  <el-tag type="danger">标签五</el-tag>
                </div>
              </el-row>
            </el-col>
            <el-col :span="12" class="second-col">
              <div>
                <admin-markdown :source="docBase" />
              </div>
              <div class="mt10">
                <!-- <admin-highlight :code="code.base"/> -->
              </div>
            </el-col>
          </el-row>
        </el-card>

        <!-- move -->
        <el-card shadow="always" class="admin-mb">
          <div slot="header" class="admin-clearfix">
            <span>可移除标签</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-row class="mb-20">
                <div class="inline">
                  <el-tag
                    v-for="tag in moveTags"
                    :key="tag.name"
                    closable
                    :type="tag.type"
                  >
                    {{ tag.name }}
                  </el-tag>
                </div>
              </el-row>
            </el-col>
            <el-col :span="12" class="second-col">
              <div>
                <admin-markdown :source="docMove" />
              </div>
              <div class="mt10">
                <admin-highlight :code="code.move" />
              </div>
            </el-col>
          </el-row>
        </el-card>

        <!-- edit -->
        <el-card shadow="always" class="admin-mb">
          <div slot="header" class="admin-clearfix">
            <span>可移除标签</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-row class="mb-20">
                <div class="inline">
                  <el-tag
                    v-for="tag in dynamicTags"
                    :key="tag"
                    closable
                    :disable-transitions="false"
                    @close="handleClose(tag)"
                  >
                    {{ tag }}
                  </el-tag>
                  <el-input
                    v-if="inputVisible"
                    ref="saveTagInput"
                    v-model="inputValue"
                    class="input-new-tag"
                    size="small"
                    @keyup.enter.native="handleInputConfirm"
                    @blur="handleInputConfirm"
                  />
                  <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
                </div>
              </el-row>
            </el-col>
            <el-col :span="12" class="second-col">
              <div>
                <admin-markdown :source="docDynamic" />
              </div>
              <div class="mt10">
                <admin-highlight :code="code.dynamic" />
              </div>
            </el-col>
          </el-row>
        </el-card>

      </el-col>
    </el-row>

    <!-- footer -->
    <template slot="footer">
      <admin-link-btn title="文档" link="https://element.eleme.cn/2.0/#/zh-CN/component/tag" />
    </template>
  </admin-container>
</template>

<script>
import doc from './doc.js'
import code from './code.js'

export default {
  name: 'DataTag',
  data() {
    return {
      ...doc,
      code,
      moveTags: [
        { name: '标签一', type: '' },
        { name: '标签二', type: 'success' },
        { name: '标签三', type: 'info' },
        { name: '标签四', type: 'warning' },
        { name: '标签五', type: 'danger' }
      ],
      dynamicTags: ['标签一', '标签二', '标签三'],
      inputValue: '',
      inputVisible: false
    }
  },
  methods: {
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
    },

    showInput() {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },

    handleInputConfirm() {
      const inputValue = this.inputValue
      if (inputValue) {
        this.dynamicTags.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .second-col {
    padding-left: 50px !important;
    border-left: 1px solid $color-border-1;
  }
  .mb-20 {
    margin-bottom: 30px;
  }
.admin-mb {
  /deep/ .table-border {
    td {
      padding: 20px;
    }
  }
}
.text {
  font-size: 14px;
}
.inline {
  font-size: 0;
  .el-tag--medium {
    margin-bottom: 10px;
    margin-right: 10px;
  }
}

.el-tag + .el-tag {
}
.button-new-tag {
  height: 28px;
  line-height: 28px;
  padding-top: 0;
  vertical-align: top;
}
.input-new-tag {
  width: 80px;
  margin-bottom: 10px;
  /deep/ .el-input__inner {
    line-height: 28px;
    height: 28px;
  }
}
</style>
