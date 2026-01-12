const documentModel = require("../models/documentModel");

// Lấy chi tiết 1 văn bản
exports.getDetail = async (req, res) => {
  try {
    const id = req.params.id;
    const doc = await documentModel.getDocumentById(id);

    if (!doc) {
      return res.status(404).json({ message: "Không tìm thấy văn bản" });
    }

    res.json(doc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Cập nhật văn bản
exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;

    await documentModel.updateDocument(id, data);
    res.json({ message: "Update thành công!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Xóa văn bản
exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    await documentModel.deleteDocument(id);
    res.json({ message: "Đã xóa văn bản!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Lấy danh sách
exports.getList = async (req, res) => {
  try {
    const list = await documentModel.getAllDocuments();
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const data = req.body;
    await documentModel.createDocument(data);
    res.status(201).json({ message: "Thêm mới văn bản thành công!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
