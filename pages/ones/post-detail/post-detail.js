var app = getApp();

Page({
  data: {
    currentPost: ''
  },
  onLoad: function (option) {
      let postId = option.id
      let postDetailList = app.globalData.postDetailData
      console.log('postDetailList', postDetailList)

      let post = postDetailList.filter((post) => {
        return post.id === postId
      })
      console.log('post', post)
      this.setData({
        currentPost: post && post[0] // 是含有一个对象的数组
      })
      console.log('post', this.data.currentPost)
  }
})