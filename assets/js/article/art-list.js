    $(function() {
    let q = {
        pagenum: 1,
        pagesize:2,
        cate_id:'',
        state:'',
    }   
    let layer = layui.layer
    let form = layui.form
    let laypage = layui.laypage
    getlist()
    function getlist() {
        $.ajax({
            method:'get',
            url:'/my/article/list',
            data:q,
            success:function(res){
                if(res.status !== 0){
                    // return layer.msg('获取列表失败')
                    return console.log(res);
                }
                let list = template('tpl-table', res)
                $('#bd').html(list)
                renderPage(res.total)
                // console.log(res);
                // console.log(111);
            }
        })
    }
    function padZero(n) { return n > 9 ? n : '0' + n }  
    template.defaults.imports.dataFormat = function(date) { const dt = new Date(date) 
        let y = dt.getFullYear() 
        let m = padZero(dt.getMonth() + 1) 
        let d = padZero(dt.getDate()) 
        let hh = padZero(dt.getHours()) 
        let mm = padZero(dt.getMinutes()) 
        let ss = padZero(dt.getSeconds()) 
        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss 
    }
    // console.log(111);
    initCate()
    function initCate() { 
        $.ajax({ method: 'GET', 
        url: '/my/article/cates', 
        
        success: function(res) { 
            if (res.status !== 0) { 
                return layer.msg('获取分类数据失败!') 
            }
            let strhtml = template('tpl-cate', res) 
            // console.log(strhtml);
            console.log(res);
            $('#cate-id').html(strhtml)
                form.render() } 
            }) 
            
        }

        $('#form-search').on('submit', function(e) { 
            e.preventDefault() 
            let cate_id = $('#cate-id').val() 
            let state = $('[name=state]').val() 
            q.cate_id = cate_id 
            q.state = state 
            getlist()
        })


        
        function renderPage(total) {
            laypage.render({ 
                elem: 'pageBox', 
            // 分页容器的Id
                 count: total, 
            // 总数据条数 
                limit: q.pagesize, 
            // 每页显示几条数据 
                curr: q.pagenum,
                layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'], limits: [2, 3, 5, 10],
            // 设置默认被选中的分页 
            jump: function(obj,first) { 
                // console.log(obj.curr) 
                // 把最新的页码值，赋值到 q 这个查询参数对象中 
                q.pagenum = obj.curr 
                q.pagesize = obj.limit
                if (!first) { 
                    getlist() 
                }
            }
        }) 


        }

        $('tbody').on('click', '.btn-delete', function() { // 获取到文章的 id 
            let id = $(this).attr('data-id')
            var len = $('.btn-delete').length
            layer.confirm('确认删除?', { 
                icon: 3, title: '提示' 
            }, function(index) { 
                $.ajax({ 
                    method: 'GET', 
                    url: '/my/article/delete/' + id, 
                    success: function(res) { 
                        if (res.status !== 0) { 
                            return layer.msg('删除文章失败!') 
                        }
                        layer.msg('删除文章成功!') 
                        if (len === 1) { // 如果 len 的值等于1，证明删除完毕之后，页面上就没有任何数据了 // 页码值最小必须是 1 
                            q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1 
                        }
                        getlist() 
                    } 
                })
                    layer.close(index) 
                }) 
            })
})

// console.log(111);
