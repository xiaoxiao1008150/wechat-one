// pages/me/me.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: null,
    nickName: null
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
     wx.setNavigationBarTitle({
      title: '用户名'
    })
    // wx.clearStorage()
  },
  readingCollect () {
    // let collectList = wx.getStorageSync('reading_collected');
    this.setnavigateTo('reading-collect')
  },
  setnavigateTo(type){
    wx.navigateTo({
      url: `${type}/${type}`
    })
  },
  goToUserPage () {
    this.setnavigateTo('user')
    wx.setNavigationBarTitle({
      title: '个人设置'
    })
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