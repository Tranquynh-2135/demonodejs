const express = require('express');
const { createReservation, getReservations, deleteReservation } = require('../controllers/reservationController');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

// Tạo đặt chỗ (cần token)
router.post('/', authMiddleware, createReservation);

// Lấy danh sách đặt chỗ (cần token)
router.get('/', authMiddleware, getReservations);

// Xóa đặt chỗ (cần token)
router.delete('/:id', authMiddleware, deleteReservation);

module.exports = router;
