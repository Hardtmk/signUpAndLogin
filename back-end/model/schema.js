const mongoose = require('mongoose');

const LoginSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'must provide name'],
    trim: true,
    maxlength: [20, 'name can not be more than 20 characters'],
  },
  password: {
    type: String,
  },
});
// schema就是等於一個model
module.exports = mongoose.model('schema', LoginSchema);
