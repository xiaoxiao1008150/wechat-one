// pages/alls/type-detail/type-detail.js
import api from '../../../api/api.js'
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movieList:{},
    needAnimation: false,
    isSwiper: true
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id;
    api.getMovieDetail({
      success: ((res) =>{
        let list = res.data.data;
        let photos = list.photo
        // 处理全局的movie list的数据
        let globalMovieList  =  app.globalData.movieListData
        let filterArray = globalMovieList.filter((item) =>{
            return item.id === id;
        })
        let resultMovie =  filterArray && filterArray[0];
        console.log('movei', resultMovie)
        if (photos.length < 1) {
          photos = photos[0];
          this.setData({
            isSwiper: false
          });
        };
        let obj = {
          poster: list.poster,
          officialstory: list.officialstory,//剧情简介
          title: resultMovie.title,
          subtitle: resultMovie.subtitle,
          photos: photos,
          name: resultMovie.name,
          content: resultMovie.content
        }
        console.log('photo', obj)
        this.setData({
          movieList: obj
        })
      }),
      id
    })
  },
  openMovieInfo (){
    this.setData({
      needAnimation: true
    })
  },
  closeMovieInfo () {
    console.log('close')
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