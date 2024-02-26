const express = require("express");
const cors = require("cors");
const app = express();
const port = 3200;

app.use(express.json());
app.use(cors());

const Menranking = require("./models/cricketInfo");
require("./db/conn");

app.get("/", (req, res) => {
  res.send("<h1>Hello, how are you?</h1>");
});

app.get("/getmendata", async (req, res) => {
  try {
    const getmen = await Menranking.find({});
    res.status(200).send(getmen);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// app.post("/menranking", async (req, res) => {
//   try {
//     const addingmenRecord = new Menranking(req.body);
//     const insertData = await addingmenRecord.save();
//     console.log("Created Menranking instance:", insertData);
//     res.status(201).send(insertData);
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });
app.post("/menranking", async (req, res) => {
  try {
    const insertData = await Menranking.create(req.body);
    console.log("Created Menranking instance:", insertData);
    res.status(201).send(insertData);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is listening at port number ${port}`);
});
