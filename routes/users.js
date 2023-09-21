var express = require('express');
const Users = require('../model/users');
var mongoose = require('mongoose')
var router = express.Router();
const ObjectId = mongoose.Types.ObjectId;

/* GET users listing. */
router.get('/', async (req, res) => {
  try {
    const getUser = await Users.find();
    res.send(getUser);
  }
  catch (err) {
    res.send(err)
  }
});

router.post('/create', async (req, res) => {
  console.log(req.body);
  const payload = new Users(req.body);
  try {
    console.log('jjjjjjj');
    const newUser = await payload.save();
    res.status(200).send('Contact Added Successfully')
  }
  catch (err) {
    return res.send(err)
  }
})

router.put('/update', async (req, res) => {

  const updatedData = {

    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address

  };
  console.log(req.body, "req.body");
  try {
    console.log("sssssss");
    const user = await Users.findOneAndUpdate({ userid: req.body.userid }, updatedData, { new: true });

    res.status(200).send(user);
    // res.json("user updated", user)
  }
  catch (err) {
    res.send(err, "user not updated")

  }
})

router.get('/:id', async (req, res) => {
  // const userid = req.params.id;
  // console.log(userid);
  try {
    const user = await Users.findOne({userid:req.params.id})
      res.send(user)
  }
  catch (err) {
    res.send(err)

  }
})
module.exports = router;
