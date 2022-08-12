const router = require('express').Router();

const {
  getUsers,
  getUser,
  getCurrentUser,
  updateUserInfo,
  updateAvatar,
} = require('../controllers/users');

const {
  validateUserId,
  validateUserInfo,
  validateUserAvatar,
} = require('../middlewares/validate');

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.get('/:userId', validateUserId, getUser);
router.patch('/me', validateUserInfo, updateUserInfo);
router.patch('/me/avatar', validateUserAvatar, updateAvatar);

module.exports = router;
