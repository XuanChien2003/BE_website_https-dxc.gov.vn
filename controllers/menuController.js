const menuModel = require("../models/menuModel");

exports.getList = async (req, res) => {
  try {
    const data = await menuModel.getAllMenus();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    await menuModel.createMenu(req.body);
    res.status(201).json({ message: "Menu created successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    await menuModel.updateMenu(req.params.id, req.body);
    res.json({ message: "Menu updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    await menuModel.deleteMenu(req.params.id);
    res.json({ message: "Menu deleted successfully" });
  } catch (err) {
    // Trả về lỗi 400 nếu do ràng buộc dữ liệu (có menu con)
    res.status(400).json({ error: err.message });
  }
};
