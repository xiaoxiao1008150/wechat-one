// pages/alls/type-detail/type-detail.js
import api from '../../../api/api.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    reading_detail:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id;
    console.log('id', id)
    api.getReadingDetail({
      success: ((res) =>{
        let list = res.data.data;
        let obj = {
          title: list.hp_title,
          name: list.hp_author,
          content: list.hp_content
        }
        this.setData({
          reading_detail: obj
        })
      }),
      id
    })
    console.log('test', this.data.reading_detail)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */


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