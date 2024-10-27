const fs = require('fs/promises')

const date = new Date()

fs.unlink('./public/images/2024-10-26-80156.jpg', (err) => {
    console.log(err)
}).then(success => {console.log(success)})

console.log('test' || date.toLocaleDateString('en-CA'))