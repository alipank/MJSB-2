var express = require("express");
var router = express.Router();

const { getMachine, putMachine, postMachine, getMachines, deleteMachine } = require("../../controllers/machines");

router.get("/:id", getMachine);

router.get("/", getMachines);

router.post("/", postMachine);

router.put("/:id", putMachine);

router.delete("/:id", deleteMachine);

module.exports = router;
