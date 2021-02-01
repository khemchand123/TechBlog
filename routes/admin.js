const express = require('express')
const router = express.Router();

const admin_controller = require('../controllers/admin_controller')
const auth = require('../middleware/auth')
const adminAuth = require('../middleware/adminAuth')


router.get('/dashboard', auth, adminAuth, admin_controller.admin_dashboard)

router.get('/create/blog', auth, adminAuth, admin_controller.admin_create_blog)

router.post('/post/blog', auth, adminAuth, admin_controller.admin_post_blog)

router.get('/update/blog/:id', auth, adminAuth, admin_controller.admin_update_blog)

router.post('/update/blog/:id', auth, adminAuth, admin_controller.admin_update_blog_save)

router.get('/delete/blog/:id', auth, adminAuth, admin_controller.admin_delete_blog)

module.exports = router;