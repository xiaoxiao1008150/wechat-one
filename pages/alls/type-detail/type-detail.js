// pages/alls/type-detail/type-detail.js
import api from '../../../api/api.js'
const WxParse = require('../../../wxParse/wxParse.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    reading_detail:{},
    commentList: [],
    needId: 0,
    readingCollected: {},
    hasCollected: false,
    hasShare: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    let id = options.id;
    this.data.readingCollected.id = id;
    api.getReadingDetail({
      success: ((res) =>{
        let list = res.data.data;
        let content = list.hp_content;
        let obj = {
          title: list.hp_title,
          name: list.hp_author,
          introduce: list.hp_author_introduce,
          copyright: list.copyright,
          avatar: list.author.length && list.author[0].web_url,
          content
        }
        this.data.readingCollected.title = list.hp_title;
        WxParse.wxParse('content', 'html', content, that,5);
        this.setData({
          reading_detail: obj
        })
      }),
      id
    });
    this.getCommentList(id)
    this.data.id = id;

    // 判断文章是否已经收藏过，如果收藏过，设置hasCollected 为true
    this.handleHasCollected(id)
  },
  getCommentList (id) {
    api.getComment({
      success: ((res) =>{
        let commentList = res.data.data.data;
        this.setData({
          commentList: this.data.commentList.concat(commentList)
        })
        this.data.needId = commentList[commentList.length - 1].id;
      }),
      id,
      lastId: this.data.needId || 0,
      channel: 'essay'
    })
  },
  collect () {
    let hasCollected = this.data.hasCollected;
    if(hasCollected){
      wx.showToast({
        title: '文章已经收藏'
      })
    }else{
      wx.showToast({
        title: '收藏成功'
      })
      let collectList = wx.getStorageSync('reading_collected') || [];
      let newObj = this.data.readingCollected;
        collectList.push(newObj);
        wx.setStorageSync('reading_collected', collectList );
        this.setData({
           hasCollected: true
        })
    }
  },
  handleHasCollected (id) {
     let collectList =  wx.getStorageSync('reading_collected') || [];
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
    this.getCommentList(this.data.id);
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