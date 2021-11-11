const fs = require('fs')
const path = require('path');
const { parseDocs } = require('./index')


const config = {
    md: true,
    mdOptions: {
        props: { name: '参数', type: '类型', desc: '说明', default: '默认值' },
        slots: { name: 'name', desc: '说明' },
        events: { name: '事件名称', desc: '说明' },
        methods: { name: '方法名', desc: '说明', params: '参数', res: '返回值' }
    }
}
// ######修改vueTodocs路径########
const findFileName = path.resolve(__dirname, '../../src')//当前文件夹的名字


function doGenerate(filePath, fileSrc, a) {
    let vueStr = '',
        dirName = '',
        baseSrc = ''
    const writeFileRecursive = function (path, buffer, callback) {
        let lastPath = path.substring(0, path.lastIndexOf("/"));
        fs.mkdir(lastPath, { recursive: true }, (err) => {
            if (err) return callback(err);
            fs.writeFile(path, buffer, function (err) {
                if (err) return callback(err);
                return callback(null);
            });
        });
    }
    // ######写入文件函数执行回调########
    const backfuntion = (err) => {
        if (err) console.error(err);
        console.info("write success");
    }

    fs.readdir(filePath, (err, files) => {
        files.forEach(function (item) {
            fs.stat(filePath + '/' + item, (err, data) => {
                if (data.isFile()) {
                    if (item.split('.').pop() === 'vue') {
                        dirName = item.split('.')[0]
                        vueStr = fs.readFileSync(path.resolve(filePath + '/', item), 'utf8')
                        let content = parseDocs(vueStr, config)
                        if (fileSrc) baseSrc = fileSrc
                        let writeFilePath = path.resolve(findFileName, '../') + '/docsFile/' + baseSrc + '/'
                        writeFileRecursive(`${writeFilePath}${dirName}.md`, content, backfuntion)
                    }
                } else {
                    baseSrc = path.join(baseSrc, item)
                    doGenerate(filePath + '/' + item, baseSrc)

                }
            })
        })
    })
}

doGenerate(findFileName)
