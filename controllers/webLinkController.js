const webLinkModel = require("../models/webLinkModel");

exports.getList = async (req, res) => {
  try {
    const data = await webLinkModel.getAllLinks();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    await webLinkModel.createLink(req.body);
    res.status(201).json({ message: "Created" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    await webLinkModel.updateLink(req.params.id, req.body);
    res.json({ message: "Updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    await webLinkModel.deleteLink(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
