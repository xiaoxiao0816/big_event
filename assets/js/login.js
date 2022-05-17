$(function() {
    $('#go-reg').on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    
    $('#go-login').on('click', function() {
        $('.login-box').show()
        $('.reg-box').hide()
    })
    let form = layui.form
    let layer = layui.layer
    form.verify({
        pass: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ],
        repass: function(value) {
            let val = $('.reg-box [name=password]').val()
            if(val !== value){
                return '两次密码不一致'
            }
        }
    })
    //监听注册表单的提交事件
    $('#form-reg').on('submit', function(e) {
        e.preventDefault()
       
        $.post('/api/reguser',{
            username: $('#form-reg [name=username]').val(),password: $('#form-reg [name=password]').val()},function(res) {
                if(res.status !== 0){
                    return layer.msg(res.message)
                }
                layer.msg('注册成功，请登录')
                console.log($('#form-reg [name=username]').val())
                // 注册成功后  自动跳转到登录界面
                $('#go-login').click()
            }
        )
    
    })
    // 监听登录表单的提交事件
    $('#form-login').on('submit', function(e) {
        e.preventDefault()
        
        $.post('/api/login',{
            username: $('#form-login [name=username]').val(),password: $('#form-login [name=password]').val()},function(res) {
                if(res.status !== 0){
                    return layer.msg(res.message)
                }
                layer.msg('登录成功')
                localStorage.setItem('token',res.token)
                location.href = 'file:///Users/panyuying/Desktop/code/大事件/momo.html'
                
            }
        )
        
    })
   
    
})