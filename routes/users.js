const { Router } = require('express');

const { getUsers, registerUser } = require('../controllers/users');

const router = Router();

router.get('/', getUsers);
router.post('/', registerUser);

module.exports = router;