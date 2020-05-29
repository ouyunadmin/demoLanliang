import request from '@/plugin/axios'

// 上传照片
export function upload(file) {
  const data = new FormData()
  data.append('file', file, file.name)
  return request({
    url: '/file/upload',
    method: 'post',
    headers: { 'Content-Type': 'multipart/form-data' },
    data
  })
}
