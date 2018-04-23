let mongoose = require('mongoose');
let Schema = mongoose.Schema;

SettlementSchema = new Schema({
  createInstance: Date,
  userId: String,
  userName: String,
  settlementAmount: Number,
  products: Array,
});

module.exports = mongoose.model('Settlement', SettlementSchema);
