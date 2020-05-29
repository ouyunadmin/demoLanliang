<template>
  <admin-container>
    <!-- header -->
    <template slot="header">Carousel 走马灯</template>

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
                <div class="block">
                  <span class="demonstration">默认 Hover 指示器触发</span>
                  <el-carousel height="150px">
                    <el-carousel-item v-for="item in 4" :key="item">
                      <h3 class="small">{{ item }}</h3>
                    </el-carousel-item>
                  </el-carousel>
                </div>
              </el-row>
              <el-row class="mb-20">
                <div class="block">
                  <span class="demonstration">Click 指示器触发</span>
                  <el-carousel trigger="click" height="150px">
                    <el-carousel-item v-for="item in 4" :key="item">
                      <h3 class="small">{{ item }}</h3>
                    </el-carousel-item>
                  </el-carousel>
                </div>
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

        <!-- indicator -->
        <el-card shadow="always" class="admin-mb">
          <div slot="header" class="admin-clearfix">
            <span>指示器</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-row class="mb-20">
                <span class="demonstration">可以将指示器的显示位置设置在容器外部</span>
                <el-carousel indicator-position="outside" height="200px">
                  <el-carousel-item v-for="item in 4" :key="item">
                    <h3>{{ item }}</h3>
                  </el-carousel-item>
                </el-carousel>
              </el-row>
            </el-col>
            <el-col :span="12" class="second-col">
              <div>
                <admin-markdown :source="docIndicator" />
              </div>
              <div class="mt10">
                <admin-highlight :code="code.indicator" />
              </div>
            </el-col>
          </el-row>
        </el-card>

        <!-- arrow -->
        <el-card shadow="always" class="admin-mb">
          <div slot="header" class="admin-clearfix">
            <span>切换箭头</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-row class="mb-20">
                <span class="demonstration">可以设置切换箭头的显示时机</span>
                <el-carousel :interval="5000" arrow="always" height="200px">
                  <el-carousel-item v-for="item in 4" :key="item">
                    <h3>{{ item }}</h3>
                  </el-carousel-item>
                </el-carousel>
              </el-row>
            </el-col>
            <el-col :span="12" class="second-col">
              <div>
                <admin-markdown :source="docArrow" />
              </div>
              <div class="mt10">
                <admin-highlight :code="code.arrow" />
              </div>
            </el-col>
          </el-row>
        </el-card>

        <!-- card -->
        <el-card shadow="always" class="admin-mb">
          <div slot="header" class="admin-clearfix">
            <span>卡片化</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-row class="mb-20">
                <span class="demonstration">当页面宽度方向空间空余，但高度方向空间匮乏时，可使用卡片风格</span>
                <el-carousel :interval="4000" type="card" height="200px">
                  <el-carousel-item v-for="item in 6" :key="item">
                    <h3 class="medium">{{ item }}</h3>
                  </el-carousel-item>
                </el-carousel>
              </el-row>
            </el-col>
            <el-col :span="12" class="second-col">
              <div>
                <admin-markdown :source="docCard" />
              </div>
              <div class="mt10">
                <admin-highlight :code="code.card" />
              </div>
            </el-col>
          </el-row>
        </el-card>

        <!-- direction -->
        <el-card shadow="always" class="admin-mb">
          <div slot="header" class="admin-clearfix">
            <span>方向</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-row class="mb-20">
                <span class="demonstration">设置不同方向</span>
                <el-carousel height="200px" direction="vertical" :autoplay="false">
                  <el-carousel-item v-for="item in 3" :key="item">
                    <h3 class="medium">{{ item }}</h3>
                  </el-carousel-item>
                </el-carousel>
              </el-row>
            </el-col>
            <el-col :span="12" class="second-col">
              <div>
                <admin-markdown :source="docDirection" />
              </div>
              <div class="mt10">
                <admin-highlight :code="code.direction" />
              </div>
            </el-col>
          </el-row>
        </el-card>

      </el-col>
    </el-row>

    <!-- footer -->
    <template slot="footer">
      <admin-link-btn title="文档" link="https://element.eleme.cn/2.0/#/zh-CN/component/carousel" />
    </template>
  </admin-container>
</template>

<script>
import doc from './doc.js'
import code from './code.js'

export default {
  name: 'DataCarousel',
  data() {
    return {
      ...doc,
      code
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
.el-carousel__item h3 {
  color: #fff;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  text-align: center;
  margin: 0;
  &.small {
    line-height: 150px;
  }
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}

.demonstration {
  display: block;
  color: #8492a6;
  font-size: 14px;
  margin-bottom: 20px;
}

</style>
