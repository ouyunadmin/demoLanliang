import dayjs from 'dayjs'
import router from '@/router'
import soundSrc from '@/assets/audio/msg.mp3'
const contentType = {
  picture: '[图片]',
  audio: '[语音]'
}
export default {
  namespaced: true,
  state: {
    // 保存当前聊天好友的聊天数据
    chatData: [],
    // 好友列表
    rosData: [],
    // 搜索后的好友列表
    displayRoles: [],
    // 存储有新消息的好友
    newsRoles: [],
    // 选中的聊天好友ID
    selectedFrienId: '',
    // 用户ID
    userId: '',
    // 存储提示消息音频
    sound: new Audio(),
    // 是否需要抖动动画
    isPlay: false,
    // 登录token
    // accessToken: ''
    // 是否显示聊天窗口
    dialogVisible: false
  },
  getters: {
    /**
     * 返回聊天消息
     * @param {Object} state vuex state
     */
    getChatData(state) {
      return state.chatData
    },
    /**
     * 返回好友列表
     * @param {Object} state vuex state
     */
    getRosData(state) {
      return state.rosData
    },
    /**
     * 返回搜索后的好友列表
     * @param {Object} state vuex state
     */
    getDisplayRos(state) {
      return state.displayRoles
    },
    /**
     * 返回是否显示聊天窗口
     * @param {} state vuex state
     */
    getDialogVisible(state) {
      return state.dialogVisible
    }
  },
  mutations: {
    /**
     * @description 聊天消息
     * @param {Object} state vuex state
     * @param {Object} dataObj 消息
     */
    setMessage(state, dataObj) {
      state.chatData.splice(0, state.chatData.length, ...dataObj)
    },
    /**
     * @description 好友列表
     * @param {Object} state vuex state
     * @param {Object} rosData 好友
     */
    setFriendsData(state, rosData) {
      state.rosData.splice(0, state.rosData.length, ...rosData)
    },
    /**
     * @description 搜索后的好友列表
     * @param {Object} state vuex state
     * @param {Object} rosData 好友
     */
    setDisplayFriendsData(state, rosData) {
      state.displayRoles.splice(0, state.displayRoles.length, ...rosData)
    },
    /**
     * @description 选中的好友
     * @param {*} state vuex state
     * @param {*} friendId 好友ID
     */
    setSelectedFriend(state, friendId) {
      if (state.selectedFrienId !== friendId) {
        state.selectedFrienId = friendId
      }
    },
    /**
     * @description 未读消息的好友列表
     * @param {*} state vuex state
     * @param {*} newsFriendId 好友ID
     */
    setNewsRoles(state, newsFriendId) {
      if (state.newsRoles.indexOf(newsFriendId) === -1) {
        state.newsRoles.push(newsFriendId)
      }
    },
    /**
     * @description 未读消息的好友列表
     * @param {*} state vuex state
     * @param {*} newsFriendId 好友ID
     */
    updateNewsRoles(state, newsFriendId) {
      const index = state.newsRoles.indexOf(newsFriendId)
      if (index !== -1) {
        state.newsRoles.splice(index, 1)
      }
    },
    /**
     * 改变播放动画的状态
     * @param {*} state vuex state
     * @param {*} flag 要设置的动画播放状态，true为播放，false为不播放
     */
    setIsPlay(state, flag) {
      state.isPlay = flag
    },
    /**
     * 更新聊天窗口是否显示
     * @param {*} state vuex state
     * @param {*} flag 要设置的值
     */
    setDialogVisible(state, flag) {
      state.dialogVisible = flag
    }
  },
  actions: {
    /**
     * 环信登录
     * @param {*} vuex 参数
     * @param {*} userId 要登录的用户ID
     */
    imLogin({ state }, userId) {
      return new Promise((resolve, reject) => {
        const options = {
          appKey: router.app.$easemob.im.config.appkey,
          apiUrl: router.app.$easemob.im.config.apiURL,
          success: data => {
            console.log('环信登录成功')
            resolve(data)
          },
          error: (error) => {
            console.log('环信登录失败', error)
            reject(error)
          },
          user: userId,
          pwd: '123456'
        }
        router.app.$imconn.open(options)
      })
    },
    /**
     * 环信注册
     * @param {*} param0 vuex
     * @param {*} userId 要注册的用户ID 密码此处都默认为123456
     */
    imRegister({ state }, userId) {
      return new Promise((resolve, reject) => {
        const options = {
          appKey: router.app.$easemob.im.config.appkey,
          apiUrl: router.app.$easemob.im.config.apiURL,
          success: async data => {
            console.log('环信注册成功')
            resolve(data)
          },
          error: (error) => {
            router.app.$message.error('环信注册失败，请重新加载页面')
            console.log('环信注册成功', error)
            reject(error)
          },
          username: userId,
          password: '123456',
          nickname: 'IM-' + userId
        }
        router.app.$imconn.registerUser(options)
      })
    },
    /**
     * @description 获取好友列表
     * @param {Object} state vuex state
     * @param {Object} conn 环信链接信息监听
     */
    imRosList({ state, commit, dispatch, rootState }) {
      // 获取用户好友列表
      // const httpParam = {
      //   userId: rootState.admin.account.userId,
      //   pageNum: 1,
      //   pageSize: 10000
      // }
      // findIMFriendsList(httpParam).then(res => {
      //   console.log(res)
      // }).catch(err => {
      //   console.log(err)
      // })
      // const conn = router.app.$imconn
      return new Promise(async(resolve, reject) => {
        // 获取好友列表
        // conn.getRoster({
        // success: async roster => {
        const roster = [
          { name: 'hi', subscription: 'both' },
          { name: 'hello', subscription: 'both' }
        ]
        let rosData = []
        const promise = []
        for (const i in roster) {
          const ros = roster[i]
          if (ros.subscription === 'both' || ros.subscription === 'to') {
            const dbPromise = dispatch('admin/db/imDatabase', { user: true, username: ros.name }, { root: true }).then(async db => {
              if (db.value().length) {
                const dbData = db.value()
                let chatData = dbData[dbData.length - 1] // 好友的最新一条消息
                if (chatData.type === 'division') {
                  chatData = dbData[dbData.length - 2]
                }
                // 用于好友列表显示最近一条消息，若不是文本，则显示文件类型
                ros.content = chatData.type === 'text' ? chatData.content : contentType[chatData.type]
                ros.time = chatData.time // 用于好友列表显示最近一条消息时间
                await db.remove({ type: 'division' }).write()
                await db.push({
                  type: 'division' // 分割线 上次聊到这里的分割线
                }).write()
              } else {
                ros.content = '' // 用于好友列表显示最近一条消息
                ros.time = '' // 用于好友列表显示最近一条消息时间
              }
              rosData.push(ros)
            })
            promise.push(dbPromise)
          }
        }
        await Promise.all(promise).then(async() => {
          rosData = rosData.sort((preItem, nextItem) => {
            return dayjs(nextItem.time) - dayjs(preItem.time)
          })
          // 保存
          commit('setFriendsData', rosData)
          commit('setDisplayFriendsData', rosData)
          // 默认聊天好友为好友列表第一个
          await dispatch('changeSelectedFriend', rosData[0].name)
          resolve()
        })
        // },
        //   error: error => {
        //     console.log(error)
        //     router.app.$message.error('获取好友列表失败，请检查网络并重新刷新页面')
        //     reject(error)
        //   }
        // })
      })
    },
    /**
     * @description 监听环信信息
     * @param {Object} state vuex state
     * @param {Object} conn 环信链接信息监听
     */
    imConnect({ state, commit, dispatch }) {
      const conn = router.app.$imconn
      state.sound.src = soundSrc
      state.sound.load()
      return new Promise(resolve => {
        conn.init({
          // 连接成功回调
          onOpened: async message => {
            // 用户信息
            state.userId = conn.context.userId
            // state.accessToken = message.accessToken
            // 好友列表
            // await dispatch('imRosList')
            // 如果isAutoLogin设置为false，那么必须手动设置上线，否则无法收消息
            // 手动上线指的是调用conn.setPresence(); 如果conn初始化时已将isAutoLogin设置为true, 则无需调用conn.setPresence();
          },
          // 当连接关闭时的回调方法
          onClosed: () => {
            conn.clear()
            conn.onClosed()
          },
          // 收到文本消息
          onTextMessage: async message => {
            message.type = 'text'
            message.own = false
            await dispatch('set', message)
            dispatch('playNotifyMusic')
          },
          // 收到表情消息
          onEmotionMessage: async message => {
            message.type = 'emotion'
            message.own = false
            await dispatch('set', message)
            dispatch('playNotifyMusic')
          },
          // 收到表情消息
          onEmojiMessage: async message => {
            message.type = 'emotion'
            message.own = false
            await dispatch('set', message)
            dispatch('playNotifyMusic')
          },
          // 收到图片消息
          onPictureMessage: async message => {
            message.type = 'picture'
            message.data = contentType['picture']
            message.own = false
            await dispatch('set', message)
            dispatch('playNotifyMusic')
          },
          // 收到语音消息
          onAudioMessage: async message => {
            message.type = 'audio'
            message.data = contentType['audio']
            message.own = false
            await dispatch('set', message)
            dispatch('playNotifyMusic')
          },
          // 收到联系人订阅请求的回调方法
          onPresence: async function(message) {
            await dispatch('handlePresence', message)
          },
          // 即 收到请求添加好友消息
          onRoster: function(message) {
            console.log('onRoster', message)
          },
          // 异常处理
          onError: message => {
            console.log('IM异常处理', message)
            router.app.$message('IM连接异常，请刷新后重新加载页面')
          }
        })
        resolve()
      })
    },
    /**
    * @description 简易监听环信信息 仅用于好友功能的监听
    * @param {Object} state vuex state
    * @param {Object} conn 环信链接信息监听
    */
    imSimpleConnect({ state, commit, dispatch }) {
      const conn = router.app.$imconn
      return new Promise(resolve => {
        conn.init({
          // 连接成功回调
          onOpened: async message => {
          },
          // 收到联系人订阅请求的回调方法
          onPresence: async function(message) {
            console.log('handlePresence', message)
            switch (message.type) {
              case 'subscribe': // 对方请求添加好友
                // conn.subscribed({
                //   to: message.from,
                //   message: '[resp:true]'
                // })
                // conn.unsubscribed({
                //     to: message.from,
                //     message: "rejectAddFriend"                  // 拒绝添加好友回复信息
                // });
                break
              case 'subscribed': // 对方同意添加好友，已方同意添加好友
                break
              case 'unsubscribe': // 对方删除好友
                break
              case 'unsubscribed': // 被拒绝添加好友，或被对方删除好友成功
                break
              default:
                break
            }
          },
          // 异常处理
          onError: message => {
            console.log('IM异常处理', message)
            router.app.$message('IM连接异常，请刷新后重新加载页面')
          }
        })
        resolve()
      })
    },
    /**
     * 更新当前对话好友
     * @param {*} param0 vuex
     * @param {*} friendId 选择的好友ID
     */
    async changeSelectedFriend({ state, commit, dispatch }, friendId) {
      if (state.selectedFrienId !== friendId) {
        commit('setSelectedFriend', friendId)
        commit('updateNewsRoles', friendId)
        await dispatch('load')
      }
    },
    /**
     * @param {Object} state vuex state
     * @param {String} search 搜索角色
     */
    searchRoles({ state, commit, dispatch }, search) {
      const displayRoles = state.rosData.filter(element => {
        return element.name.indexOf(search) !== -1
      })
      commit('setDisplayFriendsData', displayRoles)
    },
    /**
     * 更新好友列表的最近一条消息 并将此好友放到第一位
     * @param {*} param0 vuex
     * @param {*} message 消息内容
     */
    setRolesMessage({ state }, message) {
      const { to, username, content, time } = message
      let friendIndex = -1
      const role = state.rosData.find((element, index) => {
        friendIndex = index
        return element.name === to || element.name === username
      })
      if (role) {
        role.content = content
        role.time = time
      }
      if (friendIndex !== 0) {
        state.rosData.splice(friendIndex, 1)
        state.rosData.unshift(role)
        // commit('setDisplayFriendsData', displayRoles)
      }
    },
    /**
     * @description 保存聊天记录
     * @param {Object} state vuex state
     * @param {String} message 消息
     */
    set({ state, commit, dispatch }, message) {
      return new Promise(async resolve => {
        // if (!state.rosData.length) {
        //   await dispatch('imRosList')
        //   console.log('this is rosdata length 0')
        // } else {
        //   const roleIndex = state.rosData.findIndex(element => {
        //     return element.name === message.from || element.name === message.to
        //   })
        //   if (roleIndex === -1) {
        //     await dispatch('imRosList')
        //     console.log('this is roleindex -1')
        //   }
        // }
        // console.log(state.rosData.findIndex(element => {
        //   return element.name === message.from || element.name === message.to
        // }))
        // 注意对象key关键字和chat里要解析时用的key保持一致
        const row = {
          // 消息类型 text/picture/audio/emotion
          'type': message['type'],
          // 消息id
          'id': message['id'],
          // 是否是自己发送的(false代表接收他人消息)
          'own': message['own'],
          // 具体消息值 text类型时存放消息内容
          'content': message.data,
          // 聊天对象
          'username': message['from'],
          // 使用对象
          'to': message['to'],
          // 图片路径
          'url': message['url'] || '',
          // 图片名称
          'filename': message['filename'] || '',
          // 消息时间
          'time': message['delay'] ? dayjs(message['delay']).format('YYYY-MM-DD HH:mm:ss') : dayjs().format('YYYY-MM-DD HH:mm:ss')
        }
        // 持久化
        // await commit('setMessage', row)
        const db = await dispatch('admin/db/imDatabase', { user: true, username: row.username }, { root: true })
        db
          .push(row)
          .write()
        dispatch('setRolesMessage', row)
        // 存放到未读好友list
        if (!message['own']) {
          commit('setNewsRoles', message['from'])
        }
        // 刷新聊天页面数据
        await dispatch('load')
        resolve()
      })
    },
    /**
     * @description 当前好友聊天记录数据加载
     * @param {Object} state vuex state
     */
    load({ state, commit, dispatch }) {
      return new Promise(resolve => {
        // 读取所有人的聊天
        // const message = await dispatch('admin/db/get', {
        //   dbName: 'im',
        //   path: '$chat',
        //   defaultValue: '',
        //   user: true
        // }, { root: true })

        dispatch('admin/db/imDatabase', { user: true, username: state.selectedFrienId }, { root: true }).then(db => {
          state.chatData = db.value()
          commit('setMessage', db.value())
          resolve()
        })
      })
    },
    /**
     * @description 注销
     * @param {Object} state vuex state
     */
    imClose({ state, commit }) {
      const conn = router.app.$imconn
      return new Promise(resolve => {
        // SDK关闭连接并处理连接状态为CLOSED
        conn && conn.close()
        // end
        resolve()
      })
    },
    /**
     * @description 发送文本信息
     * @param {Object} state vuex state
     * @param {String} user 好友id
     * @param {String} message 消息
     */
    async imSendTextMessage({ state, commit, dispatch }, { user = '', message } = {}) {
      const conn = router.app.$imconn
      return new Promise(resolve => {
        const options = {
          to: user,
          msg: message,
          type: 'chat',
          success: async res => {
            const msg = {
              type: 'text',
              data: message,
              own: true,
              from: user,
              to: state.userId,
              id: res
            }
            await dispatch('set', msg)
            // router.app.$message.success('信息发送成功')
          }
        }
        conn.sendTextMessage(options)
        // end
        resolve()
      })
    },
    /**
     * 发送图片消息时调用的方法
     * @param {*} param0 vuex
     * @param {*} fileInputId input标签的id值
     * attention: 在项目中引用的mock.js改变了XhrRequest对象的名称，改成了MockXhrRequest所以才会报以上的错误，至于为什么会造成这一原因，就不得而知了
     */
    imSendImgMessage({ state, commit, dispatch }, { user, fileInputId }) {
      const conn = router.app.$imconn
      var fileObj = router.app.$easemob.im.Helper.getFileUrl(fileInputId)
      if (fileObj.url == null || fileObj.url === '') {
        router.app.$message.error('请选择发送图片')
        return false
      }
      return new Promise((resolve, reject) => {
        const options = {
          type: 'chat',
          fileInputId: fileInputId,
          to: user,
          apiUrl: router.app.$easemob.im.config.apiURL,
          onFileUploadComplete: async res => {
            const msg = {
              type: 'picture',
              url: res.uri + '/' + res.entities[0].uuid,
              own: true,
              from: user,
              to: state.userId,
              id: res.entities[0].uui,
              data: contentType['picture']
            }
            await dispatch('set', msg)
            resolve()
          },
          onFileUploadProgress: () => {},
          onFileUploadError: error => {
            console.log('失败', error)
            reject(error)
          }
        }
        conn.sendPicture(options)
      })
    },
    /**
     * @description 添加好友
     * @param {Object} state vuex state
     * @param {String} user 好友id
     */
    imAddFriend({ state, commit }, user) {
      const conn = router.app.$imconn
      return new Promise(resolve => {
        conn.subscribe({
          to: user,
          message: '加个好友呗!'
        })
        resolve()
      })
    },
    /**
     * @description 删除好友
     * @param {Object} state vuex state
     * @param {String} user 好友id
     */
    imRemoveFriend({ state, commit }, user) {
      const conn = router.app.$imconn
      return new Promise(resolve => {
        conn.removeRoster({
          to: user,
          success: () => {
            conn.unsubscribed({
              to: user
            })
            router.app.$message.error('删除好友成功')
            resolve()
          },
          error: () => {
            // 删除操作失败
            router.app.$message.error('删除好友失败')
          }
        })
      })
    },
    /**
     * 删除存在好友消息列表的'上次聊到这里'数据
     * @param {*} param0 vuex
     * @param {*} selectedFrienId 好友id
     */
    deleteDbDevision({ dispatch }, selectedFrienId) {
      return new Promise(async(resolve) => {
        const db = await dispatch('admin/db/imDatabase', { user: true, username: selectedFrienId }, { root: true })
        db.remove({ type: 'division' }).write()
        resolve()
      })
    },
    addImRosList() {},
    /**
     * @description 接收添加好友信息 并自动同意添加好友
     * @param {*} { state, commit, dispatch }
     */
    async handlePresence({ state, commit, dispatch }, message) {
      if (message.type === 'subscribe') {
        const conn = router.app.$imconn
        // 同意添加好友操作的实现方法
        conn.subscribed({
          to: message.from,
          message: '[resp:true]'
        })
        // 好友列表新增元素
        await dispatch('addImRosList')
        // 拒绝添加好友的方法处理
        // conn.unsubscribed({
        // to : user,
        // message : "rejectAddFriend"
        // });
      }
    },
    /**
     * 播放提示声音
     */
    playNotifyMusic({ state, commit }) {
      commit('setIsPlay', true)
      state.sound.play().then(data => {
      }).catch(err => {
        console.log('加载提示声音异常', err)
      })
      state.sound.addEventListener('ended', function() {
        commit('setIsPlay', false)
      })
    }
  }
}
