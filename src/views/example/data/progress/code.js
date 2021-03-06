const base = `<el-row class="mb-20">
  <h3>线形进度条 — 百分比外显</h3>
  <el-progress :percentage="0"></el-progress>
  <el-progress :percentage="70"></el-progress>
  <el-progress :percentage="80" color="#8e71c7"></el-progress>
  <el-progress :percentage="100" status="success"></el-progress>
  <el-progress :percentage="50" status="exception"></el-progress>
</el-row>
<el-row class="mb-20">
  <h3>线形进度条 — 百分比内显</h3>
  <el-progress :text-inside="true" :stroke-width="18" :percentage="0"></el-progress>
  <el-progress :text-inside="true" :stroke-width="18" :percentage="70"></el-progress>
  <el-progress :text-inside="true" :stroke-width="18" :percentage="80" color="rgba(142, 113, 199, 0.7)"></el-progress>
  <el-progress :text-inside="true" :stroke-width="18" :percentage="100" status="success"></el-progress>
  <el-progress :text-inside="true" :stroke-width="18" :percentage="50" status="exception"></el-progress>
</el-row>
<el-row class="mb-20">
  <h3>环形进度条</h3>
  <el-progress type="circle" :percentage="0"></el-progress>
  <el-progress type="circle" :percentage="25"></el-progress>
  <el-progress type="circle" :percentage="80" color="#8e71c7"></el-progress>
  <el-progress type="circle" :percentage="100" status="success"></el-progress>
  <el-progress type="circle" :percentage="50" status="exception"></el-progress>
  <el-progress type="circle" :percentage="100" status="text">Done</el-progress>
</el-row>`

export default {
  base
}
