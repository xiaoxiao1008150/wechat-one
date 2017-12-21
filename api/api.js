const prefix = 'http://v3.wufazhuce.com:8000/'
// const end = '?channel=wdj&version=4.0.2&uuid=ffffffff-a90e-706a-63f7-ccf973aae5ee&platform=android'

// const getUrl = (url) => {
//   return  host + url + end
// }
const wxRequest = (params, url) => {
  wx.showToast({
    title: '加载中',
    icon: 'loading'
  })
  wx.request({
    url: url,
    method: params.method || 'GET',
    data: params.data || {},
    header: {
      'Content-Type': 'application/json'
    },
    success: (res) => {
      params.success && params.success(res)
      wx.hideToast()
    },
    fail: (res) => {
      params.fail && params.fail(res)
    },
    complete: (res) => {
      params.complete && params.complete(res)
    }
  })
}

// 获取one标签列表
const getById = (params) => wxRequest(params, prefix + 'api/onelist/idlist/')
// 4625 这个数字要根据每天变化，后期修改
const getOneTagList = (params) => wxRequest(params, prefix + 'api/onelist/' + params.keyDate + '/0')
// 获取阅读列表
const getReadingList = (params) => wxRequest(params, prefix + 'api/channel/reading/more/' + params.id || 0)
// 获取阅读文章的详情
const getReadingDetail = (params) => wxRequest(params, prefix + 'api/essay/' + params.id)
// 获取音乐列表
const getMusicList = (params) => wxRequest(params, prefix + 'api/channel/music/more/' +  params.id || 0)
// 获取音乐详细信息
const getMusicDetail = (params) => wxRequest(params, prefix + 'api/music/detail/' + params.id )
// 获取影视列表
const getMovieList = (params) => wxRequest(params, prefix + 'api/channel/movie/more/' +  params.id || 0)
// 获取影视详情
const getMovieDetail = (params) => wxRequest(params, prefix + 'api/movie/detail/' + params.id )
// 获取 莫类型的 评论
const getComment = (params) => wxRequest(params, prefix + 'api/comment/praiseandtime/'+ params.channel +'/'+params.id + '/' + params.lastId || 0 )
// 按日期mm-dd-hhhh获取essay
const getEssayByDate = (params) => wxRequest(params, prefix + 'api/essay/bymonth/' + params.date )


module.exports = {
  getById,
  getOneTagList,
  getReadingList,
  getReadingDetail,
  getMusicList,
  getMusicDetail,
  getMovieList,
  getMovieDetail,
  getComment,
  getEssayByDate
}














