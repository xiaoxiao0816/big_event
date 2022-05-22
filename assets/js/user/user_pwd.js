$(function() {
    let form = layui.form
    let layer = layui.layer
    form.verify({
        pass:[
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ],
        samepwd:function(value) {
            if(value === $('[name=oldPwd]').val()){
                return '新旧密码不能一致'
            }
        },
        repwd:function(value) {
            if(value !== $('[name=newPwd]').val()){
                return '两次密码不一致'
            }
        }
    })
    $('.layui-form').on('submit',function(e) {
        e.preventDefault()
        $.ajax({
            method:'post',
            url:'http://api-breakingnews-web.itheima.net/my/updatepwd',
            data:$(this).serialize(),
            headers:{Authorization:localStorage.getItem('token')},
            success:function(res){
                if(res.status !== 0){
                    return layer.msg('原密码错误')
                    
                }
                layer.msg('修改密码成功')
                $('.layui-form')[0].reset()
            }
        })

        
    })
})