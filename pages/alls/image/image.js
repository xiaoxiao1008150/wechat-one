// pages/alls/type/type.js
import api from '../../../api/api.js'

var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    image_list: [],
    needId: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 设置barTitle

    let category = options.category
      // 获取阅读列表，设置topBar是阅读
      wx.setNavigationBarTitle({
        title: '图文'
      })
      this.getImageList();
  },
  getImageList() {
    api.getReadingList({
      success: ((res) => {
        let list = res.data.data;
        this.data.needId = list[list.length - 1].id;
        this.handleImageList(list)
      }),
      id: this.data.needId || 0
    })
  },
  handleImageList(list) {
    let imageList = []
    list.forEach((item) => {
      let obj = {}
      obj.id = item.item_id;
      obj.title = item.title;
      obj.name = item.author.user_name;
      obj.img_url = item.img_url;
      obj.forward = item.forward;
      obj.post_date = item.post_date.substring(0, 10);
      imageList.push(obj);
    })
    this.setData({
      image_list: this.data.image_list.concat(imageList)
    });
    app.globalData.imageListData = this.data.image_list;

    wx.hideNavigationBarLoading();
    // console.log('rlist===', readingList )
  },
  onScrollLower: function (event) {
    this.getImageList()
    console.log('dayin')
    wx.showNavigationBarLoading()
  },

  goToimageDetail(event) {
    let id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: "../image-detail/image-detail?id=" + id
    })
  }
})