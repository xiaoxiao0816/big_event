$(function() {
    let form = layui.form
    let layer = layui.layer
    form.verify({
        nickname: function(value) {
            if(value.lenggth > 6){
                return '长度必须在1~6个字符之间!'
            }
        }
    })

    initUserInfo()

    function initUserInfo() {
        $.ajax({
            method:'get',
            url: '/my/userinfo',
            success:function(res) {
                if(res.status !== 0){
                    return layer.msg(res.message)
                }
                form.val('formUserInfo',res.data)
                console.log(res);
            }
        })
    }

    $('#btnreset').on('click', function(e) {
        e.preventDefault()
        initUserInfo()
    })
    $('.layui-form').on('submit', function(e){
        e.preventDefault()
        $.ajax({
            method:'post',
            url:'/my/userinfo',
            data:$(this).serialize(),
            success:function(res) {
                if(res.status !== 0){
                    return layer.msg(res.message)
                }
                layer.msg('修改用户信息成功!')
                // console.log(res)
                // console.log(window.parent);
                window.parent.getUserinfo()
                console.log(res);
            }
        })
    })
})

