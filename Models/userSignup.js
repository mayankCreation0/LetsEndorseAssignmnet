const mongoose = require('mongoose');

const userData = mongoose.Schema({
    email: {
        type: 'string',
        required: true,
    },
    password: {
        type: 'string',
        required: true,
    },
    fullName: {
        type: 'string',
        required: true,
    },
    mobile: {
        type: 'string',
        required: true,
    }

    // userid: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'admin',
    //     required: true
    // }
},
    {
        timestamps: true,
    }
)
module.exports = mongoose.model("userData", userData);