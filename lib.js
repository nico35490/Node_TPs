
const fs = require('fs')
exports.filesDetails =  function(path){
    const files = fs.readdirSync(path)

    const result = []
    files.forEach(file => {
        result.push({
            name: file,
            properties: fs.statSync(path + "/" + file)
        })
    })
    return result
}