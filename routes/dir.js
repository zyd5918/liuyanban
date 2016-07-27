var express = require('express');
var router = express.Router();

var fs = require('fs');
/**
 * 获取notes文件夹下的数据
 * @returns 返回对象数组
 */
function getAllNotes() {
    var arrDirs = fs.readdirSync('./notes');
    var arrDirResult = [];
    for (var i = 0; i < arrDirs.length; i++) {
        //通过f
        var obj = {}
        obj.dirName = arrDirs[i];////目录名称
        obj.fileCount = fs.readdirSync('./notes/' + obj.dirName).length; //Math.floor(Math.random() * 20);//目录内的文件数量
        arrDirResult.push(obj);
    }
    return arrDirResult;
}

router.get("/all", (req, res) => {
    var arrDirResult = getAllNotes(); ////调用getAllNotes方法获取文件夹下的数据
    res.json({ status: "y", msg: "读取数据完成", data: arrDirResult });
})

router.post("/new", (req, res) => {

    var dirName = req.body.dirName.trim();
    if (!!dirName) {
        ////创建一个目录
        fs.exists('./notes/' + dirName, function (d) {
            if (d) {
                res.json({ status: "n", msg: "目录已经存在" });
            }
            else {
                fs.mkdirSync('./notes/' + dirName);
                var arrDirResult = getAllNotes();
                res.json({ status: "y", msg: "目录创建完成", data: arrDirResult });
            }
        })
    }
    else {
        res.json({ status: "n", msg: "目录名称不能为空!" });
    }


    //res.json({status:"y",msg:"创建目录完成"});

})


module.exports = router;
