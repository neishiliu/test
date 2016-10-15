/**
* Created by vincent on 15/3/23.
*/
var device_id;
var onDeviceReady   = function(){
    console.log("JPushPlugin:Device ready!");
    //alert("JPushPlugin:Device ready!");
    initiateUI();
}

//ios打开通知的回调方法
var onReceiveNotification = function(event){
    try{
        var alert_text = event.aps.alert;
        var badge = event.aps.badge;
        var sound = event.aps.sound;
        var parameters = event.parameters;

        if(parameters.type=="mortgage_followup")
            jump_page(parameters.type, parameters.id);
    }
    catch(exeption){
        console.log(exception)
    }
}
var onGetRegistradionID = function(data) {
    try{
        //console.log("JPushPlugin:registrationID is "+data)
        //alert("device_id:" + data);
        device_id = data;
    }
    catch(exception){
        console.log(exception);
    }
}
var initiateUI = function(){

    try{

        window.plugins.jPushPlugin.init();
        window.plugins.jPushPlugin.setDebugMode(true);

        window.plugins.jPushPlugin.getRegistrationID(onGetRegistradionID);

        //android用户打开通知后的回调方法
        window.plugins.jPushPlugin.openNotificationInAndroidCallback = function(event) {
            var parameters = event.parameters;
            if(parameters.type=="mortgage_followup")
                jump_page(parameters.type, parameters.id);
        }
        //android接收应用内信息的回调方法
        window.plugins.jPushPlugin.receiveMessageInAndroidCallback = function(data) {
            alert("receive message:" + JSON.parse(data));
        }

        //iso接收应用内信息的回调方法
        window.plugins.jPushPlugin.receiveMessageIniOSCallback = function(data) {
            alert("receive message:" + JSON.parse(data));
        }

    }
    catch(exception){
        alert(JSON.stringify(exception));
        console.log(exception);
    }
}
document.addEventListener("jpush.receiveNotification", onReceiveNotification, false);
//document.addEventListener("jpush.setTagsWithAlias", onTagsWithAlias, false);
document.addEventListener("deviceready", onDeviceReady, false);
//document.addEventListener("jpush.openNotification", onOpenNotification, false);
