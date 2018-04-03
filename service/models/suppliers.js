const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SupplierSchema = new Schema({
  supplierName: String,
  contactPeople: String,
  contactPhone: String,
  address: String,
  mem: String,
  accountName: String,
  accountBank: String,
  accountNo: String,
  userId:String 
});

SupplierSchema.statics.findById = function(supplierId,cb){
  return this.find({_id:supplierId},cb);
};

module.exports = mongoose.model('Supplier',SupplierSchema); 
