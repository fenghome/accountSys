let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let orderSchema = new Schema({
  createInstance: Date,
  sequence: Number,
  orderNumber: String,
  customerId: String,
  customerName: String,
  totalAmount: Number,
  paymentAmount: Number,
  debtAmount: Number,
  mem: String,
  products: Array,
  userId: String
});

orderSchema.statics.findByOrderId = function (orderId, cb) {
  this.find({ _id: orderId }, cb);
}

module.exports = mongoose.model('Order', orderSchema);
