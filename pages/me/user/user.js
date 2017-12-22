// pages/me/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: null,
    nickName: null,
    editNickName: false,
    focus: true,
    color: '#ccc',
    helpNickName: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let {avatarUrl, nickName} = wx.getStorageSync('userInfo')
    this.setData({
      avatarUrl,
      nickName
    })
  },
  openPhoto () {
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        if(tempFilePaths.length) {
          that.setData({
              avatarUrl: tempFilePaths[0]
          })
          // 更改本地缓存中的图片地址
          let userInfo = wx.getStorageSync('userInfo')
          userInfo.avatarUrl = tempFilePaths[0];
          wx.setStorageSync('userInfo', userInfo);
        }

      }
    })
  },
  editNickName () {
    this.setData({
      editNickName: true
    })
    var animation = wx.createAnimation({
      duration: 500,
        timingFunction: 'ease',
    })
    this.animation = animation
    animation.translateY(0).step()
    this.setData({
      animationData:animation.export()
    })
  },
  editCancel () {
    var that = this;
    var animation = wx.createAnimation({
      duration: 500,
        timingFunction: 'ease',
    })
    this.animation = animation
    animation.translateY(-140).step()
    this.setData({
      animationData:animation.export()
    });
    setTimeout(() =>{
      that.setData({
        editNickName: false
      })
    },400)
  },
  resetValue () {
    this.data.oldNickName = this.data.nickName;
    this.setData({
      nickName: null,
      focus: true
    })
  },
  // 实时获取input的值
  bindKeyInput (e) {
    this.setData({
      helpNickName: e.detail.value
    })
  },
  save (e) {
    // 更改名称到缓存
    // 是点击按钮进行保存的
    let newNickName;
    if(e.type === 'tap') {
      // this.setData({
      //   nickName: this.data.helpNickName
      // });
      console.log('new', this.data.helpNickName)
      newNickName = this.data.helpNickName;
    }else{
      newNickName = e.detail.value;
    }
    if(!newNickName){// 如果编辑姓名为空，不修改原名称
        console.log('执行')
        console.log('oldNickName', this.data.oldNickName)
        this.setData({
          nickName: this.data.oldNickName
        });
        this.editCancel();
        return
      }else{
        let userInfo = wx.getStorageSync('userInfo')
        userInfo.nickName = newNickName;
        wx.setStorageSync('userInfo', userInfo);
        this.setData({
          nickName: newNickName,
        });
      }
      this.editCancel();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})