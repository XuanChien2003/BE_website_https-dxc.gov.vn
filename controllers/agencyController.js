const agencyModel = require("../models/agencyModel");

exports.getList = async (req, res) => {
  try {
    const data = await agencyModel.getAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    await agencyModel.create(req.body);
    res.json({ message: "Thêm cơ quan thành công!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    await agencyModel.update(req.params.id, req.body);
    res.json({ message: "Cập nhật thành công!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    await agencyModel.remove(req.params.id);
    res.json({ message: "Xóa thành công!" });
  } catch (err) {
    if (err.number === 547)
      res
        .status(400)
        .json({ message: "Đang có văn bản thuộc cơ quan này, không thể xóa!" });
    else res.status(500).json({ error: err.message });
  }
};
