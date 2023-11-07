const express = require("express");
const { myServer } = require("./configs/db");
const cors = require("cors");
const { userRoutes } = require("./routes/User.routes");
const { auth } = require("./middleware/auth.middleware");
const { oemRoutes } = require("./routes/OEM.routes");
 const { dealerRoutes } = require("./routes/Dealer.routes");
const { DealerModel } = require("./models/Dealer.model");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use("/oem", oemRoutes);
app.use("/users", userRoutes);


app.get("/buyers", async (req, res) => {
  try {
    const data = await DealerModel.find();
    console.log(data);
    res.status(200).send({ msg: data });
  } catch (error) {
    res.status(400).send({ err: error.message });
}
});


app.use(auth);

app.use("/dealer", dealerRoutes)

 


app.listen(PORT, async () => {
  try {
    await myServer;
    console.log("connected to DB");
  } catch (error) {
    console.log(error);
  }

  console.log(`server started at` + " " + PORT);
});

 