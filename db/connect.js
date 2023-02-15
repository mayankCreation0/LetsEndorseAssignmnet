const mongoose = require("mongoose");
require('dotenv').config()
// console.log(process.env.DB);
async function connect() {

    return new Promise((resolve, reject) => {
        mongoose.connect(process.env.DATA_URl, (err) => {
            if (err) {
                reject(err);
            }

            resolve();
        })
    })
}



module.exports = connect;