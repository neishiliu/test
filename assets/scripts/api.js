/**
 * Created by vincent on 15/9/26.
 */
(function(myApp) {
    myApp.api = {

        corporation: "szdc",
        /**
         * 获取接口访问token
         * @param username  用户名
         * @param password  密码
         * @param device_id 设备标识
         * @param cb
         */
        ajax_call: function( url, method, data, async, cb) {
            // var self = this;
            // self.getApiToken(function(err, token) {
            //     if (err)
            //         cb("获取数据失败，请重新获取");
                //console.log("call:" + JSON.stringify(token));
                $.ajax({
                    url: APP.OAUTH_HOST + url,
                    method: method,
                    crossDomain: true,
                    dataType: 'json',
                    async: async,
                    //contentType: 'application/x-www-form-urlencoded; charset=UTF-8',   //发送的格式在f7中不能在头部设置, 设置后发送数据会有问题*/
                    data: data ? data : null,
                    headers: {
                        'Accept': 'application/json; charset=utf-8'
                        // 'Authorization': 'Bearer ' + token.access_token,
                        // 'Corporation-Id': self.corporation
                    },
                    timeout: APP.TIMEOUT,
                    success: function(result, status) {
                        console.log(result);
                        console.log(status);
                        cb(null, result);
                    },
                    error: function(jqXHR, textStatus) {
                        cb(textStatus, null);
                        console.log(textStatus);
                        /*if (textStatus === 'timeout') {
                            cb("error");
                            //cb(textStatus);
                        }
                        count++;
                        if (count < 5)
                            self.ajax_call(count, url, method, data, cb);
                        else
                            cb(textStatus);*/
                    }
                });
            // });
        },

        call: function(url, method, data, async, cb) {
            var self = this;
            self.ajax_call(0, url, method, data, async, cb);
        },

        /**
         * 获取当前账户的个人信息
         * @param cb
         */
        getProfile: function(user_name,password,cb) {

            var url = "/api/v1/users";

            var self = this;

            var params = {
                    user_name: user_name,
                    password: password
                };

            self.ajax_call(url, 'GET', params, false, function(err, item) {
                if (err)
                    return cb(err);
                else
                    cb(null, item.data);

            });
        },
        removeDevice: function(device_id, cb) {
            var url = "/tasks/v1/devices/" + device_id;
            this.call(url, 'DELETE', null, false, function(err, result) {
                if (err)
                    return cb(err);
                cb(null, result);
            });
        },
        //获取活动动态
        getActive: function(cb) {
            var url = "/api/v1/activities?page_size=0&page_number=0&business_type=news";
            var self = this;
            self.call(url, 'GET', null, false, function(err, result) {
                if (err)
                    return cb(err);
                cb(null, result);
            })
        },
        //获取动态详情
        getActiveInfo: function(id, cb) {
            var id = id;
            var url = "/api/v1/activities/" + id;
            var self = this;
            self.call(url, 'GET', null, true, function(err, result) {
                if (err)
                    return cb(err);
                cb(null, result);
            })
        },
        //获取运动圈
        getFriends: function(page_number, page_size, cb) {
            var url = "/api/v1/common/albums?activity_id=" + APP.ACTIVE_ID + "&page_size=" + page_size + "&page_number=" + page_number;
            url += "&order_by=created_at&format=all";
            var self = this;
            self.getApiToken(function(err, token) {
                    if (!err) {
                        $.ajax({
                            url: APP.OAUTH_HOST + url,
                            type: "GET",
                            async: true,
                            headers: {
                                'Accept': 'application/json; charset=utf-8',
                                'Authorization': 'Bearer ' + token.access_token,
                                'Corporation-Id': self.corporation
                            },
                            timeout: 5000,
                            dataType: "json",
                            success: function(data) {
                                cb(null, data);
                            },
                            error: function(data) {
                                cb(data, null);
                            }
                        })
                    }
                })
                /*self.call(url, 'GET', null, false, function(err, result) {
                    if (err)
                        return cb(err);
                    cb(null, result);
                })*/
        },
        //获取活动的运动圈
        getActiveFriends: function(active_id, page_number, page_size, cb) {
            var url = "/api/v1/common/albums?activity_id=" + active_id + "&page_size=" + page_size + "&page_number=" + page_number;
            url += "&order_by=created_at&format=all";
            var self = this;
            self.call(url, 'GET', null, true, function(err, result) {
                if (err)
                    return cb(err);
                cb(null, result);
            })
        },
        //获取协会信息
        getClub: function(cb) {
            var url = "/api/v1/organization/teams?page_size=0&page_number=0";
            var self = this;
            self.call(url, 'GET', null, false, function(err, result) {
                if (err)
                    return cb(err);
                cb(null, result);
            })
        },
        //获取协会详情
        getClubInfo: function(id, cb) {
            var url = "/api/v1/organization/teams/" + id;
            var self = this;
            self.call(url, 'GET', null, false, function(err, result) {
                if (err)
                    return cb(err);
                cb(null, result);
            })
        },
        //获取排行榜数据
        getList: function(filter, cb) {
            var url = "/api/v1/common/albums/owners/" + filter.params + "/top/10?activity_id=54b5564ebb502e0025e918cb&begin=" + filter.begin + "&end=" + filter.end;
            var self = this;
            self.call(url, 'GET', null, false, function(err, result) {
                if (err)
                    return cb(err);
                cb(null, result);
            })
        },
        //获取当月打卡日期
        getCardDate: function(begin_date, end_date, cb) {
            var url = "/vvsports/v1/albums/aggregate";
            var data = {
                "periods": "year|month|day",
                "begin": begin_date,
                "end": end_date,
                "loginname": myApp.user.loginname
            };
            var self = this;
            self.call(url, 'GET', data, false, function(err, result) {
                if (err)
                    return cb(err);
                cb(null, result);
            })
        },
        //获取当月活动日期
        getActiveDate: function(begin_date, end_date, cb) {
            var url = "/vvsports/v1/dynamic/aggregate";
            var data = {
                "periods": "year|month|day",
                "begin": begin_date,
                "end": end_date
            };
            var self = this;
            self.call(url, 'GET', data, false, function(err, result) {
                if (err)
                    return cb(err);
                cb(null, result);
            })
        },

        //获取当日活动
        getTodyActive: function(begin_date, end_date, cb) {
            var url = "/api/v1/activities?business_type=news";
            var data = {
                "apply_begin_at_begin": begin_date,
                "apply_begin_at_end": end_date
            };
            var self = this;
            self.call(url, 'GET', data, true, function(err, result) {
                if (err)
                    return cb(err);
                cb(null, result);
            })
        },
        //获取当日打卡信息
        getTodyCard: function(begin_date, end_date, loginname, cb) {
            var url = "/api/v1/common/albums?activity_id=54b5564ebb502e0025e918cb";
            var data = {
                "created_at_begin": begin_date,
                "created_at_end": end_date,
                "provider": "employee",
                "account": loginname
            };
            var self = this;
            self.call(url, 'GET', data, true, function(err, result) {
                if (err)
                    return cb(err);
                cb(null, result);
            })
        },
        //提交专辑
        postAlbum: function(zjjsonstr, cb) {
            var url = "/api/v1/common/albums";
            var data = zjjsonstr;
            var self = this;
            self.call(url, 'POST', data, false, function(err, result) {
                if (err)
                    return cb(err);
                cb(null, result);
            })
        },
        postImage: function(zbimgjson, cb) {
            var url = "/api/v1/common/documents";
            var data = zbimgjson;
            var self = this;
            self.call(url, 'POST', data, false, function(err, result) {
                if (err)
                    return cb(err);
                cb(null, result);
            })
        },
        //提交评论，点赞
        postComment: function(album_id, comment, cb) {
            var url = "/api/v1/common/album/" + album_id + "/comments";
            var data = comment;
            var self = this;
            self.call(url, 'POST', data, false, function(err, result) {
                if (err)
                    return cb(err);
                cb(null, result);
            })
        },
        //获取图片详情
        getAlbum: function(album_id, cb) {
            var url = "/api/v1/common/albums/" + album_id + "/documents?page_size=0&page_number=0";
            var self = this;
            self.call(url, 'GET', null, false, function(err, result) {
                if (err)
                    return cb(err);
                cb(null, result);
            })
        },

        //获取活动成员
        getActiveMenmber: function(active_id, cb) {
            var url = "/api/v1/activities/" + active_id + "/members?page_size=0&page_number=0";
            var self = this;
            self.call(url, 'GET', null, false, function(err, result) {
                if (err)
                    return cb(err);
                cb(null, result);
            })

        },
        //活动报名
        ApplyActive: function(active_id, applyer, cb) {
            var url = "/api/v1/activities/" + active_id + "/apply";
            var self = this;
            var data = applyer;
            /*            self.call(url, 'POST', data, false, function(err, result) {
                            if (err)
                                return cb(err);
                            cb(null, result);
                        });*/
            self.getApiToken(function(err, token) {
                if (!err) {
                    $.ajax({
                        url: APP.OAUTH_HOST + url,
                        type: "POST",
                        async: false,
                        beforeSend: function(xhr) {
                            xhr.setRequestHeader("Content-Type", "application/json");
                            xhr.setRequestHeader("Accept", "application/json; charset=utf-8");
                            xhr.setRequestHeader("Authorization", "Bearer " + token.access_token);
                            xhr.setRequestHeader("Corporation-Id", "szdc");
                        },
                        dataType: "json",
                        data: JSON.stringify(data),
                        success: function(data) {
                            cb(null, data);
                        },
                        error: function(data) {
                            cb(data.status, null);
                        }
                    })
                }
            })
        },
        //取消活动报名
        removeApply: function(active_id, member_id, cb) {
            var url = APP.API_HOST + "/activities/" + active_id + "/members/" + member_id;
            var self = this;
            self.getApiToken(function(err, token) {
                if (!err) {
                    $.ajax({
                        url: url,
                        type: "DELETE",
                        async: false,
                        headers: {
                            'Accept': 'application/json; charset=utf-8',
                            'Authorization': 'Bearer ' + token.access_token,
                            'Corporation-Id': self.corporation
                        },
                        dataType: "json",
                        success: function(data) {
                            cb(null, data);
                        },
                        error: function(data) {
                            cb(null, data.status);
                        }
                    })
                }
            })
        },
        //获取用户信息
        getUser: function(loginname, cb) {
            var url = "/api/v1/organization/employees/" + loginname + "/profile";
            var self = this;
            self.call(url, 'GET', null, false, function(err, result) {
                if (err)
                    return cb(err);
                cb(null, result);
            })
        },

        getLocation: function(lat, lng, cb) {

            var url = "http://api.map.baidu.com/geocoder/v2/?ak=x2H1kpGTbUrGoGnjXHk8jVMa&location=" + lat + "," + lng + "&output=json&pois=1";
            $.ajax({
                url: url,
                method: "GET",
                crossDomain: true,
                dataType: 'json',
                timeout: APP.TIMEOUT,
                success: function(result, status) {
                    cb(null, result);
                },
                error: function(jqXHR, textStatus) {
                    cb(textStatus);
                }
            });
        }


    };
})(myApp || {});
