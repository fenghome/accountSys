let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let productSchema = new Schema({
    productCode: String,
    productImg: String,
    productName: String,
    productType: String,
    productUnit: String,
    userId: String
});

productSchema.statics.findById = function (productId, cb) {
    return this.find({
        _id: productId
    }, cb);
}

module.exports = mongoose.model('Product', productSchema);