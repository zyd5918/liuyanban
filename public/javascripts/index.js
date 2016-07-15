$(function(){
    /////新建文件夹按钮点击
    $(".note-create-dir").click(function(){
        var p = new Prompt("新建文件夹",function(dirName){
            console.log(dirName);
            ////调用服务器端的接口 创建文件夹
        },function(){

        });
        p.show();
    });
})