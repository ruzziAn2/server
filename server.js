const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

//mongodb+srv://<username>:<password>@yendono-llegando.diplpux.mongodb.net/?retryWrites=true&w=majority
mongoose
  .connect(
    "mongodb+srv://otap:pato123@yendono-llegando.diplpux.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("connected to mongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.send("Hola Camus");
});

app.use("/api/v1/auth", require("./routes/auth"));
app.use("/api/v1/accounts", require("./routes/accounts"));

app.listen(5000, () => {
  console.log("Server started");
});
