
const { Schema, model } = require('mongoose');

const commentSchema = new Schema({
    body: String,
    createdAt: {
      type: String,
      default: new Date(new Date).toLocaleDateString('ru', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    },
    entry: { 
      type: Schema.ObjectId,
      ref: 'Entry'
    },
    author: { 
      type: String
    }
});
module.exports = model('Comment', commentSchema);
