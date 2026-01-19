const categoryModel = require("../models/categoryModel");

exports.getList = async (req, res) => {
  try {
    const data = await categoryModel.getAllCategories();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// MỚI: Lấy chi tiết 1 category
exports.getDetail = async (req, res) => {
  try {
    const data = await categoryModel.getCategoryById(req.params.id);
    if (!data) return res.status(404).json({ message: "Category not found" });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    await categoryModel.createCategory(req.body);
    res.status(201).json({ message: "Category created" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    await categoryModel.updateCategory(req.params.id, req.body);
    res.json({ message: "Category updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    await categoryModel.deleteCategory(req.params.id);
    res.json({ message: "Category deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
