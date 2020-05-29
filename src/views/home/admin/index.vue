<template>
  <div class="home-editor-container">
    <panel-group @handleSetLineChartData="handleSetLineChartData" />

    <el-row>
      <el-col :span="24">
        <div class="lineChart">
          <line-chart :chart-data="lineChartData" />
        </div>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
        <div class="tab-wrapper">
          <div class="title">今日事务</div>
          <div class="body">
            <el-badge :value="temp.enterpriceNotVerifyNum" class="item">
              <el-button size="small" @click="go('user-verify')">企业审核</el-button>
            </el-badge>
            <el-badge :value="temp.disposeNotVerifyNum" class="item">
              <el-button size="small" @click="go('workbench-application', {status:0})">处置申请审核</el-button>
            </el-badge>
            <el-badge :value="temp.transferNotVerifyNum" class="item">
              <el-button size="small" @click="go('workbench-transfer', {status:0})">转移申请审核</el-button>
            </el-badge>
            <el-badge :value="temp.depositNotPayNum" class="item">
              <el-button size="small" @click="go('workbench-application', {status:6})">待付押金</el-button>
            </el-badge>
            <el-badge :value="temp.disposeNotPayPendNum" class="item">
              <el-button size="small" @click="go('workbench-transfer', {status:3})">待付处置预付款</el-button>
            </el-badge>
          </div>
        </div>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
        <div class="tab-wrapper">
          <div class="title">运营快捷入口</div>
          <div class="group">
            <label class="icon-wrapper" @click="go('user-enterprises')">
              <svg-icon icon-class="user_icon01" class-name="card-panel-icon" />
              <div class="text">企业与用户</div>
            </label>
            <label class="icon-wrapper" @click="go('workbench-application')">
              <svg-icon icon-class="todo_icon04" class-name="card-panel-icon" />
              <div class="text">处置申请工作台</div>
            </label>
            <label class="icon-wrapper" @click="go('workbench-transfer')">
              <svg-icon icon-class="todo_icon03" class-name="card-panel-icon" />
              <div class="text">转移申请工作台</div>
            </label>
            <label class="icon-wrapper" @click="go('finance-account')">
              <svg-icon icon-class="sidebar_icon02" class-name="card-panel-icon" />
              <div class="text">财务管理</div>
            </label>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <raddar-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <pie-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <bar-chart />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
import RaddarChart from './components/RaddarChart'
import PieChart from './components/PieChart'
import BarChart from './components/BarChart'

const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
}

export default {
  name: 'HomeAdmin',
  components: {
    PanelGroup,
    LineChart,
    RaddarChart,
    PieChart,
    BarChart
  },
  data() {
    return {
      lineChartData: lineChartData.newVisitis,
      temp: {
        // 企业审核统计
        enterpriceNotVerifyNum: 22,
        // 处置申请审核统计
        disposeNotVerifyNum: 3,
        // 转移申请审核统计
        transferNotVerifyNum: 323,
        // 代付押金申请统计
        depositNotPayNum: 2,
        // 待付处置预付款统计
        disposeNotPayPendNum: 66
      }
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      // 数据
      /* getHomePage()
        .then(response => {
          Object.assign(this.temp, response.data)
        }) */
    },
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    },
    // 跳转
    go(name, query) {
      if (name) {
        window.history.pushState({}, '', name)
        // this.$router.push({ 'name': name, 'query': query })
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.home-editor-container {
  min-height: 100%;
  .tab-wrapper {
    background: #FFF;
    margin-bottom:20px;
    border: 1px solid $color-border-2;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    .title {
      font-size: 14px;
      font-weight: 600;
      padding: 12px 15px;
      color: $color-text-normal;
      background-color: $color-bg-table-title;
      border-bottom: 1px solid $color-border-2;
    }
    .body {
      padding: 30px;
      overflow: hidden;
      .item {
        margin-right: 40px;
      }
    }
    .group {
      overflow: hidden;
      .icon-wrapper {
        float: left;
        font-size: 58px;
        padding: 35px 0;
        width: 180px;
        color: #666;
        text-align: center;
        cursor: pointer;
        border-left: 1px solid #FFF;
        border-right: 1px solid #FFF;
        .text {
          font-size: 14px;
          padding-top: 10px;
        }
        &:hover {
          background-color: rgba(0, 0, 0, .05);
          .text {
            color: #34bfa3;
          }
          border-left: 1px solid $color-border-2;
          border-right: 1px solid $color-border-2;
        }
      }
    }
  }
  .chart-wrapper {
    background: #FFF;
    padding: 16px 16px 0;
    margin-bottom: 32px;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
  }
  .lineChart {
    background:#FFF;
    padding:16px 16px 0;
    margin-bottom:20px;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
  }
}
</style>
