const express = require("express");
const { DealerModel } = require("../models/Dealer.model");
 
const dealerRoutes = express.Router();

dealerRoutes.get("/", async (req, res) => {
  try {
    const data = await DealerModel.find();
    console.log(data);
    res.status(200).send({ msg: data });
  } catch (error) {
    res.status(400).send({ err: error.message });
}
});

// get by Id also 
dealerRoutes.get("/:id", async (req, res) => {
    const {id} = req.params
    console.log("rrrr",id);
  try {
    const data = await DealerModel.find({_id:id});
    console.log(data);
    res.status(200).send({ msg: data });
  } catch (error) {
    res.status(400).send({ err: error.message });
}
});

dealerRoutes.post("/add", async (req, res) => {
    try {
        const dealerPost = new DealerModel(req.body)
        await dealerPost.save()
        res.status(200).send({ msg: "details added successfully"});
    } catch (error) {
        res.status(400).send({ err: error.message });
    }
});

dealerRoutes.patch("/update/:id", async (req, res) => {
    const {id} = req.params;
    // console.log(id)
    try {
        await DealerModel.findByIdAndUpdate({userId:req.body.userID,_id:id}, req.body) 
        res.status(200).send({"msg": "details updated"})
    } catch (error) {
        res.status(400).send({ err: error.message });
    }
});
dealerRoutes.delete("/delete/:id", async (req, res) => {
    try {
        const {id} = req.params;
        await DealerModel.findByIdAndDelete({userID: req.body.userID, _id:id});
     

        res.status(200).send({"msg": "data deleted"})
       
    } catch (error) {
        res.status(400).send({ err: error.message });
    }
});


module.exports = {
    dealerRoutes  
}