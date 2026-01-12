const slideModel = require("../models/slideModel");

exports.getList = async (req, res) => {
  try {
    const data = await slideModel.getAllSlides();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    await slideModel.createSlide(req.body);
    res.status(201).json({ message: "Slide created" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    await slideModel.updateSlide(req.params.id, req.body);
    res.json({ message: "Slide updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    await slideModel.deleteSlide(req.params.id);
    res.json({ message: "Slide deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
