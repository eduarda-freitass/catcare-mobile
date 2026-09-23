const express = require("express");
const cors = require("cors");
const app = express();

const pool = require("./db/connection");

const tutorRoutes = require("./routes/tutor.routes");
const catRoutes = require("./routes/cat.routes");
const appointmentRoutes = require("./routes/appointment.routes");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "CatCare API rodando" });
});

app.use("/tutors", tutorRoutes);
app.use("/cats", catRoutes);
app.use("/appointments", appointmentRoutes);

if (process.env.NODE_ENV !== "test") {
  app.listen(3000, () => {
    console.log("🐱 CatCare API rodando na porta 3000");
  });
}

module.exports = app;