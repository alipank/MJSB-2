var express = require("express");
var router = express.Router();

const { getMachine, putMachineIsReady, putMachine, postMachine, getMachines, deleteMachine } = require("../../controllers/machines");

router.get("/:id", getMachine);

router.put("/:id/is_ready", putMachineIsReady);

router.put("/:id", putMachine);

router.delete("/:id", deleteMachine);

router.get("/", getMachines);

router.post("/", postMachine);


module.exports = router;
