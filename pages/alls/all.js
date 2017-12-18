// pages/alls/all.js
import api from '../../api/api.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    reading_list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    api.getReadingList ({
      success: (res) => {
        console.log('reading', res)
      }
    })
  },
  goToCategory (event) {
    var category = event.target.dataset.category;
    if (category === 'image') {
      wx.navigateTo({
        url: "image/image"
      })
    }else{
      wx.navigateTo({
        url: "type/type?category=" + category
      })
    }
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