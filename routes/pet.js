const express = require("express");
const router = express.Router();
const petController = require('../controllers/pet');
//const auth = require("../middleware/auth");

router.get('/pets', petController.getAllPets);
router.get('/calculates/pets-ages', petController.petsAges);
router.post('/pet', petController.addPet);
router.delete('/pet', petController.deletePet);

module.exports = router;