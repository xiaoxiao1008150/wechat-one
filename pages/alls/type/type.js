// pages/alls/type/type.js
import api from '../../../api/api.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData:[],
    needId: true,
    musicTag:false,
    movieTag: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let category = options.category
    if(category === 'reading') {
      // 获取阅读列表，设置topBar是阅读
      this.setNavigationBarTitle('阅读');
      this.data.category = 'reading';
      this.getReadingList();
    }else if(category === 'music'){
      this.setNavigationBarTitle('音乐')
      this.data.category = 'music';
      this.getMusicList();
    }else if(category === 'movie'){
      this.setNavigationBarTitle('影视')
      this.data.category = 'movie';
      this.getMovieList();
    }
  },
  setNavigationBarTitle (title) {
   wx.setNavigationBarTitle({
      title: title
    })
  },
  getMovieList () {
    api.getMovieList({
      success: ((res) =>{
        let list = res.data.data;
        this.data.needId = list[list.length - 1].id;
        this.handleList(list)
      }),
      id: this.data.needId || 0
    })
  },
  getMusicList () {
    api.getMusicList({
      success: ((res) =>{
        let list = res.data.data;
        this.data.needId = list[list.length - 1].id;
        this.handleList(list)
      }),
      id: this.data.needId || 0
    })
  },
  getReadingList () {
    api.getReadingList({
      success: ((res) =>{
        let list = res.data.data;
        this.data.needId = list[list.length - 1].id;
        this.handleList(list)
      }),
      id: this.data.needId || 0
    })
  },
  handleList (list) {
    let tempList = []
    list.forEach((item) => {
      let obj = {}
      obj.id = item.item_id;
      obj.title = item.title;
      obj.name = item.author.user_name;
      obj.img_url = item.img_url;
      obj.post_date = item.post_date.substring(0, 10);
      // 针对music list数据处理，需要多一个专辑字段的处理
      if(item.subtitle && this.data.category === 'music') {
          console.log('test',item.subtitle)
          this.setData({
            musicTag: true
          })
        }
      if(item.subtitle && this.data.category === 'movie'){
        console.log('kk')
        this.setData({
          movieTag: true
      })
        obj.subtitle = item.subtitle && item.subtitle.substring(3);
      }
      tempList.push(obj);
    })
    this.setData({
      listData: this.data.listData.concat(tempList)
    })
    wx.hideNavigationBarLoading();
    // console.log('rlist===', readingList )
  },
  onScrollLower: function (event) {
    if(this.data.category === 'reading') {
      this.getReadingList()
    }else if(this.data.category === 'music'){
      this.getMusicList()
    }
    wx.showNavigationBarLoading()
  },
  // 监听下拉刷新
  onPullDownRefresh: function (event) {
    console.log('下拉刷新')
    wx.showNavigationBarLoading();
  },
  setnavigateTo(type,id){
    wx.navigateTo({
      url: `../${type}/${type}?id=${id}`
    })
  },
  goToDetail (event) {
    let id = event.currentTarget.dataset.id;
    if(this.data.category === 'reading') {
      this.setnavigateTo('type-detail', id)
    }else if(this.data.category === 'music'){
      this.setnavigateTo('music-detail', id)
    }else if(this.data.category === 'movie'){
      this.setnavigateTo('movie-detail', id)
    }
  },

  onReady: function () {
    // wx.setNavigationBarTitle({
    //   title: '阅读'
    // })
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