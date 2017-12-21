// pages/alls/type-detail/type-detail.js
const WxParse = require('../../../wxParse/wxParse.js');
import api from '../../../api/api.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    musicList:{},
    needAnimation: false,
    needShow: false,
    musicCollected: {},
    hasCollected: false,
    hasShare: false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id;
    this.data.musicCollected.id = id;
    var that = this;
    api.getMusicDetail({
      success: ((res) =>{
        let list = res.data.data;
        let story = list.story;
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
          cover: list.cover,
          lyric: list.lyric,
          album: list.album,
          singer,
          company,
          publish_date,
          genre,
          story
        }
        this.data.musicCollected.title = list.title;
        WxParse.wxParse('story', 'html', story, that,5);
        this.setData({
          musicList: obj
        })
      }),
      id
    });
    this.handleHasCollected(id)
  },
  openlyric (){
    var that = this;
    this.setData({
      needShow: true
    })
    setTimeout(()=>{
      that.setData({
        needAnimation: true
      })
    },20)
  },
  closelyric () {
    // var that = this;
    this.setData({
      needAnimation: false
    })
    // setTimeout(()=>{
    //   that.setData({
    //     needAnimation: false
    //   })
    // },20)
  },
  collect () {
    let hasCollected = this.data.hasCollected;
    if(hasCollected){
      wx.showToast({
        title: '音乐已经收藏'
      })
    }else{
      wx.showToast({
        title: '收藏成功'
      })
      let collectList = wx.getStorageSync('music_collected') || [];
      let newObj = this.data.musicCollected;
        collectList.push(newObj);
        wx.setStorageSync('music_collected', collectList );
        this.setData({
           hasCollected: true
        })
    }
  },
  handleHasCollected (id) {
     let collectList =  wx.getStorageSync('music_collected' ) || [];
     let filterArray = collectList.filter((item) =>{
        return item.id === id;
     });
     let hasCollected = filterArray.length;
     if(hasCollected){
        this.setData({
          hasCollected: true
        })
     }
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
  onShareAppMessage: function (res) {
    var that = this;
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log('button', res.target)
    }
    return {
      // title: '自定义转发标题',
      // path: '/pages/alls/type-detail/type-detail',
      success: function(res) {
        // 转发成功
        wx.showToast({
          title: '转发成功',
          icon: 'success',
          duration: 1000
        });
        that.setData({
           hasShare: true
        })
      },
      fail: function(res) {
        // 转发失败
        wx.showToast({
          title: '转发失败',
          icon: 'fail',
          duration: 1000
        })
      }
    }
  }
})