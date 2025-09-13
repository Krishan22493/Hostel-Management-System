import { Router } from "express";
import { createUser, loginUser, updateUser ,getAllUser, roomAllot , getAllPendingUser, getVacantRoom, getOccupiedRoom} from "../controller/admin.controller.js";
import { checkToken } from "../middlerware/auth.middleware.js";
import { upload } from "../middlerware/multer.middleware.js"; // Corrected middleware path

const router = Router();

router.route('/register').post(
    upload.fields([
        {
            name: "idcard",
            maxCount: 1
        }
    ]),
    createUser
);
router.route('/login').post(loginUser);
router.route('/update').patch(checkToken,updateUser);
router.route('/get-users').get(checkToken,getAllUser);
router.route('/room-allot').post(checkToken,roomAllot);
router.route('/get-all-pending-users').get(checkToken, getAllPendingUser);
router.route('/get-vacant-room').get(checkToken, getVacantRoom);
router.route('/get-occupied-room').get(checkToken, getOccupiedRoom);


export default router