const Order = require("./../models/Order");
const OrderPaymentConfirmation = require("./../models/OrderPaymentConfirmation");
const { transformCourseResponse, transformCoursesResponse } =  require("./../utils/transformCourse");

module.exports = {
    async getOrders(req, res) {
        const userID = req.payload.id;

        if (!userID) {
            return res.status(400).json({ message: "user tidak valid" });
        }

        try {
            const orders = await Order.find({ user: userID })
                .populate('course')
                .exec();
                
            return res.status(200).json({ orders });
        } catch (error) {
            return res.status(500).json({ message: "gagal memuat orders" });
        }
    },

    async createOrder(req, res) {
        const userID = req.payload.id;
        const slug = req.params.slug;
        const { quantity = 1 } = req.body;

        if (!userID) {
            return res.status(400).json({ message: "user tidak valid" });
        }

        try {
            const course = await Course.findOne({ slug: slug })
                                       .exec();
            if (!course) {
                return res.status(404).json({ message: "kursus tidak ditemukan" });
            }

            if (course.getTotalParticipants() >= course.maximum_participants) {
                return res.status(400).json({ message: "tidak dapat membuat order, partisipan telah terpenuhi"})
            }

            const order = await Order.findOne({user: userID, course: course._id});
            if (order){
                return resp(res, 200, order);
            }

            const totalPrice = course.fee * quantity;
            const newOrder = new Order({
                course: course._id,
                user: userID,
                quantity,
                totalPrice,
                currency: course.currency,
            });

            await newOrder.save();
            return resp(res, 201, newOrder);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "gagal membuat order", error });
        }
    },

    async getOrder(req, res) {
        const { orderId } = req.params;

        try {
            const order = await Order.findById(orderId)
                .populate('course')
                .populate('user');
            
            if (!order) {
                return res.status(404).json({ message: "Order tidak ditemukan" });
            }

            return res.status(200).json(order);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "gagal mendapatkan order", error });
        }
    },

    async createPaymentConfirmation(req, res) {
        const userId = req.payload.id;
        const { orderId } = req.params;
        const { confirmedAmount, paymentMethod, paymentProofUrl, bankFrom, bankTo, notes } = req.body;

        try {
            const paymentConfirmation = new OrderPaymentConfirmation({
                order: orderId,
                user: userId,
                confirmedAmount,
                paymentMethod,
                paymentProofUrl,
                bankFrom,
                bankTo,
                notes
            });

            await paymentConfirmation.save();

            return res.status(201).json({ message: "Berhasil melakukan konfirmasi pembayaran", paymentConfirmation });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "gagal membuat konfirmasi pembayaran", error });
        }
    },

    async updateOrderStatus(req, res) {
        const { status } = req.body;
        const orderId= req.params.orderId;

        try {
            const order = await Order.findOne({ _id: orderId });
            if (!order) {
                return res.status(404).json({ message: "Order tidak ditemukan" });
            }

            order.updatePaymentStatus(status)

            return res.status(200).json({ message: "Order status berhasil di update", order });
        } catch (error) {
            return res.status(500).json({ message: "error update order status" });
        }
    },
}