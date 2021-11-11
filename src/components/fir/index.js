const fs = require('fs')
const path = require('path');
let vueStr = fs.readFileSync(path.resolve(__dirname, 'index.vue'), 'utf8')
const { parseDocs } = require('../src')

const config = {
    md: true,
    mdOptions: {
        props: { name: '参数', type: '类型', desc: '说明', default: '默认值' },
        slots: { name: 'name', desc: '说明' },
        events: { name: '事件名称', desc: '说明' },
        methods: { name: '方法名', desc: '说明', params: '参数', res: '返回值' }
    }
}

let toppath = './test';//当前文件夹的名字
function fn(path) {
    fs.readdir(path, (err, files) => {
        files.forEach(function (item) {
            fs.stat(path + '/' + item, (err, data) => {
                if (data.isFile()) {
                    if (item.split('.').pop() == 'vue') {
                        console.log(item)
                    }

                } else {
                    console.log('文件夹名', item);
                    fn(path + '/' + item)
                }
            })
        })
    })
}
fn(toppath)


// // 创建文件
// const writeFileRecursive = function (path, buffer, callback) {
//     let lastPath = path.substring(0, path.lastIndexOf("/"));
//     fs.mkdir(lastPath, { recursive: true }, (err) => {
//         if (err) return callback(err);
//         fs.writeFile(path, buffer, function (err) {
//             if (err) return callback(err);
//             return callback(null);
//         });
//     });
// }

// const backfuntion = (err) => {
//     if (err) console.error(err);
//     console.info("write success");
// }

// let content = parseDocs(vueStr, config)
// writeFileRecursive('./src/md/test.md', content, backfuntion)