$(function() {
    getCateList()
    let layer = layui.layer  
    let form = layui.form   
    let closeAddIndex = null
    $('#btnAddCate').on('click', function() {
        closeAddIndex = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类'
            ,content: $('#addCate').html()
          })
    })

    
    $('body').on('submit', '#form-add', function(e) {
        e.preventDefault()
        $.ajax({
            method:'post',
            url:'/my/article/addcates',
            data:$(this).serialize(),
            success:function(res){
                // console.log('ok');
                if(res.status !== 0){
                    return layer.msg('添加失败')
                }
                getCateList()
                layer.msg('添加成功')
                layer.close(closeAddIndex)
            }
        })
    })
     let closeEditIndex = null
    $('body').on('click', '#edit', function() {
        closeEditIndex = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类'
            ,content: $('#editCate').html()
          })
          let id = $(this).attr('data-id')
        //   console.log(id);
        $.ajax({
            method:'get',
            url:'/my/article/cates/' + id,
            success:function(res) {
                form.val('form-edit', res.data)
            }
        })
        
    })

    $('body').on('submit', '#form-edit', function(e) {
        e.preventDefault()
        $.ajax({
            method:'post',
            url:'/my/article/updatecate',
            data:$(this).serialize(),
            success:function(res){
                // console.log('ok');
                console.log(res);
                // console.log($('#form-edit').serialize());
                if(res.status !== 0){
                    return layer.msg('修改失败')
                }
                getCateList()
                layer.msg('修改成功')
                layer.close(closeEditIndex)
            }
        })
    })

    $('body').on('click', '.btn-delete', function() {
        let id = $(this).attr('data-id')
        layer.confirm('确认删除?', {icon: 3, title:'提示'}, function(index){
            $.ajax({
                method:'get',
                url:'/my/article/deletecate/' + id,
                success:function(res){
                    if(res.status !== 0){
                        return layer.msg('删除失败')
                    }
                    getCateList()
                    layer.msg('删除成功')
                }
            })
            
            layer.close(index);
          })
    })
})

function getCateList(){
    $.ajax({
        method:'get',
        url:'/my/article/cates',
        success:function(res) {
            console.log(res);
           let latahtml =  template('tpl-cate', res)
           $('#tb').html(latahtml)
        }
    })
}