
const express = require('express');
const router = express.Router();
const {
  addProduct,
  getAllProducts,
  getProductById,
  deleteProduct
} = require('../controllers/productController');

const { protect } = require('../middleware/authMiddleware');

router.get('/', getAllProducts);               // Sabke liye
router.get('/:id', getProductById);           // Sabke liye
router.post('/add', addProduct);     // Login hona zaroori
router.delete('/:id', protect, deleteProduct); // Login hona zaroori

module.exports = router;