const authController = require('./../controller/authController');
const xp = require('express');
const router = xp.Router();

//Unprotected routs
router.post('/login', authController.login)
    .post('/signup/:signUpwith?', authController.signup)
    // Get Methods
    .get('/logout', authController.logout)
    .get('/getLoggedInUser', authController.getLoggedInUser);
// Protected Rout
router.use(authController.protect)
router.post('/updateuser', authController.updateUser)
router.post('/updatepassword', authController.updatePassword)

module.exports = router;

