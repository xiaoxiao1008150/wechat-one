// pages/alls/image-detail/image-detail.js

var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageData: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      let id = options.id;
      let list = app.globalData.imageListData;

      let image = list.filter((item) =>{
        return item.id === id;
      });
      let postDate = image[0].post_date;
      //设置topBar是阅读
      wx.setNavigationBarTitle({
        title: postDate
      })
      this.setData({
        imageData: image && image.length > 0 && image.shift()
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