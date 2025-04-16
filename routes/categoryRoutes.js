const express = require("express");
const router = express.Router();

const  {getCategories, addCategory ,updateCategory  } = require("../controllers/categoryController")

const auth = require("../middlewares/authMiddleware")

router.get('/', auth, getCategories)
router.post('/', auth, addCategory)
router.put('/:id', auth, updateCategory)


module.exports = router