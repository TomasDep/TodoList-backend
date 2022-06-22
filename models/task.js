const { Schema, model } = require('mongoose');

const TaskSchema = Schema({
  name: {
    type: String,
    require: true
  }, 
  state: {
    type: Boolean,
    default: false
  },
  description: {
    type: String,
    require: false
  },
  user: {
    require: true,
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, { collection: 'tasks' });

TaskSchema.method('toJSON', function() {
  const { __v, _id, ...object } = this.toObject();
  object.uid = _id;
  return object;
});

module.exports = model('Task', TaskSchema);