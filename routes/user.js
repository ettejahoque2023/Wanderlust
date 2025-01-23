const express= require("express");
const router= express.Router();
const User= require("../models/user.js");
const { render } = require("ejs");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

 const userController = require("../controllers/user.js");


router.route("/signup")
    .get( userController.renderSignupForm)
    .post(wrapAsync(userController.signup));


router.route("/login")
    .get(userController.renderLoginForm)
    .post(saveRedirectUrl,
        passport.authenticate("local",
        { failureRedirect: '/login' , failureFlash: true,}),
        wrapAsync(userController.login));
    

//Log out
router.get("/logout",userController.logOut);

module.exports= router;
