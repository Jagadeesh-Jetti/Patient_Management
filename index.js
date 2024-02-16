const express = require("express");
const CORS = require("cors");
const app = express();

const initializeDatabase = require("./db");
const PatientRouter = require("./routers/Patient.router");
const WardRouter = require("./routers/Ward.router");

initializeDatabase();

app.use(express.json());
app.use(CORS());

app.use("/patients", PatientRouter);
app.use("/ward", WardRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong" });
});

app.get("/", (req, res) => {
  res.send("Patient Management Backend");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Patient Management backend server started");
});
