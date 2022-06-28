import express from "express";
import argon2 from "argon2";

import User from "../models/user";

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser)
            return res.status(400).json({ msg: "Email already in use" });

        const hashedPassword = await argon2.hash(password);

        let user = new User({ name, email, hashedPassword });

        user = await user.save();

        return res.json(user);
    } catch (e: any) {
        return res.status(500).json({ error: e.message });
    }
});

export default authRouter;
