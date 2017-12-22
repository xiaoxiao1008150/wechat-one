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
    let category = options.category;
    this.data.category = category;
    let text;
    if(category === 'reading') {
      text = '文章'
    }else if(category === 'music') {
      text = '音乐'
    }
    wx.setNavigationBarTitle({
      title: text + '收藏'
    })
    let key = category + '_collected';
    let collectList = wx.getStorageSync(key);
    this.setData({
      collectList
    })
  },
  gotoDetail (event) {
    let id = parseInt(event.target.dataset.id);
    this.setnavigateTo(id);
  },
  setnavigateTo(id){
    let category = this.data.category;
    if(category === 'reading') {
      category = 'type'
    }
    wx.navigateTo({
      url: `/pages/alls/${category}-detail/${category}-detail?id=${id}`
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