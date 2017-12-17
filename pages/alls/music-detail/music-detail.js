// pages/alls/type-detail/type-detail.js
import api from '../../../api/api.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    musicList:{},
    needAnimation: false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id;
    api.getMusicDetail({
      success: ((res) =>{
        let list = res.data.data;
        let info  = list.info && list.info.split(" ");
        let singer = info && info[1];
        let company = info && info[2];
        let publish_date = info && info[3];
        let genre = info && info[4];
        let obj = {
          title: list.title,
          story_title: list.story_title,
          author: list.author.user_name,
          story_author: list.story_author.user_name,
          story: list.story,
          cover: list.cover,
          lyric: list.lyric,
          album: list.album,
          singer,
          company,
          publish_date,
          genre
        }
        this.setData({
          musicList: obj
        })
      }),
      id
    })
    console.log('test', this.data.reading_detail)
  },
  openlyric (){
    this.setData({
      needAnimation: true
    })
  },
  closelyric () {
    this.setData({
      needAnimation: false
    })
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