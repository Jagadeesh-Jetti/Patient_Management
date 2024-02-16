const express = require("express");

const WardRouter = express.Router();
const Ward = require("../models/Ward.model");

WardRouter.get("/", async (req, res) => {
  try {
    const wardData = await Ward.find();
    res.status(200).json(wardData);
  } catch (error) {
    res.status(500).json({ error: "Error while fetching ward data" });
  }
});

WardRouter.post("/", async (req, res) => {
  const { wardNumber, capacity, wardType } = req.body;

  try {
    const wardUpdated = new Ward({
      wardNumber,
      capacity,
      wardType,
    });
    await wardUpdated.save();
    res.status(201).json({ message: "Ward details added successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error while adding the ward details" });
  }
});

WardRouter.put("/:id", async (req, res) => {
  const wardId = req.params.id;
  const updatedData = req.body;

  try {
    const updatedWard = await Ward.findByIdAndUpdate(wardId, updatedData, {
      new: true,
    });

    if (!updatedWard) {
      res.status(404).json({ error: "Couldnt find the ward to update" });
    }
    res.status(201).json({ message: "Updated Ward details successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error while updating the ward data" });
  }
});

WardRouter.delete("/:id", async (req, res) => {
  const wardId = req.params.id;

  try {
    const wardDeleted = await Ward.findByIdAndDelete(wardId);

    if (wardDeleted) {
      res.status(404).json({ error: "Couldnt find the ward to delete" });
    }
    res.status(201).json({ message: "Deleted the ward successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error while deleting the ward" });
  }
});

module.exports = WardRouter;
