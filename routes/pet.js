const express = require("express");
const router = express.Router();
const petController = require('../controllers/pet');
const auth = require("../middleware/auth");

router.get('/pets', auth.authenticateToken,petController.getAllPets);
router.get('/calculates/pets-ages',auth.authenticateToken, petController.petsAges);
router.post('/pet', auth.authenticateToken,petController.addPet);
router.delete('/pet', auth.authenticateToken,petController.deletePet);
router.get('/login',petController.login)

module.exports = router;