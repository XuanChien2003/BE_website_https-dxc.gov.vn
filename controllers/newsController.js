const newsModel = require("../models/newsModel");

exports.getList = async (req, res) => {
  try {
    const data = await newsModel.getAllNews();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getDetail = async (req, res) => {
  try {
    const data = await newsModel.getNewsById(req.params.id);
    if (!data) return res.status(404).json({ message: "News not found" });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    await newsModel.createNews(req.body);
    res.status(201).json({ message: "News created" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    await newsModel.updateNews(req.params.id, req.body);
    res.json({ message: "News updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    await newsModel.deleteNews(req.params.id);
    res.json({ message: "News deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
