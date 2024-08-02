const { Router } = require('express');
const bcrypt = require('bcrypt');
const { USER } = require("../Db/db");
const myMiddleware = require('../MiddleWare/authentication');

const router = Router();

router.get("/profile", myMiddleware, async (req, res) => {
    try {
        const { password, ...userData } = req.user.toObject();
        return res.status(200).json(userData);
    } catch (error) {
        return res.status(500).json({ msg: "Something went wrong" });
    }
});

router.put("/profile-update", myMiddleware, async (req, res) => {
    const { username, useremail, password } = req.body;
    try {
        const user = req.user;

        if (username) user.username = username;
        if (useremail) user.useremail = useremail;
        if (password) {
            const salt = await bcrypt.genSalt();
            user.password = await bcrypt.hash(password, salt);
        }

        await user.save();
        const { password: pwd, ...userData } = user.toObject();
        return res.status(200).json({
            msg: "Profile updated successfully",
            userData
        });
    } catch (error) {
        return res.status(500).json({ msg: "An error occurred while updating the profile. Please try again later." });
    }
});

router.delete("/delete-profile", myMiddleware, async (req, res) => {
    try {
        const user = req.user;

        await USER.deleteOne({ _id: user._id });

        return res.status(200).json({ msg: "User deleted successfully" });
    } catch (error) {
        return res.status(500).json({ msg: "An error occurred while deleting the profile. Please try again later." });
    }
});

router.post("/verify-password", myMiddleware, async (req, res) => {
    const { oldPassword } = req.body;
    console.log(oldPassword);
    const user = req.user; 

    try {
        const match = await bcrypt.compare(oldPassword, user.password);
        if (match) {
            return res.status(200).json({ valid: true });
        } else {
            return res.status(200).json({ valid: false });
        }
    } catch (error) {
        return res.status(500).json({ msg: "An error occurred while verifying the password. Please try again later." });
    }
});

module.exports = router;
