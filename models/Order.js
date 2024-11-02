const mongoose = require('mongoose');

const [
    PAYMENT_STATUS_PENDING,
    PAYMENT_STATUS_PAID,
    PAYMENT_STATUS_CANCELLED,
] = ["Pending", "Paid", "Cancelled"];

const orderSchema = new mongoose.Schema({
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    quantity: {
        type: Number,
        required: true,
        default: 1
    },

    totalPrice: {
        type: Number,
        required: true
    },

    currency: {
        type: String,
        required: true,
        default: "IDR"
    },

    paymentStatus: {
        type: String,
        enum: [PAYMENT_STATUS_PENDING, PAYMENT_STATUS_PAID, PAYMENT_STATUS_CANCELLED],
        default: PAYMENT_STATUS_PENDING,
    },

    orderDate: {
        type: Date,
        default: Date.now
    },

    pendingAt: {
        type: Date,
        default: Date.now
    },

    paidAt: {
        type: Date
    },

    cancelledAt: {
        type: Date
    }
}, { timestamps: true });

orderSchema.methods.updatePaymentStatus = async function(status) {
    this.paymentStatus = status;
    const now = new Date();

    switch (status) {
        case 'Paid':
            this.paidAt = now;
            break;
        case 'Cancelled':
            this.cancelledAt = now;
            break;
        case 'Pending':
            this.pendingAt = now;
            break;
    }

    await this.save();
};

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;