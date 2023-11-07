const express = require("express");
const { OemModel } = require("../models/Oem.model");

const oemRoutes = express.Router();

oemRoutes.get("/", async (req, res) => {
  try {
    const oem = await OemModel.find({ userID: req.body.userID });

    res.status(200).send(oem);
  } catch (error) {
    res.status(400).send({ err: error.message });
  }
});

 
oemRoutes.get('/search', async (req, res) => {
  try {
    const keyword = req.query.keyword;
console.log("iiii ", req.query)
   
    const searchCriteria = {
      $or: [],
    };

     if (!isNaN(keyword)) {
      searchCriteria.$or.push({ year: Number(keyword) });
    } else {
      searchCriteria.$or.push({ brand: { $regex: keyword, $options: 'i' } });
      searchCriteria.$or.push({ name: { $regex: keyword, $options: 'i' } });
    }

     const data = await OemModel.find(searchCriteria).lean();

    res.status(200).send({ msg: data });
  } catch (error) {
    res.status(400).send({ err: error.message });
  }
});



oemRoutes.post("/add", async (req, res) => {
  const data = req.body
console.log(data);
  const brand = await OemModel.create(data)
  console.log(brand);
res.send("added ")
});






module.exports = {
  oemRoutes
}