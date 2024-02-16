const express = require("express");

const PatientRouter = express.Router();
const Patient = require("../models/Patient.model");

PatientRouter.get("/", async (req, res) => {
  try {
    const patientsData = await Patient.find();
    res.status(200).json(patientsData);
  } catch (error) {
    res.status(501).json({ error: "Error while getting patients data", error });
  }
});

PatientRouter.post("/", async (req, res) => {
  const {
    name,
    age,
    gender,
    issues,
    admittedDate,
    dischargedDate,
    wardNumber,
    phoneNumber,
  } = req.body;

  try {
    const patientAdded = new Patient({
      name,
      age,
      gender,
      issues,
      admittedDate,
      dischargedDate,
      wardNumber,
      phoneNumber,
    });
    await patientAdded.save();
    res.status(201).json({ message: "Patient data added successfully" });
  } catch (error) {
    res.status(500).json({ error: "failed to add patient data" });
  }
});

PatientRouter.put("/:id", async (req, res) => {
  const patientId = req.params.id;
  const updatedData = req.body;

  try {
    const patientUpdated = await Patient.findByIdAndUpdate(
      patientId,
      updatedData,
      { new: true }
    );

    if (!patientUpdated) {
      res.status(404).json({ message: "Couldnt find the patient " });
    }
    res.status(201).json({ message: "Patient data updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "failed to update the patient data" });
  }
});

PatientRouter.delete("/:id", async (req, res) => {
  const patientId = req.params.id;

  try {
    const patientDeleted = await Patient.findByIdAndDelete(patientId);

    if (!patientDeleted) {
      res.status(404).json({ error: "Couldnt find the patient in DB" });
    }
    res.status(201).json({ message: "Patient deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error while deleting the patient data" });
  }
});

module.exports = PatientRouter;
