const router = require("express").Router()
const productController = require("../controllers/productControllers")

router.get("/", productController.getAllProduct)
router.post("/", productController.createProduct)
router.get("/:id", productController.getOneProduct)
router.get("/delete/:id", productController.deleteProduct)
router.get("/search/:key", productController.searchProduct)

module.exports = router