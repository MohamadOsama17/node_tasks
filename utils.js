const mongoose = require("mongoose");

///Check if the id is a valid value
const isValidObjectId = id => {
    if (mongoose.Types.ObjectId.isValid(id)) {
        return true;
    } else {
        return false;
    }
}

module.exports = {validateObjectId: isValidObjectId};