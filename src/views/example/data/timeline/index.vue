<template>
  <admin-container>
    <!-- header -->
    <template slot="header">Timeline 时间线</template>

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
                <div class="demonstration">
                  排序：
                  <el-radio-group v-model="reverseBase">
                    <el-radio :label="true">倒序</el-radio>
                    <el-radio :label="false">正序</el-radio>
                  </el-radio-group>
                </div>

                <el-timeline :reverse="reverseBase">
                  <el-timeline-item
                    v-for="(activity, index) in activitiesBase"
                    :key="index"
                    :timestamp="activity.timestamp"
                  >
                    {{ activity.content }}
                  </el-timeline-item>
                </el-timeline>
              </el-row>
            </el-col>
            <el-col :span="12" class="second-col">
              <div>
                <admin-markdown :source="docBase" />
              </div>
              <div class="mt10">
                <admin-highlight :code="code.base" />
              </div>
            </el-col>
          </el-row>
        </el-card>

        <!-- customize -->
        <el-card shadow="always" class="admin-mb">
          <div slot="header" class="admin-clearfix">
            <span>⾃定义节点样式</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-row class="mb-20">
                <el-timeline>
                  <el-timeline-item
                    v-for="(activity, index) in activitiesCustomize"
                    :key="index"
                    :icon="activity.icon"
                    :type="activity.type"
                    :color="activity.color"
                    :size="activity.size"
                    :timestamp="activity.timestamp"
                  >
                    {{ activity.content }}
                  </el-timeline-item>
                </el-timeline>
              </el-row>
            </el-col>
            <el-col :span="12" class="second-col">
              <div>
                <admin-markdown :source="docCustomize" />
              </div>
              <div class="mt10">
                <admin-highlight :code="code.customize" />
              </div>
            </el-col>
          </el-row>
        </el-card>

        <!-- time -->
        <el-card shadow="always" class="admin-mb">
          <div slot="header" class="admin-clearfix">
            <span>⾃定义时间戳</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-row class="mb-20">
                <el-timeline>
                  <el-timeline-item timestamp="2018/4/12" placement="top">
                    <el-card>
                      <h4>更新 Github 模板</h4>
                      <p>王小虎 提交于 2018/4/12 20:46</p>
                    </el-card>
                  </el-timeline-item>
                  <el-timeline-item timestamp="2018/4/3" placement="top">
                    <el-card>
                      <h4>更新 Github 模板</h4>
                      <p>王小虎 提交于 2018/4/3 20:46</p>
                    </el-card>
                  </el-timeline-item>
                  <el-timeline-item timestamp="2018/4/2" placement="top">
                    <el-card>
                      <h4>更新 Github 模板</h4>
                      <p>王小虎 提交于 2018/4/2 20:46</p>
                    </el-card>
                  </el-timeline-item>
                </el-timeline>
              </el-row>
            </el-col>
            <el-col :span="12" class="second-col">
              <div>
                <admin-markdown :source="docTime" />
              </div>
              <div class="mt10">
                <admin-highlight :code="code.time" />
              </div>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>

    <!-- footer -->
    <template slot="footer">
      <admin-link-btn title="文档" link="https://element.eleme.cn/2.0/#/zh-CN/component/timeline" />
    </template>
  </admin-container>
</template>

<script>
import doc from './doc.js'
import code from './code.js'

export default {
  name: 'DataTimeline',
  data() {
    return {
      ...doc,
      code,
      reverseBase: true,
      activitiesBase: [{
        content: '活动按期开始',
        timestamp: '2018-04-15'
      }, {
        content: '通过审核',
        timestamp: '2018-04-13'
      }, {
        content: '创建成功',
        timestamp: '2018-04-11'
      }],
      activitiesCustomize: [{
        content: '支持使用图标',
        timestamp: '2018-04-12 20:46',
        size: 'large',
        type: 'primary',
        icon: 'el-icon-more'
      }, {
        content: '支持自定义颜色',
        timestamp: '2018-04-03 20:46',
        color: '#0bbd87'
      }, {
        content: '支持自定义尺寸',
        timestamp: '2018-04-03 20:46',
        size: 'large'
      }, {
        content: '默认样式的节点',
        timestamp: '2018-04-03 20:46'
      }]
    }
  },
  methods: {
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

.demonstration {
  display: block;
  color: #8492a6;
  font-size: 14px;
  margin-bottom: 20px;
}

</style>
