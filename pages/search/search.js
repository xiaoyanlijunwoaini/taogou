const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotKeywords: [],
    history: [],
    name_focus: true,
    search: '搜索',
    input_value: '', //value值
    inpuVal: "",//input框内值
    keydown_number: 0
    //检测input框内是否有值
  },
  inputValue: function (e) {

    this.setData({
      inpuVal: e.detail.value
    })
    if (e.detail.cursor != 0) {
      this.setData({
        search: '搜索',
        keydown_number: 1
      })
    } else {
      this.setData({
        search: '取消',
        keydown_number: 0
      })
    }
  },
  searchTap: function () {
    if (this.data.keydown_number == 1) {
      let _this = this;
      let arr = this.data.history;
      //判断是手动输入的还是点击赋值
      if (this.data.input_value == "") {
        //判断是否已经存在
        let arrnum = arr.indexOf(this.data.inpuVal);
        if (arrnum != -1) {
          //删除已存在后重新插入至数组
          arr.splice(arrnum, 1)
          arr.unshift(this.data.inpuVal);
        } else {
          arr.unshift(this.data.inpuVal);
        }
      } else {
        let arr_num = arr.indexOf(this.data.input_value);
        if (arr_num != -1) {
          arr.splice(arr_num, 1)
          arr.unshift(this.data.input_value);
        } else {
          arr.unshift(this.data.input_value);
        }
      }
      //存储搜索记录
      wx.setStorage({
        key: 'history_arr',
        data: arr,
      })
      //取出搜索记录
      wx.getStorage({
        key: 'history_arr',
        success: function (res) {
          _this.setData({
            history: res.data
          })
        },
      })
      this.setData({
        input_value: '',
      })
    } else {
      console.log("取消")
    }
  },
  //清除最近搜索
  deleteTap: function () {
    this.setData({
      history: []
    });
    //清空缓存
    wx.removeStorage({
      key: 'history_arr',

    })
  },
  //点击热门词出现在输入框里
  this_value: function (e) {
    this.setData({
      name_focus: true
    })
    let value = e.currentTarget.dataset.text;
    this.setData({
      input_value: value,
      search: "搜索",
      keydown_number: 1
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    wx.getStorage({
      key: 'history_arr',
      success: function (res) {
        _this.setData({
          history: res.data
        })
      },
    })

    /*
    wx.request({
        url: 'https://www.easy-mock.com/mock/5ca45b48dd01db46f481d8a2/hot/words',
        data: {},
        method: "GET",
        success: function (res) {
          _this.setData({
            hotKeywords: res.data.data.words
          })
        }
      })
     */
  },
  hideInput: function () {
    wx.navigateTo({
      //跳转，返回主页面路径
      url: '/index/index'
    })
  }
})