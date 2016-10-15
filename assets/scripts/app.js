
if (myApp.user) {
    mainView.router.loadPage('show.html');
} else {
    mainView.router.loadPage('show.html');
};

//回调函数，当Framework7初始化页面的组件的时候会调用这个回调。
$$(document).on('pageInit', function (e) {
  // 从事件数据获取页面数据
  var page = e.detail.page;
 
  if (page.name === 'login') {
      mainView.hideNavbar();   
  };
  if (page.name === 'registered') {
      mainView.showNavbar();   
  };
  if (page.name === 'home') {
      mainView.showNavbar();   
  };
});

//底部工具栏
$('.toolbar').children('.toolbar-inner').find('a').click(function(){
    $(this).addClass("active").siblings("a").removeClass("active");
    $('.toolbar').children('.toolbar-inner').find('i').removeClass("navbar_icon");
    $(this).children('i').addClass("navbar_icon");
});

$$(".toolbar").find('a').on('click', function(){
    mainView.router.loadPage($$(this).data("page"));
});

/*********************登录页面*********************/
myApp.onPageAfterAnimation('login',function(){
  // mainView.hideNavbar();
  //模拟帐号
  var me = {username:"1",password:"1"}
  //enter键触发登录按钮
  $$("body").keydown(function (event) {
        if (event.keyCode == "13") {
            $$(".sure").click();
        }
  });
  $$('.sure').click(function(){
    var button = this,
        loginName = $$('#login_username').val(),
        password = $$('#login_password').val();
    // var password_md5 = $.md5(password);
    // console.log(password_md5)
    $$(button).addClass('disabled');
    if(loginName == '' || password == ''){
      myApp.alert("账户或密码名不能为空");
      $$(button).removeClass('disabled');
      return;
    };
    if(loginName == me.username && password == me.password){
      console.log(1);
      mainView.router.loadPage('home.html');
    }else{
      myApp.alert("帐号或密码错误");
      $$(button).removeClass('disabled');
    }
  });
});
/*********************注册页面*********************/
myApp.onPageAfterAnimation('registered',function(){
  $('.navbar').show();
  //身份dom操作
  $('.token_tab').find('li').click(function(){
    $(this).addClass('active').siblings().removeClass('active');
  })
  //验证码
  $('.token_tab_button').click(function(){
    var that= $(this);
    $(that).attr("disabled","disabled");
    var countdown = 60;
    var cleartime = setInterval(countDown,1000);
    function countDown(){
      countdown--;
      var html = countdown+"秒后可以重发";
      $('.token_tab_button').val(html);
      if(countdown == 0){
        clearTimeout(cleartime);
        $(that).removeAttr("disabled");
      };
    };
  });
});

/**************主页*********************/
myApp.onPageInit('home', function(page) {
  //获取朋友列表宽度
  var peoplewidth = $(".people_row").length*198;
      $('.people_list').width(peoplewidth);

  //更多
  $$('.friend_more').on('click', function () {
      var buttons1 = [
        {
            text: '屏蔽',
            bold: true,
            onClick: function () {
                myApp.alert('事件1');
            }
        },
        {
            text: '举报',
            onClick: function () {
                myApp.alert('事件2');
            }
        }
      ];
      var buttons2 = [
        {
            text: '取消',
            color: 'red',
        }
      ];
      var groups = [buttons1, buttons2];
      myApp.actions(groups);
  });

});
/*********************项目主页*********************/
myApp.onPageInit('project_index', function(page) {
    //li标签点击事件
    $('.project_nav_li').on('click', function (){
        $(this).addClass('project_active').siblings().removeClass('project_active');
        $(this).removeClass('project_nav_li').siblings('.navli').addClass('project_nav_li');
    });

    //弹出层点击事件
    $('.more').click(function(){
      $('.popup_box').slideToggle(200);
      $('.project_list').slideToggle(200);
    });
    $('.areaul').children('li').on('click',function(){
      $(this).addClass('areaul_active').siblings().removeClass('areaul_active');
    });
    $$('.reset').on('click',function(){
      $('.areaul').children('li').removeClass('areaul_active');
    });
});

/*********************项目主页图片页*********************/
myApp.onPageInit('project_index_img', function(page) {
    //li标签点击事件
    $('.project_nav_li').on('click', function (){
        $(this).addClass('project_active').siblings().removeClass('project_active');
        $(this).removeClass('project_nav_li').siblings('.navli').addClass('project_nav_li');
    });

    //弹出层点击事件
    $('.more').click(function(){
      $('.popup_box').slideToggle(200);
      $('.project_list').slideToggle(200);
    });
    $('.areaul').children('li').on('click',function(){
      $(this).addClass('areaul_active').siblings().removeClass('areaul_active');
    });
    $$('.reset').on('click',function(){
      $('.areaul').children('li').removeClass('areaul_active');
    });
});

/*********************品牌详情页*********************/
myApp.onPageAfterAnimation('details_brand',function(page){
  //门店分布图片浏览
  var storePhotoBrowserDark = myApp.photoBrowser({
        photos : [
            '../assets/img/bg1.jpg',
            '../assets/img/bg2.jpg',
            '../assets/img/bg3.jpg',
        ],
        theme: 'dark',
        backLinkText:'返回',
        ofText:'/',
        captionsTheme:'light'
      });
      $$('.details_info').eq(0).on('click', function () {
        storePhotoBrowserDark.open();
      });
  //品牌形象图片浏览
  var brandPhotoBrowserDark = myApp.photoBrowser({
        photos : [
            '../assets/img/bg1.jpg',
            '../assets/img/bg2.jpg',
        ],
        theme: 'dark',
        backLinkText:'返回',
        ofText:'/',
        captionsTheme:'light'
      });
      $$('.details_info').eq(1).on('click', function () {
        brandPhotoBrowserDark.open();
      });
  //信息展开
  $('.accordion-item').children('a').children().click(function(){
    var thisState = $(this).attr("class");
        if(thisState == "details_row details_info"){
          $(this).addClass("details_active");
        }else{
          $(this).removeClass("details_active");
        };
  });

});

/*********************项目详情页*********************/
myApp.onPageAfterAnimation('details_project',function(page){
  //门店分布图片浏览
  var storePhotoBrowserDark = myApp.photoBrowser({
        photos : [
            '../assets/img/bg1.jpg',
            '../assets/img/bg2.jpg',
            '../assets/img/bg3.jpg',
        ],
        theme: 'dark',
        backLinkText:'返回',
        ofText:'/',
        captionsTheme:'light'
      });
      $$('.details_info').eq(0).on('click', function () {
        storePhotoBrowserDark.open();
      });
  //品牌形象图片浏览
  var brandPhotoBrowserDark = myApp.photoBrowser({
        photos : [
            '../assets/img/bg1.jpg',
            '../assets/img/bg2.jpg',
        ],
        theme: 'dark',
        backLinkText:'返回',
        ofText:'/',
        captionsTheme:'light'
      });
      $$('.details_info').eq(1).on('click', function () {
        brandPhotoBrowserDark.open();
      });
  //信息展开
  $('.accordion-item').children('a').children().click(function(){
    var thisState = $(this).attr("class");
        if(thisState == "details_row details_info"){
          $(this).addClass("details_active");
        }else{
          $(this).removeClass("details_active");
        };
  });

});

/*********************发布页*********************/
myApp.onPageAfterAnimation('issue_project',function(page){
  //日期选择
  var calendarDateFormat = myApp.calendar({
    input: '#calendar-date-format',
    dateFormat: 'yyyy年,m月dd日',
    closeOnSelect:true
  });   
});

/*********************未登录首页*********************/
myApp.onPageAfterAnimation('show',function(page){
  //日期选择
  $('.headinfo').click(function(){
    myApp.alert("未登录，请登录",function(){
      mainView.loadPage("login.html");
    });
  });
  $('.logoin').click(function(){
    myApp.alert("未登录，请登录",function(){
      mainView.loadPage("login.html");
    });
  }); 
});

/*********************未登录首页*********************/
myApp.onPageAfterAnimation('validation',function(page){
  //日期选择
  $('.add_img').click(function(){
    $('.imgclick').click();
  });
  $('.imgclick').change(function(){
      var inputvalue = $('.imgclick').val() ;
      $('.imgurl').val(inputvalue) ;
    });
});

