<template>
  <admin-dialog
    :title="textMap[dialogStatus]"
    width="1000px"
    top="50px"
    dialog-css="error"
    :visible="dialogForm.visible"
    :handle-drag="handleDrag"
    :cancel="cancel"
  >
    <div v-loading="loading">
      <el-row v-if="dialogStatus === 'details'">
        <table class="table-border center fixed detail">
          <colgroup>
            <col width="15%">
            <col width="70%">
          </colgroup>
          <tr>
            <th class="admin-text-right">资讯类型：</th>
            <td class="admin-text-left">
              <span v-if="temp.type===1">行业新闻</span>
              <span v-else>公司资讯</span>
            </td>
          </tr>
          <tr>
            <th class="admin-text-right">推荐：</th>
            <td class="admin-text-left">
              <span v-if="temp.commended===1">推荐</span>
              <span v-else>不推荐</span>
            </td>
          </tr>
          <tr v-if="temp.commended===1">
            <th class="admin-text-right">推荐图片：</th>
            <td class="admin-text-left">
              <img v-if="temp.image" :src="temp.image" class="avatar-img" @click="imgView(temp.image, 0)">
            </td>
          </tr>
          <tr>
            <th class="admin-text-right">资讯标题：</th>
            <td class="admin-text-left">{{ temp.title }}</td>
          </tr>
          <!--<tr>
            <th class="admin-text-right">发布时间：</th>
            <td class="admin-text-left">{{temp.gmtCreate}}</td>
          </tr>-->
          <tr>
            <th class="admin-text-right">摘要：</th>
            <td class="admin-text-left">{{ temp.remark }}</td>
          </tr>
          <tr>
            <th class="admin-text-right">资讯内容：</th>
            <td class="admin-text-left content" v-html="temp.content" />
          </tr>
        </table>
      </el-row>
      <el-form v-else ref="dataForm" :model="temp" label-position="right" label-width="120px">
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="资讯类型"
              prop="type"
              :rules="$rules({required:true,message:'请选择资讯类型'})"
            >
              <el-select ref="type" v-model.trim="temp.type" style="width: 260px;" filterable default-first-option clearable>
                <el-option v-for="item in options" :key="item.key" :label="item.label" :value="item.key" />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item
              label="推荐新闻"
              prop="commended"
              :rules="$rules({required:true,message:'请选择是否为推荐新闻'})"
            >
              <el-radio-group v-model="temp.commended">
                <el-radio :label="1">推荐</el-radio>
                <el-radio :label="0">不推荐</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item
              label="资讯标题"
              prop="title"
              :rules="$rules({required:true,message:'请填写资讯标题',min:1, max:30})"
            >
              <el-input v-model.trim="temp.title" style="width: 260px;" placeholder="标题1-30个字" clearable />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item
              v-if="temp.commended===1"
              label-position="right"
              label="推荐配图"
              prop="image"
              :rules="$rules({required:true,message:'请上传推荐配图'})"
            >
              <el-upload
                class="avatar-uploader"
                action=""
                accept=".png,.jpg,.jpeg"
                :show-file-list="false"
                list-type="picture"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="temp.image" :src="temp.image" class="avatar">
                <div v-if="temp.image" title="删除" class="el-icon-remove dot" @click.stop.prevent="deleteImg" />
                <i v-if="!temp.image" class="el-icon-plus avatar-uploader-icon" />
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item
          label="摘要"
          prop="remark"
          :rules="$rules({required:true,message:'请填写摘要'})"
        >
          <el-input
            v-model.trim="temp.remark"
            type="textarea"
            resize="none"
            :rows="3"
            maxlength="100"
            placeholder="最多100字"
          />
        </el-form-item>

        <el-form-item
          label="资讯内容"
          prop="content"
          :rules="$rules({required:true,message:'请填写资讯内容'})"
        >
          <admin-tinymce :id="`${id}`" ref="content" v-model="temp.content" :height="200" />
        </el-form-item>

      </el-form>
    </div>

    <div slot="footer" class="dialog-footer">
      <el-button @click.native="cancel">取消</el-button>
      <el-button v-if="dialogStatus==='create'" :loading="loading" type="primary" @click.native="create('dataForm')">确 定</el-button>
      <el-button v-else-if="dialogStatus==='update'" type="primary" :loading="loading" @click.native="update('dataForm')">更 新</el-button>
    </div>

    <gallery id="img1032" :images="images" :index="index" :options="{closeOnSlideClick:true}" @close="index = null" />
  </admin-dialog>
</template>

<script>
import { cloneDeep, uniqueId } from 'lodash'
import util from '@/libs/util.js'
import elements from '@/mixins/elementsPermission'
import AdminTinymce from '@/components/admin-tinymce'
import VueGallery from 'vue-gallery'
import { upload } from '@/api/common/upload'
import { addObj, putObj, getObj } from '@/api/demo/api'

const defaultForm = {
  id: null,
  // 类型  1：行业新闻  2：公司资讯
  type: 1,
  // 推荐  1：推荐 0：不推荐
  commended: null,
  // 推荐新闻
  image: '',
  // 标题
  title: '',
  // 摘要
  remark: '',
  // 内容
  content: ''
}

export default {
  name: 'OneDialog',
  components: {
    'gallery': VueGallery,
    AdminTinymce
  },
  mixins: [
    elements
  ],
  props: {
    dialogForm: {
      required: true,
      default: () => {},
      type: Object
    }
  },
  data() {
    return {
      loading: false,
      id: 'vue-tinymce-' + uniqueId(),
      images: [],
      index: null,
      // 图片上传格式
      validExtensions: ['png', 'jpg', 'jpeg'],
      // 资讯类型
      options: [
        { label: '行业新闻', key: 1 },
        { label: '公司资讯', key: 2 }
      ],
      // 接收数据
      data: this.dialogForm,
      dialogStatus: '',
      textMap: {
        update: '编辑资讯',
        create: '新增资讯',
        details: '查看资讯'
      },
      // 页面绑定元素
      temp: cloneDeep(defaultForm)
    }
  },
  methods: {
    handleDrag() {
      this.$refs.type && this.$refs.type.blur()
      // this.$refs.keyWords.focus()
    },
    // 图片画廊
    imgView(list, index) {
      this.images = [list]
      this.index = index
    },
    // 删除图片
    deleteImg() {
      this.temp.image = ''
      this.$refs['dataForm'].validateField('image')
    },
    beforeAvatarUpload(file) {
      const ext = file.name.split('.').pop().toLowerCase()
      const isLt2M = file.size / 1024 / 1024 < 5
      if (!this.validExtensions.includes(ext)) {
        this.$message.error('照片只能是 ' + this.validExtensions.join(', ') + ' 格式!')
        return false
      }
      if (!isLt2M) {
        this.$message.error('照片大小不能超过 5MB!')
        return false
      }
      upload(file).then(response => {
        if (response.data) {
          this.temp.image = response.data
          this.$refs['dataForm'].validateField('image')
        }
      }).catch(() => {
        this.$message.error('照片上传失败!')
      })
      return false
      // return isJPG && isLt2M
    },
    // 取消
    cancel(done) {
      this.dialogForm.visible = false
      this.dialogStatus !== 'details' && this.$refs['dataForm'].resetFields()
      this.temp = cloneDeep(defaultForm)
      this.loading = false
    },
    // 新增数据
    create(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loading = true
          const temp = cloneDeep(this.temp)
          if (temp.commended === 0) temp.image = ''
          addObj(temp).then(() => {
            this.loading = false
            this.$emit('updateList')
            this.cancel()
            this.$notify({
              title: '成功',
              message: '新增成功',
              type: 'success',
              duration: 2000
            })
          }).catch(() => {
            this.loading = false
          })
        } else {
          util.formElementsFocus({
            vm: this
          })
          return false
        }
      })
    },
    // 修改数据
    update(formName) {
      const set = this.$refs
      set[formName].validate(valid => {
        if (valid) {
          this.loading = true
          const temp = cloneDeep(this.temp)
          delete temp['gmtCreate']
          delete temp['gmtModified']
          delete temp['createUser']
          delete temp['updateUser']
          delete temp['deleted']
          delete temp['pageIndex']
          delete temp['pageSize']
          delete temp['typeName']
          delete temp['updateUser']
          delete temp['day']
          delete temp['month']
          delete temp['commendedName']
          delete temp['commendedSize']
          if (temp.commended === 0) temp.image = ''
          putObj(temp).then(response => {
            this.loading = false
            this.$emit('updateList')
            this.cancel()
            this.$notify({
              title: '成功',
              message: '修改成功',
              type: 'success',
              duration: 2000
            })
          }).catch(() => {
            this.loading = false
          })
        } else {
          util.formElementsFocus({
            vm: this
          })
          return false
        }
      })
    },
    // 修改数据加载
    fetchData() {
      this.loading = true
      getObj({ id: this.dialogForm.data }).then(response => {
        this.loading = false
        Object.assign(this.temp, {
          type: 1,
          // 推荐  1：推荐 0：不推荐
          commended: 1,
          // 推荐新闻
          image: 'https://dummyimage.com/400/000000/ffffff',
          // 标题
          title: '标题',
          // 摘要
          remark: '摘要',
          // 内容
          content: '内容'
        })
      }).catch(() => {
        this.loading = false
      })
    },
    // 初始数据
    init() {
      const type = Object.keys(this.textMap).find(t => (t === this.dialogForm.type)) || 'details'
      this.dialogStatus = type
      if (type === 'update' || type === 'details') {
        this.fetchData()
      } else {
        this.temp = cloneDeep(defaultForm)
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.detail {
  th {
    font-weight: 500;
  }
}
.table-border {
  td {
    // overflow: inherit !important;
  }
}
.setting-dialog {
  /deep/ td.content {
    img {
      max-width: 100%;
    }
  }
  /deep/ .el-form-item {
    margin-bottom: 20px;
  }
  /deep/ .el-form--label-top .el-form-item__label {
    font-size: 16px;
    padding-bottom: 0px;
  }
  .avatar-img {
    padding: 2px;
    cursor: pointer;
    max-width: 110px;
    border: 1px dashed #e4e7ed;
    &:hover {
      border-color: #0b8bef;
    }
  }
}
</style>
