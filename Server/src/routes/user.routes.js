import { Router } from "express";
import { createUser, loginUser, updateUser } from "../controller/user.controller.js";
import { upload } from "../middlerware/multer.middleware.js"; // Corrected middleware path
import { checkToken } from "../middlerware/auth.middleware.js";
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




// router.route("/login").post(loginUser)

//secured routes
// router.route("/logout").post(verifyJWT, logoutUser) //middleware verifyjWT injected before logout user
// router.route("/refresh-token").post(refreshAccessToken)
// router.route("/change-password").post(verifyJWT, changeCurrentPassword)
// router.route("/current-user").get(verifyJWT, getCurrentUser)
// router.route("/update-account").patch(verifyJWT, updateAccountDetails)
// router.route("/avatar").patch(verifyJWT, upload.single("avatar"), updateUserAvatar)
// router.route("/cover-image").patch(verifyJWT, upload.single("coverImage"), updateUserCoverImage)
// router.route("/c/:username").get(verifyJWT, getUserChannelProfile)
// router.route("/history").get(verifyJWT, getWatchHistory)


export default router