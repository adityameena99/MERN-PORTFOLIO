const express = require("express");
const { handleForm } = require("../Controllers/formController");
const router = express.Router();

router.post("/contact", handleForm); 

module.exports = router;
