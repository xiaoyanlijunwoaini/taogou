Page({
  data: {
    newsList: [],
    HomeIndex: 0
  },
  onLoad: function () {
    var that = this;
    wx.request({
      url: 'http://localhost:81/weicms/index.php?s=/addon/School/School/getList',
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        wx.setStorage({
          key: 'newsList',
          data: res.data,
        })
        that.setData({
          newsList: res.data
        })
      }
    })
    wx.request({
      url: 'http://localhost:81/weicms/index.php?s=/addon/Share/Share/getList',
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        wx.setStorage({
          key: 'sharesList',
          data: res.data,
        })
        that.setData({
          shareList: res.data
        })
      }
    })
    wx.request({
      url: 'http://localhost:81/weicms/index.php?s=/addon/Weixin/Weixin/getList',
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        wx.setStorage({
          key: 'weixinList',
          data: res.data,
        })
        that.setData({
          weixinList: res.data
        })
      }
    })
    wx.request({
      url: 'http://localhost:81/weicms/index.php?s=/addon/Netearn/Netearn/getList',
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        wx.setStorage({
          key: 'netearnList',
          data: res.data,
        })
        that.setData({
          netearnList: res.data
        })
      }
    })
    wx.request({
      url: 'http://localhost:81/weicms/index.php?s=/addon/Economy/Economy/getList',
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        wx.setStorage({
          key: 'economyList',
          data: res.data,
        })
        that.setData({
          economyList: res.data
        })
      }
    })
  },
  //搜索方法 key为用户输入的查询字段
  search: function (key) {
    /*console.log('搜索函数触发')*/
    var that = this;
    var newsList = wx.getStorage({
      key: 'newsList',
      success: function (res) {//从storage中取出存储的数据*/
        /*console.log(res)*/
        if (key == '') {//用户没有输入 全部显示
          that.setData({
            newsList: res.data
          })
          return;
        }
        var arr = [];//临时数组 用于存放匹配到的数据
        for (let i in res.data) {
          if (res.data[i].title.indexOf(key) >= 0) {//查找
            arr.push(res.data[i])
          }
        }
        if (arr.length == 0) {
          that.setData({
            newsList: []
          })
        } else {
          that.setData({
            newsList: arr//在页面显示找到的数据
          })
        }
      }
    })
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  wxSearchInput: function (e) {
    this.search(e.detail.value);
    console.log(e.detail.value)
  },
  wxSerchFocus: function (e) {
    this.search(e.detail.value);
  },
  wxSearchBlur: function (e) {
    this.search(e.detail.value);
  },
  wxSearchFn: function (e) {
    /*console.log(e)*/
  },
  boxtwo: function (e) {
    var index = parseInt(e.currentTarget.dataset.index)
    this.setData({
      HomeIndex: index
    })
  }
})