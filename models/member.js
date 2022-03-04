const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    memberInOrg: {
        type: String,
        required: true
    },
    joinDate: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model("Member", memberSchema);