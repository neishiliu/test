/**
 * Created by vincent on 15/10/29.
 */
/**
 * Created by vincent on 15/9/26.
 */
 var corporation = '';
 var currentUser = {};
 var isPhonegap = true;
APP = {
    // OAUTH_HOST: 'https://szapi.vanke.com',
    // API_HOST: 'https://szapi.vanke.com/ebank',
    //SITE_HOST: 'http://localhost:9995',
    SITE_HOST: 'http://szm.vanke.com',
    PUBLISH_TYPE: "web",
    OAUTH_HOST: 'http://localhost:8096',
    API_HOST: 'http://localhost:8096/ebank',
    CLIENT_ID: '55152e1575c84823d00be4cb',
    CLIENT_SECRET: 'fbad963a5448a97c7b5f659094af5e93',
    TIMEOUT: 30000
};

/*******************************************************************************
 * 初始化framework7
 ******************************************************************************/
var myApp = new Framework7({
    modalTitle: '银企通',
    modalButtonOk: "确定",
    modalButtonCancel: "取消",
    smartSelectBackTemplate: '<div class="left sliding"><a href="#" class="back link"><i class="icon ti-angle-left"></i><span><img src="assets/img/back.png"></span></a></div>',
    smartSelectBackText: "返回",
    smartSelectPopupCloseText: "",
    animateNavBackIcon: true,
    //template7Pages: true,
    precompileTemplates: true,
    smartSelectBackOnSelect :true
});
// 如果我们需要使用定义DOM库,让我们将其保存到$ $变量:
var $$ = Framework7.$;

// 添加视图
var mainView = myApp.addView('.view-main', {

  // 因为我们想使用动态导航,我们需要启用这个观点
    dynamicNavbar: true,
// 禁用页面切换之间的动画
  // animatePages: false
  // domCache: true ,//enable inline pages
});
//设置初始页面
// mainView.router.loadPage('login.html');
// Expose Internal DOM library
var $$ = Dom7;
var chart = null;
// Add main view
// Add another view, which is in right panel
// var rightView = myApp.addView('.view-right', {
//     // Enable Dynamic Navbar for this view
//     dynamicNavbar: true
// });
// mainView.hideToolbar();

//执行Ajax接口调用的时候，显示加载指示器
$(document).on('ajaxStart', function (e) {
    myApp.showIndicator();
});
//执行Ajax接口调用完毕后，隐藏加载指示器
$(document).on('ajaxComplete', function () {
    myApp.hideIndicator();
});
//执行Ajax接口调用出错后，隐藏加载指示器
$(document).on('ajaxError', function () {
    myApp.hideIndicator();
});

/*******************************************************************************
 * 扩展myApp, 增加 user 属性
 ******************************************************************************/
Object.defineProperty(myApp, "user", {
    set: function (item) {
        localStorage.setItem('EBANK_CURRENT_USER',JSON.stringify(item));
    },
    get: function () {
        return JSON.parse(localStorage.getItem('EBANK_CURRENT_USER'));
    },
    enumerable: true,
    configurable: true
});

/*******************************************************************************
 * 扩展myApp, 增加 default_project 属性
 ******************************************************************************/
Object.defineProperty(myApp, "default_project", {
    set: function (item) {
        localStorage.setItem('DEFAULT_PROJECT',JSON.stringify(item))
    },
    get: function () {
        return JSON.parse(localStorage.getItem('DEFAULT_PROJECT'));
    },
    enumerable: true,
    configurable: true
});

Object.defineProperty(myApp, "no_data", {
    get: function () {
        return "<div class='no_data1'></div>";
    },
    enumerable: true,
    configurable: true
});

/*******************************************************************************
 * 扩展myApp, 增加 default_project 属性
 * 银行分类
 ******************************************************************************/
Object.defineProperty(myApp, "default_category", {
    set: function (item) {
        localStorage.setItem('EBANK_DEFAULT_CATEGORY',JSON.stringify(item))
    },
    get: function () {
        return JSON.parse(localStorage.getItem('EBANK_DEFAULT_CATEGORY'));
    },
    enumerable: true,
    configurable: true
});

/*******************************************************************************
 * 清除本地存储的数据
 ******************************************************************************/
myApp.cleanStorage = function () {
    console.log("Begin clean storage ...");
    localStorage.removeItem('EBANK_API_TOKEN_DATA');
    localStorage.removeItem('EBANK_CURRENT_USER');
    localStorage.removeItem('EBANK_DEFAULT_CATEGORY');
    localStorage.removeItem('EBANK_APP_CACHE_DATA');
    //$$("#divCategories").html("");
    console.log("Clean storage completed!");
};

