$(function() {
    getUserinfo()


    let layer = layui.layer
    $('#out').on('click', function() {
        layer.confirm('是否确认退出？', function(index){
            localStorage.removeItem('token')
            location.href = 'file:///Users/panyuying/Desktop/code/%E5%A4%A7%E4%BA%8B%E4%BB%B6/login.html'
            layer.close(index);
          });  
    })
})

function getUserinfo(){
    $.ajax({
        method:'GET',
        url:'/my/userinfo',
        // headers:{
        //     Authorization:localStorage.getItem('token') || ''
        // },
        success:function(res) {
            if(res.status !== 0){
                return layui.layer.msg(res.message)
            }
            //渲染头像部分方法
            renderAvatar(res.data)
        },
        //必须通过登录才能访问后台管理系统
        // complete:function(res) {
        //     if(res.responseJSON.status === 1) {
        //         localStorage.removeItem('token')
        //         location.href = 'file:///Users/panyuying/Desktop/code/%E5%A4%A7%E4%BA%8B%E4%BB%B6/login.html'
        //     }
        // }
    })
}

function renderAvatar(user){
    let username = user.username || nickname
    $('.welcome').html(username)
    if(user.user_pic !== null) {
        //渲染图片头像
        $('.user-text').hide()
        $('.layui-nav-img').attr('src', user.user_pic).show()
    }else{
        $('.layui-nav-img').hide()
        let firstname = username[0].toUpperCase()
        $('.user-text').html(firstname).show()
    }
}