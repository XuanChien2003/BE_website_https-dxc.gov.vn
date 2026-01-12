const typeModel = require("../models/typeModel");

exports.getList = async (req, res) => {
  try {
    res.json(await typeModel.getAll());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    await typeModel.create(req.body);
    res.json({ message: "Thêm loại văn bản thành công" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    await typeModel.update(req.params.id, req.body);
    res.json({ message: "Updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    await typeModel.remove(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
