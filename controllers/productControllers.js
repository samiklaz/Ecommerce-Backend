const Product = require("../models/Products");

module.exports = {
    getAllProduct: async (req, res) => {
        try {
            const products = await Product.find().sort({ createdAt: -1 });
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    createProduct: async (req, res) => {
        try {
            const newProduct = new Product(req.body);
            await newProduct.save();
            res.status(201).json({ message: "Product created successfully" });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    getOneProduct: async (req, res) => {
        try {
            const product = await Product.findById(req.params.id);
            if (!product) {
                res.status(404).json({ message: "Product not found" });
                return;
            }
            res.status(200).json(product);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    deleteProduct: async (req, res) => {
        try {
          const product = await Product.findByIdAndDelete(req.params.id);
      
          if (!product) {
            res.status(404).json({ message: 'Product not found' });
            return;
          }
      
          res.status(200).json({ message: 'Product deleted successfully' });
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
    },
    searchProduct: async (req, res) => {
        try {
            const result = await Product.aggregate([
                {
                    $search: {
                        index: "ecommerce",
                        text: {
                            query: req.params.key,
                            path: {
                                wildcard: "*"
                            }
                        }
                    }
                }
            ]);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};
