const mongoose = require('mongoose')
mongoose
  .connect(`mongodb://${process.env.dbUserName}:${process.env.dbPassword}@${process.env.host_path}:${process.env.dbPort}/${process.env.dbName}`)
  .then(() => {
    console.log(`Mongodb连接成功`)
  })
  .catch((err) => console.log(err))
module.exports = mongoose
