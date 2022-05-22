//每次调用$.ajax()请求时 会先调用ajaxprefilter这个函数
$.ajaxPrefilter(function(options) {
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url
    // console.log(options.url)

    //统一为有权限接口设置headers请求头
    if(options.url.indexOf('/my/') !== -1){
        options.headers = {
            Authorization:localStorage.getItem('token') || ''
        }
    }
    
    options.complete = function(res) {
        if(res.responseJSON.status === 1) {
            localStorage.removeItem('token')
            location.href = '../../login.html'
        }
    }
    
})