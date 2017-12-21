// pages/me/reading-collect/reading-collect.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    collectList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '文章收藏'
    })
    let collectList = wx.getStorageSync('reading_collected');
    this.setData({
      collectList: collectList
    })
  },
  gotoDetail (event) {
    let id = parseInt(event.target.dataset.id);
    this.setnavigateTo(id);
  },
  setnavigateTo(id){
    wx.navigateTo({
      url: "/pages/alls/type-detail/type-detail?id=" + id
    })
  },
  // 转到文章详情页面

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