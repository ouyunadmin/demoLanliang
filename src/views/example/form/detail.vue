<template>
  <admin-container>
    <template slot="header">
      <div class="header-form-container" style="line-height: 20px; border-bottom: none;">
        <div class="state">
          <svg-icon style="font-size: 16px;" icon-class="order_icon" /> &nbsp;状态: {{ $route.query.billNo }}
          <el-input v-model="test" style="width: 100px;" placeholder="" />
          <el-button type="primary" style="float: right; margin-left: 10px;" size="mini" @click="handleOpen">订单跟踪</el-button>
          <el-button type="primary" style="float: right; margin-left: 10px;" plain size="mini" @click="add">复制新增</el-button>
          <el-button style="float: right;" plain size="mini">复制新增</el-button>
        </div>
      </div>
    </template>
    <div class="header-form-container">
      <table class="table-border boxTable">
        <tbody>
          <tr>
            <th>发货网点：</th>
            <td>{{ temp.consignBaseVo.sendStationName }}</td>
            <th>到货网点：</th>
            <td>{{ temp.consignBaseVo.receiveStationName }}</td>
            <th>制单日期：</th>
            <td>{{ temp.consignBaseVo.gmtOrder }}</td>
            <th>托运单号：</th>
            <td>{{ temp.consignBaseVo.consignNo }}</td>
          </tr>
          <tr>
            <th>货号：</th>
            <td>{{ temp.consignBaseVo.consignGoodsNo }}</td>
            <th>制单人：</th>
            <td colspan="5">{{ temp.consignBaseVo.createrName }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="bill-msg">
      <div class="tableTitle">运单信息</div>
      <div class="deliver-goods">
        <p>发货单位：<span>{{ temp.consignBaseVo.sender }}</span> 发货电话：<span>{{ temp.consignBaseVo.senderPhone }}</span></p>
        <p>发货地址：<span>{{ temp.consignBaseVo.sendRegionSpell }} {{ temp.consignBaseVo.sendDetailAddress }}</span></p>
      </div>
      <div class="line">
        <span />
        <span />
      </div>
      <div class="get-goods">
        <p>收货单位：<span>{{ temp.consignBaseVo.receiver }}</span> 收货电话：<span>{{ temp.consignBaseVo.receiverPhone }}</span></p>
        <p>收货地址：<span>{{ temp.consignBaseVo.receiveRegionSpell }} {{ temp.consignBaseVo.receiveDetailAddress }}</span>
        </p>
      </div>
    </div>
    <div class="goods-msg">
      <div class="tableTitle">货物信息</div>
      <table class="table-border center">
        <tr>
          <th>货物名称</th>
          <th>数量(件)</th>
          <th>重量(KG)</th>
          <th>体积(m³)</th>
          <th>货值单价(元)</th>
          <th>货品类型</th>
          <th>包装方式</th>
          <th>货品属性</th>
          <th>货品照片</th>
        </tr>
        <tr v-for="(item,index) in temp.consignGoodsInfoVoList" :key="index">
          <td>{{ item.goodsName }}</td>
          <td>{{ item.goodsAmount }}{{ item.goodsAmountUnit }}</td>
          <td>{{ item.goodsWeight }}{{ item.goodsWeightUnit }}</td>
          <td>{{ item.goodsVolume }}{{ item.goodsVolumeUnit }}</td>
          <td>{{ item.goodsPrice }} / {{ item.goodsPriceUnit }}</td>
          <td>{{ item.goodsType }}</td>
          <td>{{ item.packageMethods }}</td>
          <td>{{ item.goodsAttribute }}</td>
          <td><img v-if="item.goodsImage" :src="item.goodsImage" style="width: 36px;height: 36px;margin-top: 1px; cursor: pointer;" @click="clickImg($event)"></td>
        </tr>
        <!-- <tr>
          <td style="background: #edf2f8;">合计</td>
          <td>{{static.totalAmount}}</td>
          <td>{{static.totalWeight}}</td>
          <td>{{static.totalVolume}}</td>
          <td>合计：{{static.totalPrice}}</td>
          <td colspan="4" />
        </tr> -->
      </table>
    </div>
    <div class="distribution-msg">
      <div class="tableTitle">配送信息</div>
      <table class="table-border">
        <tbody>
          <tr>
            <th>提货方式:</th>
            <td>{{ temp.consignBaseVo.takeGoodsMethod }}</td>
            <th>配送方式:</th>
            <td>{{ temp.consignBaseVo.receiveGoodsMethod }}</td>
            <th>回单要求:</th>
            <td>{{ temp.consignBaseVo.receiptRequire }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="cost-msg">
      <div class="tableTitle">费用信息</div>
      <table class="table-border center">
        <tr>
          <th>运费</th>
          <th>信息费</th>
          <th>垫资运费</th>
          <th>保价费</th>
          <th>代收货费</th>
          <th>代收运费</th>
          <th>垫货费</th>
          <th>提货费</th>
          <th>送货费</th>
          <th>其他费用</th>
          <th>装卸费</th>
          <th>包装费</th>
          <th>上楼费</th>
        </tr>
        <tr>
          <td>{{ temp.consignBaseVo.transportFee }}</td>
          <td>{{ temp.consignBaseVo.infoFee }} / {{ temp.consignBaseVo.infoFeeStatus === 1 ? '已付' : '未付' }}</td>
          <td>{{ temp.consignBaseVo.spotTransportFee }}</td>
          <td>{{ temp.consignBaseVo.supportValueFee }}</td>
          <td>{{ temp.consignBaseVo.collectionGoodsFee }}</td>
          <td>{{ temp.consignBaseVo.collectionTransportFee }}</td>
          <td>{{ temp.consignBaseVo.spotGoodsFee }}</td>
          <td>{{ temp.consignBaseVo.takeGoodsFee }}</td>
          <td>{{ temp.consignBaseVo.sendGoodsFee }}</td>
          <td>{{ temp.consignBaseVo.otherFee }}</td>
          <td>{{ temp.consignBaseVo.handlingFee }}</td>
          <td>{{ temp.consignBaseVo.packingFee }}</td>
          <td>{{ temp.consignBaseVo.upstairsFee }}</td>
        </tr>
      </table>
    </div>
    <div class="settle-msg">
      <div class="tableTitle">结算信息</div>
      <table class="table-border center red">
        <tr>
          <th>费用合计</th>
          <th>付款方式</th>
          <th>现付</th>
          <th>到付</th>
          <th>回单付</th>
          <th>月结</th>
          <th>欠付</th>
        </tr>
        <tr>
          <td>{{ temp.consignBaseVo.totalFee }}</td>
          <td>{{ temp.consignBaseVo.payType }}</td>
          <td>{{ temp.consignBaseVo.cashPay }}</td>
          <td>{{ temp.consignBaseVo.collectPay }}</td>
          <td>{{ temp.consignBaseVo.receiptPay }}</td>
          <td>{{ temp.consignBaseVo.monthPay }}</td>
          <td>{{ temp.consignBaseVo.arrearagePay }}</td>
        </tr>
      </table>
    </div>
    <div class="remark">
      <div class="tableTitle">备注</div>
      <div class="el-form-item-checkbox">
        <el-checkbox-group v-model="checkedBox">
          <el-checkbox v-for="o in boxList" :key="o" :label="o" :disabled="true" />
        </el-checkbox-group>
      </div>
      <div class="el-form-item-control">
        <el-input
          v-model="temp.consignBaseVo.remark"
          type="textarea"
          resize="none"
          :rows="3"
          :disabled="true"
          style="margin-top: 15px;"
        />
      </div>
    </div>
    <template slot="footer">
      <div>底部</div>
    </template>
    <admin-dialog
      title="订单跟踪"
      width="500px"
      :visible="dialogVisible"
      :handle-drag="handleDrag"
      :cancel="handleClose"
    >
      <div>
        <el-select ref="select" v-model="value" placeholder="请选择">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <el-steps direction="vertical" :active="stepsList.length" :space="90">
          <el-step v-for="(item,index) in stepsList" :key="index" :title="item.optName">
            <template slot="description">
              <p style="color: #000">{{ item.remark }} </p>
              <p style="color: #999">{{ item.gmtCreate }}</p>
            </template>
          </el-step>
        </el-steps>
      </div>
    </admin-dialog>
    <big-img v-if="showImg" :img-src="imgSrc" @clickit="viewImg" />
  </admin-container>
</template>

<script>
export default {
  name: 'FormDetail',
  data() {
    return {
      value: '',
      options: [
        { value: '选项1', label: '黄金糕' },
        { value: '选项2', label: '双皮奶' },
        { value: '选项3', label: '蚵仔煎' },
        { value: '选项4', label: '龙须面' }
      ],
      showImg: false,
      temp: {
        consignBaseVo: {},
        consignGoodsInfoVoList: []
      },
      checkedBox: [],
      test: '',
      boxList: ['易碎', '防潮', '防火', '轻放'],
      static: {
        totalAmount: 0,
        totalWeight: 0,
        totalVolume: 0,
        totalPrice: 0
      },
      // 对应单据列表
      orderList: {
        singleSign: [],
        separate: [],
        stowage: [],
        deliver: [],
        takeGoods: [],
        receipt: [],
        outsourced: []
      },
      // 订单步骤调
      stepsList: [],
      dialogVisible: false
    }
  },
  computed: {
    tableWidth() {
      const bill = this.orderList
      const width = 16.6
      var len = 0
      if (bill.takeGoods.length) {
        len += width
      }
      if (bill.separate.length) {
        len += width
      }
      if (bill.stowage.length) {
        len += width
      }
      if (bill.deliver.length) {
        len += width
      }
      if (bill.singleSign.length) {
        len += width
      }
      if (bill.outsourced.length) {
        len += width
      }
      return len
    }
  },
  created() {
    console.log(this.$route.query.id)
    this.getDetail()
  },
  methods: {
    handleDrag() {
      this.$refs.select.blur()
    },
    // 图片
    clickImg(e) {
      this.showImg = true
      this.imgSrc = e.currentTarget.src
    },
    viewImg() {
      this.showImg = false
      this.imgSrc = ''
    },
    // 运单复制并新增
    add() {
    },
    handleClose() {
      this.dialogVisible = false
    },
    handleOpen() {
      this.dialogVisible = true
    },
    getDetail() {
      // 获取运单详情
      this.staticTotal()
    },
    // 统计货物信息
    staticTotal() {
      const statistics = {
        goodsAmount: 0,
        goodsWeight: 0,
        goodsVolume: 0,
        goodsPrice: 0
      }
      for (const i in this.temp.consignGoodsInfoVoList) {
        statistics.goodsAmount = (parseFloat(statistics.goodsAmount) + parseFloat(this.temp.consignGoodsInfoVoList[i].goodsAmount ? this.temp.consignGoodsInfoVoList[i].goodsAmount : 0)).toFixed(0)
        statistics.goodsWeight = (parseFloat(statistics.goodsWeight) + parseFloat(this.temp.consignGoodsInfoVoList[i].goodsWeight ? this.temp.consignGoodsInfoVoList[i].goodsWeight : 0)).toFixed(2)
        statistics.goodsVolume = (parseFloat(statistics.goodsVolume) + parseFloat(this.temp.consignGoodsInfoVoList[i].goodsVolume ? this.temp.consignGoodsInfoVoList[i].goodsVolume : 0)).toFixed(2)
        switch (this.temp.consignGoodsInfoVoList[i].goodsPriceUnit) {
          case '件':
            statistics.goodsPrice = (parseFloat(statistics.goodsPrice) + parseFloat(this.temp.consignGoodsInfoVoList[i].goodsPrice ? this.temp.consignGoodsInfoVoList[i].goodsPrice : 0) * parseFloat(this.temp.consignGoodsInfoVoList[i].goodsAmount ? this.temp.consignGoodsInfoVoList[i].goodsAmount : 0)).toFixed(2)
            break
          case '公斤':
            statistics.goodsPrice = (parseFloat(statistics.goodsPrice) + parseFloat(this.temp.consignGoodsInfoVoList[i].goodsPrice ? this.temp.consignGoodsInfoVoList[i].goodsPrice : 0) * parseFloat(this.temp.consignGoodsInfoVoList[i].goodsWeight ? this.temp.consignGoodsInfoVoList[i].goodsWeight : 0)).toFixed(2)
            break
          case '立方':
            statistics.goodsPrice = (parseFloat(statistics.goodsPrice) + parseFloat(this.temp.consignGoodsInfoVoList[i].goodsPrice ? this.temp.consignGoodsInfoVoList[i].goodsPrice : 0) * parseFloat(this.temp.consignGoodsInfoVoList[i].goodsVolume ? this.temp.consignGoodsInfoVoList[i].goodsVolume : 0)).toFixed(2)
            break
        }
      }
      this.static.totalAmount = statistics.goodsAmount
      this.static.totalWeight = statistics.goodsWeight
      this.static.totalVolume = statistics.goodsVolume
      this.static.totalPrice = statistics.goodsPrice
    },
    // 跳转到详情页面
    goViewDetail(name, query) {
      // 组件名
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .content {
    padding-bottom: 50px;
  }

  .header-form-container {
    overflow: hidden;
    /*padding: 12px 16px;*/
  }

  .header-form-container .state {
    color: #ff5370;
    font-size: 14px;
    line-height: 28px;
    font-weight: 700;
  }
  .sendTable {
    margin-top: 16px;
    margin-bottom: 80px;
    th {
      width: 140px;
    }
  }

  .boxTable {
    /*border-color: #f5f7fb;*/
    font-size: 14px;
    th {
      text-align: right;
      font-weight: 500;
      background-color: #f5f7fb;
      width: 140px;
    }
    th, td {
      /*border-color: #f5f7fb;*/
    }
    td {
      padding-right: 44px;
      color: #606266;
    }
  }
  .signTable {
    td {
      width: 198px;
    }
    th {
      padding-left: 15px;
      width: 110px;
      text-align: left;
    }
  }
  .center {
    td {
      text-align: center;
    }
  }

  .red {
    tr td:first-of-type {
      color: #ff5370;
      font-weight: 600;
      font-size: 15px;
    }
  }

  .bill-msg {
    font-size: 14px;
    position: relative;
    .deliver-goods, .get-goods {
      border: 1px solid #e4e7ed;
      padding: 10px 35px;
      p {
        line-height: 20px;
        span {
          margin-right: 33px;
          color: #606266;
        }
      }
    }
    .deliver-goods {
      margin-bottom: 6px;
    }
    .line {
      width: 1px;
      height: 100px;
      border-left: 1px solid #e4e7ed;
      position: absolute;
      left: 15px;
      top: 75px;
      span {
        display: inline-block;
        width: 7px;
        height: 7px;
        background: #1a91ec;
        border-radius: 50%;
        position: absolute;
        left: -4px;
      }
      span:last-of-type {
        top: 100px;
        background: #ff5887;
      }
    }
  }

  .distribution-msg {
    td {
      color: #909399;
    }
  }
  .order-no {
    color: #0a8bef;cursor: pointer;text-align: center;
  }
  .amountTable {
    td {
      padding: 6px 0;
    }
  }
</style>
