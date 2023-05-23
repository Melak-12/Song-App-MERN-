const express = require('express')
const router =express.Router();
const {
    getSong,
    deleteSong,
    updateSong,
    setSong,

    }=require('../controller/songController');
const { protect } = require('../middleware/userMiddware');


router.route('/').get(protect,getSong).post(protect,setSong);
router.route('/:id').delete(protect,deleteSong).put(protect,updateSong)
// router.route('/date/').get(protect,deleteSong).post(protect,updateSong)




// router.get('/',getSong)
// router.post('/',setSong)
// router.put('/:id',updateSong)
// router.delete('/:id',deleteSong)




 module.exports = router
