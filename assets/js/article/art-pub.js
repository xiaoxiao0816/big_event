// const { location } = require("express/lib/response")

$(function() {
    let form = layui.form
    let layer = layui.layer
     // 初始化富文本编辑器
   initEditor()
    getInitCate()
    function getInitCate(){
        $.ajax({
            method:'get',
            url:'/my/article/cates',
            success:function(res) {
                if(res.status !== 0){
                    return layer.msg(res)
                }
                console.log(res);
                let strhtml = template('tpl-cate', res)
                $('[name=cate_Id]').html(strhtml)
                form.render()
            }
        })
    }

    //为选择封面绑定事件
    $('#btnImage').on('click',function() {
        $('#coverFile').click()
    })


    //监听coverFile的change事件，获取用户选择的 文件列表

    $('#coverFile').on('change',function(e) {
        let files = e.target.files
        if(files.length === 0){
            return
        }
        let newImgURL = URL.createObjectURL(files[0])
        $image
      .cropper('destroy')      // 销毁旧的裁剪区域
      .attr('src', newImgURL)  // 重新设置图片路径
      .cropper(options)        // 重新初始化裁剪区域
    })

    // 1. 初始化图片裁剪器
    let $image = $('#image')
     
    // 2. 裁剪选项
    let options = {
      aspectRatio: 400 / 280,
      preview: '.img-preview'
    }
    
    // 3. 初始化裁剪区域
    $image.cropper(options)

    //发布文章步骤
    let art_state = '已发布'
    $('#btnsave').on('click',function() {
        art_state = '草稿'
    })

    $('#form-pub').on('submit',function(e) {
        e.preventDefault()
        let fd = new FormData($(this)[0])
        fd.append('state', art_state)

        $image
        .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
            width: 400,
            height: 280
    })
        .toBlob(function(blob) {       // 将 Canvas 画布上的内容，转化为文件对象
        // 得到文件对象后，进行后续的操作

        fd.append('cover_img', blob)
        pubLish(fd)
    })
    })

    function pubLish(fd){
        $.ajax({
            method:'post',
            url:'/my/article/add',
            data:fd,
            contentType:false,
            processData:false,
            success:function(res) {
                if(res.status !== 0){
                    return layer.msg(res)
                }
                layer.msg('发布成功')
                location.href = '../../../article/art-list.html'
            }
        })
    }
})