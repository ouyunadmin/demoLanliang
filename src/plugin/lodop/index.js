import store from '@/store'
import { MessageBox } from 'element-ui'
var CreatedOKLodop7766 = null

// ====判断是否需要安装CLodop云打印服务器:====
function needCLodop() {
  try {
    var ua = navigator.userAgent
    if (ua.match(/Windows\sPhone/i) != null) return true
    if (ua.match(/iPhone|iPod/i) != null) return true
    if (ua.match(/Android/i) != null) return true
    if (ua.match(/Edge\D?\d+/i) != null) return true
    var verTrident = ua.match(/Trident\D?\d+/i)
    var verIE = ua.match(/MSIE\D?\d+/i)
    var verOPR = ua.match(/OPR\D?\d+/i)
    var verFF = ua.match(/Firefox\D?\d+/i)
    var x64 = ua.match(/x64/i)
    if ((verTrident === null) && (verIE === null) && (x64 !== null)) {
      return true
    } else if (verFF !== null) {
      verFF = verFF[0].match(/\d+/)
      if ((verFF[0] >= 41) || (x64 !== null)) {
        return true
      }
    } else if (verOPR !== null) {
      verOPR = verOPR[0].match(/\d+/)
      if (verOPR[0] >= 32) {
        return true
      }
    } else if ((verTrident === null) && (verIE === null)) {
      var verChrome = ua.match(/Chrome\D?\d+/i)
      if (verChrome !== null) {
        verChrome = verChrome[0].match(/\d+/)
        if (verChrome[0] >= 41) {
          return true
        }
      }
    }
    return false
  } catch (err) {
    return true
  }
}
/* export function needCLodop(){
  try{
    var ua=navigator.userAgent
    if (ua.match(/Windows\sPhone/i) !=null) return true
    if (ua.match(/iPhone|iPod/i) != null) return true
    if (ua.match(/Android/i) != null) return true
    if (ua.match(/Edge\D?\d+/i) != null) return true
    var verTrident=ua.match(/Trident\D?\d+/i)
    var verIE=ua.match(/MSIE\D?\d+/i)
    var verOPR=ua.match(/OPR\D?\d+/i)
    var verFF=ua.match(/Firefox\D?\d+/i)
    var x64=ua.match(/x64/i)
    console.log(ua)
    console.log(verTrident)
    console.log(verIE)
    console.log(x64)
    if ((verTrident == null) && (verIE == null) && (x64 !== null)) {
      return true
    } else if ( verFF !== null) {
      verFF = verFF[0].match(/\d+/)
      if ((verFF[0] >= 41) || (x64 !== null)) return true
    } else if ( verOPR !== null) {
      verOPR = verOPR[0].match(/\d+/)
      if ( verOPR[0] >= 32 ) return true
    } else if ((verTrident == null) && (verIE == null)) {
      var verChrome=ua.match(/Chrome\D?\d+/i)
      if ( verChrome !== null ) {
        verChrome = verChrome[0].match(/\d+/)
        if (verChrome[0] >= 41) return true
      }
    }
    return false
  } catch(err) {
    return true
  }
} */

if (needCLodop()) {
  var head = document.head || document.getElementsByTagName('head')[0] || document.documentElement
  var oscript = document.createElement('script')
  // oscript.src = 'https://localhost:8443/CLodopfuncs.js?priority=1'
  oscript.src = 'http://localhost:8000/CLodopfuncs.js?priority=1'
  head.insertBefore(oscript, head.firstChild)
  // 引用双端口(8000和18000）避免其中某个被占用：
  // oscript = document.createElement('script')
  // oscript.src = 'http://localhost:18000/CLodopfuncs.js?priority=0'
  // head.insertBefore(oscript, head.firstChild)
}

function lodopError() {
  MessageBox.alert("CLodop云打印服务未安装！点击这里<a href='./static/CLodop_Setup_for_Win32NT.exe' target='_self' style='color:#f1595d'>执行安装</a>，安装后请刷新页面。", '提示', {
    dangerouslyUseHTMLString: true,
    closeOnClickModal: true,
    closeOnPressEscape: true,
    type: 'error',
    confirmButtonText: '知道了',
    callback: action => {
    }
  })
}

// ====获取LODOP对象的主过程：====
export function getLodop(oOBJECT, oEMBED) {
  var LODOP
  try {
    var isIE = (navigator.userAgent.indexOf('MSIE') >= 0) || (navigator.userAgent.indexOf('Trident') >= 0)
    if (needCLodop()) {
      try {
        LODOP = getCLodop()
      } catch (err) {
        // console.log(err)
      }
      if (!LODOP && document.readyState !== 'complete') {
        alert('C-Lodop没准备好，请稍后再试！')
        return
      }
      if (!LODOP) {
        lodopError()
        return
      } else {
        if (LODOP.CVERSION < '3.0.2.9') {
          lodopError()
        }
        if (oEMBED && oEMBED.parentNode) oEMBED.parentNode.removeChild(oEMBED)
        if (oOBJECT && oOBJECT.parentNode) oOBJECT.parentNode.removeChild(oOBJECT)
      }
    } else {
      // var is64IE  = isIE && (navigator.userAgent.indexOf('x64') >= 0)
      // =====如果页面有Lodop就直接使用，没有则新建:==========
      if (oOBJECT !== undefined || oEMBED !== undefined) {
        if (isIE) {
          LODOP = oOBJECT
        } else {
          LODOP = oEMBED
        }
      } else if (CreatedOKLodop7766 === null) {
        LODOP = document.createElement('object')
        LODOP.setAttribute('width', 0)
        LODOP.setAttribute('height', 0)
        LODOP.setAttribute('style', 'position:absolute;left:0px;top:-100px;width:0px;height:0px;')
        if (isIE) LODOP.setAttribute('classid', 'clsid:2105C259-1E0C-4534-8141-A753534CB4CA')
        else LODOP.setAttribute('type', 'application/x-print-lodop')
        document.documentElement.appendChild(LODOP)
        CreatedOKLodop7766 = LODOP
      } else {
        LODOP = CreatedOKLodop7766
      }
      // =====Lodop插件未安装时提示下载地址:==========
      if ((LODOP === null) || (typeof (LODOP.VERSION) === 'undefined')) {
        lodopError()
        return LODOP
      }
    }
    if (LODOP.VERSION < '6.2.2.1') {
      lodopError()
      return LODOP
    }
    // ===如下空白位置适合调用统一功能(如注册语句、语言选择等):===
    LODOP.SET_LICENSES('', '13528A153BAEE3A0254B9507DCDE2839', '', '')
    // ===========================================================
    return LODOP
  } catch (err) {
    lodopError()
  }
}

// 托运单打印
export function setPint(open, arr, type) {
  try {
    var LODOP = getLodop()
    LODOP.PRINT_INIT('托运单打印')
    if (parseInt(arr.direction) === 1) {
      LODOP.SET_PRINT_PAGESIZE(1, arr.paperWidth + 'cm', arr.paperHide + 'cm', '')
    } else {
      LODOP.SET_PRINT_PAGESIZE(2, arr.paperHide + 'cm', arr.paperWidth + 'cm', '')
    }
    var para = document.createElement('body')
    // 打印区域
    var pintDiv = document.createElement('div')
    pintDiv.style.cssText = 'border: solid 0px black; width: ' + (arr.paperWidth - arr.paperOffset * 2 - arr.leftMargin) + 'cm; height: ' + (arr.paperHide - arr.paperOffset * 2 - arr.topMargin) + 'cm; overflow: hidden;'
    // 打印内容
    const pintList = JSON.parse(JSON.stringify(arr.printContentList))
    for (const i in pintList) {
      var childrenDiv = document.createElement('div')
      childrenDiv.innerText = type === 1 ? pintList[i].title.replace(/{/g, '').replace(/}/g, '') : pintList[i].titleValue
      childrenDiv.style.cssText = 'position: absolute;width: ' + pintList[i].w + 'px;height: ' + (pintList[i].h + 80) + 'px;left: ' + pintList[i].x + 'px;top: ' + pintList[i].y + 'px;font-size: ' + pintList[i].fontSize + ';font-family: ' + pintList[i].typeface + ';text-align: ' + (pintList[i].center ? 'center' : 'left') + ';font-weight: ' + (pintList[i].bold ? '700' : 'normal') + ';'
      pintDiv.appendChild(childrenDiv)
      // LODOP.ADD_PRINT_HTM(pintList[i].y, pintList[i].x, pintList[i].w, (pintList[i].h + 80), '<div style=\"font-size: ' + pintList[i].fontSize + ';font-family: ' + pintList[i].typeface + ';text-align: ' + (pintList[i].center ? 'center' : 'left') + ';font-weight: ' + (pintList[i].bold ? '700' : 'normal') + ';\">' + pintList[i].title.replace(/{/g, '').replace(/}/g, '') + '</div>')
      // LODOP.SET_PRINT_STYLEA((2 + parseInt(i)), 'FontSize', parseInt(pintList[i].fontSize))
    }
    para.appendChild(pintDiv)
    const strHTML = '<body style="margin:0;">' + para.innerHTML + '</body>'
    if (arr.orderBg) {
      LODOP.ADD_PRINT_SETUP_BKIMG('<img border="0" src="' + arr.orderBg + '" style="width: ' + (arr.paperWidth - arr.paperOffset * 2 - arr.leftMargin) + 'cm; height: ' + (arr.paperHide - arr.paperOffset * 2 - arr.topMargin) + 'cm; position: absolute; left: ' + (arr.leftMargin) + 'cm; top: ' + (arr.topMargin) + 'cm;">')
      LODOP.SET_SHOW_MODE('BKIMG_PRINT', 1) // 打印(和预览)时包含背景图
      LODOP.ADD_PRINT_HTM(arr.topMargin + 'cm', arr.leftMargin + 'cm', 'RightMargin: 0cm', 'BottomMargin: 0cm', strHTML)
    } else {
      LODOP.ADD_PRINT_SETUP_BKIMG('<img border="0" src="' + arr.bgUrl + '" style="width: ' + arr.paperWidth + 'cm; height: ' + arr.paperHide + 'cm; position: absolute; left: -' + (arr.paperOffset + arr.leftMargin) + 'cm; top: -' + (arr.paperOffset + arr.topMargin) + 'cm;">')
      LODOP.SET_SHOW_MODE('BKIMG_IN_PREVIEW', 1)
      LODOP.ADD_PRINT_HTM('0cm', '0cm', 'RightMargin: 0cm', 'BottomMargin: 0cm', strHTML)
    }
    // LODOP.SET_SHOW_MODE('PREVIEW_IN_BROWSE', true)
    LODOP.SET_SHOW_MODE('HIDE_PAPER_BOARD', true)
    // LODOP.SET_PRINT_MODE('POS_BASEON_PAPER', true) // 设置以纸张边缘为基点
    LODOP.SET_PRINT_MODE('TRYLINKPRINTER_NOALERT', true)
    if (arr.operatorPrinterName) LODOP.SET_PRINTER_INDEX(arr.operatorPrinterName)
    if (open) {
      LODOP.PRINT() // 打印
    } else {
      LODOP.PREVIEW() // 预览
    }
  } catch (err) {
    // console.log(err)
  }
}

// 配载单打印
export function stowagePint(open, arr) {
  try {
    var LODOP = getLodop()
    LODOP.PRINT_INIT('配载单打印')
    LODOP.SET_PRINT_PAGESIZE(2, '', '', '') // intOrient, PageWidth,PageHeight,strPageName 单位 mm
    var para = document.createElement('body')
    // 打印区域
    var pintDiv = document.createElement('div')
    pintDiv.style.cssText = 'border: solid 0px black; width: 28.3cm; overflow: hidden; margin: 10px 0 20px 10px;'
    // 打印内容
    // const pintList = JSON.parse(JSON.stringify(arr.printContentList))
    // 订单号 公司名称

    var list = arr.consignBaseVoList
    var listStr = ''
    var collectionGoodsFeeSum = 0 // 代收货款总和
    var shouldOutAmountSum = 0 // 件数总和
    var totalFeeSum = 0 // 总运输费用
    var actualCostSum = 0 // 实际费用总和
    var cashPaySum = 0 // 现付总和
    var collectPaySum = 0 // 到付总和
    // var receiptPaySum = 0 // 回单付总和
    var monthPaySum = 0 // 月付总和
    // var arrearagePaySum = 0 // 欠付总和
    var sendGoodsFeeSum = 0 // 送货费总和
    for (var i = 0; i < list.length; i++) {
      collectionGoodsFeeSum += parseFloat(list[i].collectionGoodsFee || '0')
      shouldOutAmountSum += parseFloat(list[i].shouldOutAmount || '0')
      totalFeeSum += parseFloat(list[i].totalFee || '0')
      actualCostSum += parseFloat(list[i].actualCost || '0')
      cashPaySum += parseFloat((list[i].cashPay || '0'))
      collectPaySum += parseFloat((list[i].collectPay || '0'))
      // receiptPaySum += parseFloat((list[i].receiptPay || '0'))
      monthPaySum += parseFloat((list[i].monthPay || '0'))
      // arrearagePaySum += parseFloat((list[i].arrearagePay || '0'))
      sendGoodsFeeSum += parseFloat((list[i].sendGoodsFee || '0'))
      listStr += '<tr style="border-color: #b4b4b4;"><td style="padding: 5px 0;">' + (i + 1) + '</td><td>' + list[i].sender + '</td><td>' + list[i].receiver + '</td><td>' + list[i].receiveStationName + '</td><td>' + list[i].receiverPhone + '</td><td>' + list[i].goodNames + '</td><td>' + (list[i].shouldOutAmount || '') + '</td><td>' + (list[i].cashPay || '') + '</td><td>' + (list[i].collectPay || '') + '</td><td>' + (list[i].monthPay || '') + '</td><td>' + (list[i].collectionGoodsFee || '') + '</td><td>' + (list[i].actualCost || '') + '</td><td>' + (list[i].sendGoodsFee || '') + '</td><td>' + list[i].receiveDetailAddress + '</td><td>' + list[i].receiveGoodsMethod + '</td><td>' + list[i].receiptRequireNum + '</td><td>' + list[i].remark + '</td></tr>'
    }

    var childrenDiv1 = document.createElement('div')
    childrenDiv1.innerHTML = '<span style="position: absolute; left: 30px; top: 15px;">NO:' + arr.stowageNo + '</span><span style="font-size: 25px">' + arr.parentOrg + '</span>'
    childrenDiv1.style.cssText = 'width: 100%; text-align: center; position: relative; padding-top: 10px; font-size: 15px;'
    pintDiv.appendChild(childrenDiv1)

    var childrenDiv3 = document.createElement('table')
    childrenDiv3.innerHTML = '<tr style="border-color: #b4b4b4;"><th style="padding: 5px 0;">运行区间</th><th>司机</th><th>车牌号</th><th>司机电话</th><th>时间</th><th>总运输费用</th></tr><tbody style="text-align: center;"><tr style="border-color: #b4b4b4;"><td style="padding: 5px 0;">' + arr.rollOutStationName + '—' + arr.rollInStationName + '</td><td>' + arr.driverName + '</td><td>' + arr.trunkNo + '</td><td>' + arr.driverPhone + '</td><td>' + arr.gmtCreate.substring(0, 10) + '</td><td>' + totalFeeSum + '</td></tr></tbody>'
    childrenDiv3.style.cssText = 'width: 100%; border-collapse:collapse; margin-top: 20px; font-size: 15px;'
    childrenDiv3.border = '1'
    pintDiv.appendChild(childrenDiv3)

    var childrenDiv4 = document.createElement('table')
    childrenDiv4.innerHTML = '<tr style="border-color: #b4b4b4;"><th style="padding: 5px 0;">序号</th><th>发货人</th><th>收货人</th><th>到站</th><th>收货人电话</th><th>货物名称</th><th>件数</th><th>现付</th><th>到付</th><th>月结</th><th>代收货款</th><th>实际费用</th><th>送货费</th><th>收货地址</th><th>送货方式</th><th>回单份数</th><th>运单备注</th></tr><tbody style="text-align: center;">' + listStr + '<tr style="border-color: #b4b4b4;"><td style="padding: 5px 0;">合计</td><td></td><td></td><td></td><td></td><td></td><td>' + shouldOutAmountSum + '</td><td>' + cashPaySum + '</td><td>' + collectPaySum + '</td><td>' + monthPaySum + '</td><td>' + collectionGoodsFeeSum + '</td><td>' + actualCostSum + '</td><td>' + sendGoodsFeeSum + '</td><td></td><td></td><td></td></tr></tbody>'
    childrenDiv4.style.cssText = 'width: 100%;  border-collapse:collapse; margin-top: 5px; font-size: 15px;'
    childrenDiv4.border = '1'
    pintDiv.appendChild(childrenDiv4)

    para.appendChild(pintDiv)
    const strHTML = '<body style="margin:0;">' + para.innerHTML + '</body>'
    LODOP.ADD_PRINT_HTM('0cm', '0cm', 'RightMargin: 0cm', 'BottomMargin: 0cm', strHTML)
    // LODOP.SET_SHOW_MODE('PREVIEW_IN_BROWSE', true)
    LODOP.SET_SHOW_MODE('HIDE_PAPER_BOARD', true)
    // LODOP.SET_PRINT_MODE('POS_BASEON_PAPER', true) // 设置以纸张边缘为基点
    // LODOP.SET_PRINT_MODE('TRYLINKPRINTER_NOALERT', true)
    // if (arr.operatorPrinterName) LODOP.SET_PRINTER_INDEX(arr.operatorPrinterName)
    if (open) {
      LODOP.PRINT() // 打印
    } else {
      LODOP.PREVIEW() // 预览
    }
  } catch (err) {
    // console.log(err)
  }
}
// 标签打印
export function setLabelPint(open, arr) {
  try {
    var LODOP = getLodop()
    const merchantinfo = store.getters.getmerchantinfo
    LODOP.PRINT_INIT('标签打印')
    LODOP.SET_PRINT_COPIES(arr.copies) // 设置打印份数
    LODOP.SET_PRINT_PAGESIZE(1, '8cm', '6cm', '') // intOrient, PageWidth,PageHeight,strPageName 单位 mm
    var para = document.createElement('body')
    // 打印区域
    var pintDiv = document.createElement('div')
    pintDiv.style.cssText = 'border: solid 0px black; width: 8cm; height: 6cm; overflow: hidden; font-weight: 600;'
    // 打印内容
    // 公司名称
    var childrenDiv1 = document.createElement('div')
    childrenDiv1.innerText = merchantinfo.compName
    childrenDiv1.style.cssText = 'position: absolute; left: 0px; top: 2px; text-align: center; width: 92%; height: 30px; font-size: 16px;'
    pintDiv.appendChild(childrenDiv1)
    // 业务电话
    var childrenDiv2 = document.createElement('div')
    childrenDiv2.innerText = '业务电话：' + merchantinfo.phone
    childrenDiv2.style.cssText = 'position: absolute; left: 2px; top: 153px; text-align: left; width: 92%; height: 30px; font-size: 16px;'
    pintDiv.appendChild(childrenDiv2)
    // 地址
    var childrenDiv3 = document.createElement('div')
    childrenDiv3.innerText = '地址：' + merchantinfo.detailAddress
    childrenDiv3.style.cssText = 'word-wrap:break-word; word-break:break-all; position: absolute; left: 2px; top: 175px; text-align: left; width: 92%; height: 30px; font-size: 16px;'
    pintDiv.appendChild(childrenDiv3)
    // 收货人
    var childrenDiv4 = document.createElement('div')
    childrenDiv4.innerText = '收货人：' + arr.receiver
    childrenDiv4.style.cssText = 'position: absolute; left: 2px; top: 132px; text-align: left; width: 92%; height: 30px; font-size: 16px;'
    pintDiv.appendChild(childrenDiv4)
    // 货名
    var childrenDiv5 = document.createElement('div')
    childrenDiv5.innerText = '货名：' + arr.goodsName
    childrenDiv5.style.cssText = 'word-wrap:break-word; word-break:break-all; position: absolute; left: 2px; top: 40px; text-align: left; width: 42%; height: 30px; font-size: 16px;'
    pintDiv.appendChild(childrenDiv5)
    // 单号
    var childrenDiv6 = document.createElement('div')
    childrenDiv6.innerText = '单号：' + arr.consignNo
    childrenDiv6.style.cssText = 'word-wrap:break-word; word-break:break-all; position: absolute; left: 50%; top: 40px; text-align: left; width: 42%; height: 30px; font-size: 16px;'
    pintDiv.appendChild(childrenDiv6)
    // 到站
    var childrenDiv7 = document.createElement('div')
    childrenDiv7.innerHTML = '到站：' + '<span style="font-size: 24px; font-weight: 700; display:inline-block; width: 100%; padding-left: 15px; padding-top: 5px;">' + arr.receiveStationName + '</span>'
    childrenDiv7.style.cssText = 'word-wrap:break-word; word-break:break-all; position: absolute; left: 2px; top: 75px; text-align: left; width: 55%; height: 50px; font-size: 18px;'
    pintDiv.appendChild(childrenDiv7)
    // 件数
    var childrenDiv8 = document.createElement('div')
    childrenDiv8.innerHTML = '件数：' + '<span style="font-size: 24px; font-weight: 700; display:inline-block; width: 100%; text-align: center; padding-top: 5px;">' + arr.goodsAmount + '</span>'
    childrenDiv8.style.cssText = 'word-wrap:break-word; word-break:break-all; position: absolute; left: 50%; top: 75px; text-align: left; width: 42%; height: 30px; font-size: 18px;'
    pintDiv.appendChild(childrenDiv8)
    para.appendChild(pintDiv)
    const strHTML = '<body style="margin:0;">' + para.innerHTML + '</body>'
    // console.log(strHTML)
    LODOP.ADD_PRINT_HTM('0cm', '0cm', 'RightMargin: 0cm', 'BottomMargin: 0cm', strHTML)
    // LODOP.SET_SHOW_MODE('PREVIEW_IN_BROWSE', true)
    LODOP.SET_SHOW_MODE('HIDE_PAPER_BOARD', true)
    // LODOP.SET_PRINT_MODE('POS_BASEON_PAPER', true) // 设置以纸张边缘为基点
    // LODOP.SET_PRINT_MODE('TRYLINKPRINTER_NOALERT', true)
    // if (arr.operatorPrinterName) LODOP.SET_PRINTER_INDEX(arr.operatorPrinterName)
    if (open) {
      LODOP.PRINT() // 打印
    } else {
      LODOP.PREVIEW() // 预览
    }
  } catch (err) {
    // console.log(err)
  }
}
