const { Router } = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { USER } = require("../Db/db");
const KEY = process.env.KEY;

const router = Router();

router.post("/signup", async function(req, res) {
    const { username, useremail, password } = req.body;

    try {
        const user = await USER.findOne({ useremail });

        if (user) {
            return res.status(400).json({ msg: "User already exists" });
        } else {
           
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(password, salt);

            await USER.create({ username, useremail, password: hashedPassword });
            return res.status(200).json({ msg: "User signed up successfully" });
        }
    } catch (error) {
        return res.status(500).json({ msg: "Something went wrong" });
    }
});

router.post("/login", async function(req, res) {
    const { useremail, password } = req.body;

    try {
        const user = await USER.findOne({ useremail });

        if (!user) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid credentials" });
        } else {
            const token = jwt.sign({ useremail }, KEY);
            return res.status(200).json({ token });
        }
    } catch (error) {
        return res.status(500).json({ msg: "Something went wrong" });
    }
});

module.exports = router;
