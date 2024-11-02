const mongoose = require('mongoose');

const orderPaymentConfirmationSchema = new mongoose.Schema({
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: [true, "order id harus diisi"]
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "user harus diisi"]
    },

    confirmedAmount: {
        type: Number,
        required: [true, "jumlah harus diisi"]
    },

    paymentMethod: {
        type: String,
        enum: ['Bank Transfer'],
        required: [true, "metode transfer harus diisi"],
        default: 'Bank Transfer'
    },

    paymentProofUrl: {
        type: String,
        required: false,
    },

    bankFrom: {
        type: String,
        required: [true, "bank pengirim harus diisi"]
    },

    bankTo: {
        type: String,
        required: [true, "bank tujuan harus diisi"]
    },

    confirmationDate: {
        type: Date,
        default: Date.now
    },

    notes: {
        type: String,
        default: ''
    }

}, { timestamps: true });

module.exports = mongoose.model('OrderPaymentConfirmation', orderPaymentConfirmationSchema);
