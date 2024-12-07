const Reservation = require('../models/Reservation');
const Service = require('../models/Service');

// Tạo đặt chỗ
exports.createReservation = async (req, res) => {
    const { service_id, date, time, number_of_people } = req.body;
    try {
        const reservation = new Reservation({
            user_id: req.userId,
            service_id,
            date,
            time,
            number_of_people
        });
        await reservation.save();
        res.status(201).json(reservation);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Lấy danh sách đặt chỗ của người dùng
exports.getReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find({ user_id: req.userId }).populate('service_id');
        res.json(reservations);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Xóa đặt chỗ
exports.deleteReservation = async (req, res) => {
    const { id } = req.params;
    try {
        const reservation = await Reservation.findById(id);
        if (!reservation) return res.status(404).json({ message: 'Reservation not found' });

        if (reservation.user_id.toString() !== req.userId) {
            return res.status(403).json({ message: 'You can only delete your own reservations' });
        }

        await reservation.remove();
        res.status(200).json({ message: 'Reservation deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
