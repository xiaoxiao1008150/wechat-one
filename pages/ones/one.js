// pages/ones/one.js
import api from '../../api/api.js'

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list_array_first: {},
    list_array_another: [],
    post_menu: [],
    menu_vol: '',
    animationData: {},
    show: false,
    needAnimation: false,
    isHide: true,
    needBlock: true
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    api.getById({
      success: (res) => {
        // console.log('id', res)
        let g_api = res.data.data.shift();
        app.globalData.g_api = g_api;
        // console.log('data', g_api)
        this.getOneTagList({
          success: ((res) => {
            // console.log('list', res)
            // 注意: 这里必须用setData的形式，直接复制的形式不能是页面渲染
            let list = res.data.data.content_list
            this.setData({
              list_array_first: list[0],
              list_array_another: list.slice(1),
              menu_vol:res.data.data.menu.vol
            });
            // this.data.list_array_first = res.data.data.content_list[0];
            // this.data.list_array_another = res.data.data.content_list.slice(1);
            let postMenu = res.data.data.menu.list
            this.handleMenu(postMenu)
            this.handlePostDetail(list)
            // 处理数据 文章详情的数据

          })
        })
      }
    })
  },
  // 方法
  getOneTagList (params) {
    api.getOneTagList(params)
  },
  handlePostDetail (list) {
    let postDetailList = []
    list.forEach((item) => {
      let obj = {}
      obj.id = item.content_id;
      obj.title = item.title;
      obj.name = item.author.user_name;
      if (item.share_info && item.share_info.content) {
        obj.content = item.share_info.content
      }
      postDetailList.push(obj)
    })
    app.globalData.postDetailData = postDetailList
    // console.log('obj', app.globalData.postDetailData)

  },
  handleMenu (menu) {
    let menuList = []
    menu.forEach((item) => {
      let obj = {}
      obj.title = item.title
      obj.id = item.content_id
      if(item.content_type === "1" && item.tag && item.tag.title === 'ONE STORY'){
        obj.type = 'ONE STORY'
      }else if(item.content_type === "2" && item.serial_list && item.serial_list.length > 0){
        obj.type = '连载'
      }
      else if (item.content_type === "3") {
        obj.type = '问答'
      } else if( item.content_type === "4"){
        obj.type = '音乐'
      }else if( item.content_type === "5"){
        // console.log('test', item.content_type)
        obj.type = '影视'
      }
      menuList.push(obj)
    })
     this.setData({
      post_menu: menuList
    })
     // console.log('data', this.data.post_menu)
  },
  trigger () {
    var that = this;
    if (this.data.isHide) {
      this.setData({
        needBlock: false
      })
    };
    setTimeout(function () {
      that.setData({
        needAnimation: !that.data.needAnimation
      })
    }, 20);

    this.setData({
      isHide: !this.data.isHide
    })
  },
  goToDetail (event) {
    var postId = event.currentTarget.dataset.postid;
    console.log('id', postId)
    wx.navigateTo({
      url: "post-detail/post-detail?id=" + postId
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
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
  
  }
})