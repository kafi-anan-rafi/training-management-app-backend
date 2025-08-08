import Trainee from "../models/trainee.model.js";
import { hashPassword, comparePassword } from "../utils/hashPassword.js";
import { generateToken } from "../utils/token.js";
// admin
export function adminSignin(req, res) {
    res.status(201).json({msg: "Admin singin"})
}

export function adminSignup(req, res) {
    res.status(201).json({msg: "Admin signup"})
}

// trainer
export function trainerSignin(req, res) {
    res.status(201).json({msg: "trainer signin"})
}

export function trainerSignup(req, res) {
    res.status(201).json({msg: "trainer signup"})
}

// trainee
export async function traineeSignin(req, res) {
    try {
        const { email, password } = req.body;
        const existingTrainees = await Trainee.findOne({where: { email }});
        if (!existingTrainees) {
            return res.status(404).json({ msg: "Trainee not found!" });
        }
        const isMatch = await comparePassword(password, existingTrainees.password);
        if (!isMatch) {
            return res.status(401).json({ msg: "Invalid credentials!" });
        }
        const token = generateToken(existingTrainees.toJSON());
        res.status(200).json({ msg: "Trainee signed in", token });
    } catch (err) {
        res.status(500).json({msg: "Server error!"});
        console.log(err)
    }
}

export async function traineeSignup(req, res) {
    try {
        const { firstName, lastName, email, workplace, designation, phone, password } = req.body;
        const existingTrainees = await Trainee.findOne({ where: { email } });
        if (existingTrainees !== null) {
            return res.status(400).json({ msg: "Trainee already exists!" });
        }

        const hashedPassword = await hashPassword(password);
        const newTrainee = await Trainee.create({
            firstName,
            lastName,
            email,
            workplace,
            designation,
            phone,
            password: hashedPassword
        });
        const token = generateToken(newTrainee.toJSON());
        res.status(201).json({ msg: "trainee signup", token });
    } catch (err) {
        res.status(500).json({msg: "Server error!"});
        console.log(err)
    }
}