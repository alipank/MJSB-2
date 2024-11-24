var express = require("express");
var router = express.Router();

const { getMachine, putMachineIsReady, putMachine, postMachine, getMachines, deleteMachine, putMachineIsOnWorking } = require("../../controllers/machines");

router.put('/:id/is_working_on', putMachineIsOnWorking)

router.put("/:id/is_ready", putMachineIsReady);

router.get("/:id", getMachine);

router.put("/:id", putMachine);

router.delete("/:id", deleteMachine);

router.get("/", getMachines);

router.post("/", postMachine);


module.exports = router;
