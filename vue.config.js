module.exports = {
    configureWebpack: {
        devServer: {
            //MOCK接口编写的地方
            //每次做更改这个配置文件的时候，都必须重启项目才会生效

            before(app) {
                //模拟用户列表接口信息+分页
                var userlist = [{
                        "id": 12,
                        "UserName": "deng",
                        "Password": "123456",
                        "CreateTime": "0001/1/1 星期一 0:00:00",
                        "RoleName": "",
                        "Mobile": "",
                        "Email": "",
                        "MgState": false
                    }, {
                        "id": 11,
                        "UserName": "admib",
                        "Password": "123456",
                        "CreateTime": "0001/1/1 星期一 0:00:00",
                        "RoleName": "",
                        "Mobile": "",
                        "Email": "",
                        "MgState": true
                    }, {
                        "id": 10,
                        "UserName": "deng",
                        "Password": "123456",
                        "CreateTime": "0001/1/1 星期一 0:00:00",
                        "RoleName": "",
                        "Mobile": "",
                        "Email": "",
                        "MgState": false
                    }, {
                        "id": 8,
                        "UserName": "5555",
                        "Password": "555555",
                        "CreateTime": "0001/1/1 星期一 0:00:00",
                        "RoleName": "",
                        "Mobile": "13312311231",
                        "Email": "55@qq.com",
                        "MgState": true
                    }, {
                        "id": 7,
                        "UserName": "3333",
                        "Password": "333333",
                        "CreateTime": "0001/1/1 星期一 0:00:00",
                        "RoleName": "",
                        "Mobile": "13388888888",
                        "Email": "33@qq.com",
                        "MgState": false
                    }, {
                        "id": 6,
                        "UserName": "2222",
                        "Password": "222222",
                        "CreateTime": "0001/1/1 星期一 0:00:00",
                        "RoleName": "",
                        "Mobile": "13845644564",
                        "Email": "22@qq.com",
                        "MgState": true
                    }, {
                        "id": 4,
                        "UserName": "deng",
                        "Password": "123456",
                        "CreateTime": "0001/1/1 星期一 0:00:00",
                        "RoleName": "",
                        "Mobile": "",
                        "Email": "",
                        "MgState": false
                    }, {
                        "id": 3,
                        "UserName": "den",
                        "Password": "",
                        "CreateTime": "0001/1/1 星期一 0:00:00",
                        "RoleName": "",
                        "Mobile": "13812341235",
                        "Email": "888888@qq.com",
                        "MgState": true
                    }, {
                        "id": 2,
                        "UserName": "admin",
                        "Password": "",
                        "CreateTime": "0001/1/1 星期一 0:00:00",
                        "RoleName": "",
                        "Mobile": "13812341888",
                        "Email": "288888@qq.com",
                        "MgState": false
                    }, {
                        "id": 1,
                        "UserName": "deng",
                        "Password": "123456",
                        "CreateTime": "0001/1/1 星期一 0:00:00",
                        "RoleName": "超级管理员",
                        "Mobile": "13602221234",
                        "Email": "223456@qq.com",
                        "MgState": true
                    }]
                    //删除用户的接口
                app.get('/api/deleteuser', (req, res) => {
                    const { id, query, pagenum, pagesize } = req.query
                    if (userlist) {
                        for (var i = 0; i < userlist.length; i++) {
                            if (userlist[i].id == id)
                                userlist.splice(i, 1)
                        }
                    }
                    userlist.sort(function(a, b) {
                        return b.id - a.id //把userlist降序排列
                    })

                    var total = userlist.length
                    if (pagenum == 0) {
                        newDataList = userlist.slice(pagenum * pagesize, (parseInt(pagenum) + 1) * pagesize)
                    } else
                        newDataList = userlist.slice((parseInt(pagenum) - 1) * pagesize, pagenum * pagesize)

                    res.json({
                        'status': 'ok',
                        'total': total,
                        'data': newDataList
                    })
                })

                //修改用户信息的接口
                app.get('/api/updateuser', (req, res) => {
                    const { id, username, password, email, mobile, query, pagenum, pagesize } = req.query
                    if (userlist) {
                        userlist.filter(u => u.id == id).forEach(element => {
                            element.UserName = username
                            element.Email = email
                            element.Mobile = mobile
                        })
                    }
                    var total = userlist.length
                    if (pagenum == 0) {
                        newDataList = userlist.slice(pagenum * pagesize, (parseInt(pagenum) + 1) * pagesize)
                    } else
                        newDataList = userlist.slice((parseInt(pagenum) - 1) * pagesize, pagenum * pagesize)

                    res.json({
                        'status': 'ok',
                        'total': total,
                        'data': newDataList
                    })
                })

                //添加用户信息的接口
                app.get('/api/adduser', (req, res) => {
                        const { username, password, email, mobile, query, pagenum, pagesize } = req.query
                        var id = userlist[0].id
                        var adduser = {
                            "id": id + 1,
                            "UserName": username,
                            "Password": password,
                            "CreateTime": "0001/1/1 星期一 0:00:00",
                            "RoleName": "超级管理员",
                            "Mobile": mobile,
                            "Email": email,
                            "MgState": true
                        }
                        userlist.push(adduser)
                            //排序userlist
                        userlist.sort(function(a, b) {
                            return b.id - a.id //把userlist降序排列
                        })
                        total = userlist.length
                        var newDataList = []
                        if (pagenum == 0) {
                            newDataList = userlist.slice(pagenum * pagesize, (parseInt(pagenum) + 1) * pagesize)
                        } else
                            newDataList = userlist.slice((parseInt(pagenum) - 1) * pagesize, pagenum * pagesize)
                            //向前端反馈的数据
                        res.json({
                            'total': total,
                            'data': newDataList
                        })
                    })
                    //修改用户状态的接口
                app.get('/api/userupdate', (req, res) => {
                    const { id, MgState } = req.query
                    var count = 0
                    var newState = ''
                    if (userlist) {
                        var user = userlist.filter(u => u.id == id)
                        count = user.length
                        user.MgState = MgState
                        newState = user.MgState
                    }
                    res.json({
                        'count': count,
                        'newState': newState
                    })
                })
                app.get('/api/users', (req, res) => {
                        const { query, pagenum, pagesize } = req.query

                        var total = 0
                            //注意：(parseInt(pagenum) + 1) 两个数相加时，
                            //一定要通过parseInt(pagenum)把传过来的参数转换成int类型
                            //不然如pagenum为1 ，会出现这样错误：pagenum + 1=11。
                        var newDataList = []
                        if (query != '') {
                            total = userlist.filter(u => u.UserName == query).length
                            if (pagenum == 0) {
                                newDataList = userlist.filter(u => u.UserName == query).slice(pagenum * pagesize, (parseInt(pagenum) + 1) * pagesize)
                            } else
                                newDataList = userlist.filter(u => u.UserName == query).slice((parseInt(pagenum) - 1) * pagesize, pagenum * pagesize)
                        } else {
                            total = userlist.length
                            if (pagenum == 0) {
                                newDataList = userlist.slice(pagenum * pagesize, (parseInt(pagenum) + 1) * pagesize)
                            } else
                                newDataList = userlist.slice((parseInt(pagenum) - 1) * pagesize, pagenum * pagesize)
                        }
                        res.json({
                            'status': 'ok',
                            'total': total,
                            'data': newDataList
                        })
                    })
                    //模拟左侧菜单接口
                app.get('/api/menu', (req, res) => {
                    res.json({

                        "status": "ok",
                        "data": [{
                            "id": 1,
                            "name": "用户管理",
                            "child": [{
                                "id": 1,
                                "name": "用户列表",
                                "path": "/users"
                            }]
                        }, {
                            "id": 2,
                            "name": "权限管理",
                            "child": [{
                                "id": 2,
                                "name": "角色列表",
                                "path": "/rote"
                            }, {
                                "id": 3,
                                "name": "权限列表",
                                "path": "/right"
                            }]
                        }, {
                            "id": 3,
                            "name": "商品管理",
                            "child": [{
                                "id": 4,
                                "name": "商品列表",
                                "path": "/product"
                            }, {
                                "id": 5,
                                "name": "分类参数",
                                "path": "/userss"
                            }, {
                                "id": 6,
                                "name": "商品分类",
                                "path": "/producttype"
                            }]
                        }, {
                            "id": 4,
                            "name": "订单管理",
                            "child": []
                        }, {
                            "id": 5,
                            "name": "数据统计",
                            "child": []
                        }]
                    })
                })

                //模拟登陆的一个接口
                let tockenStr = 'dhclass'
                    //(req,res)回调方法，req：请求；res:返回的结果
                app.get('/api/login', (req, res) => {
                    const { username, password } = req.query
                    if (username == 'admin' && password == '123456' ||
                        username == 'dh' && password == '123456') {
                        res.json({
                            code: 0,
                            message: '登陆成功',
                            tocken: tockenStr + '-' +
                                username + '-' +
                                (new Date().getTime() + 60 * 60 * 1000)
                        })
                    } else {
                        res.json({
                            code: 1,
                            message: '账号或密码错误'
                        })
                    }
                })
            }
        }
    }
}