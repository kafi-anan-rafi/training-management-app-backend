import Trainee from "../models/trainee.model.js";
import Trainer from "../models/trainer.model.js";
import { hashPassword, comparePassword } from "../utils/hashPassword.js";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../utils/token.js";
// admin
export function adminSignin(req, res) {
    res.status(201).json({msg: "Admin singin"})
}

export function adminSignup(req, res) {
    res.status(201).json({msg: "Admin signup"})
}

// trainer
export async function trainerSignin(req, res) {
    try {
        const { email, password } = req.body;
        const trainer = await Trainer.findOne({ where: { email } });
        if (!trainer) {
            return res.status(404).json({ msg: "Trainer not found!" });
        }
        const isMatch = await comparePassword(password, trainer.password);
        if (!isMatch) {
            return res.status(401).json({ msg: "Invalid credentials!" });
        }
        const token = generateAccessToken(trainer.toJSON());
        const refreshToken = generateRefreshToken(trainer.toJSON());

        res.cookie('refreshToken', refreshToken, { 
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.status(200).json({ msg: "Trainer signed in", token });
    } catch (err) {
        console.log(err); 
        return res.status(500).json({ msg: "Server error!" });
    }
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
        const token = generateAccessToken(existingTrainees.toJSON());
        const refreshToken = generateRefreshToken(existingTrainees.toJSON());

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 
        });

        return res.status(200).json({ msg: "Trainee signed in", token });
    } catch (err) {
        console.log(err)
        return res.status(500).json({msg: "Server error!"});
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
        const token = generateAccessToken(newTrainee.toJSON());
        const refreshToken = generateRefreshToken(newTrainee.toJSON());

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 
        });
        return res.status(201).json({ msg: "trainee signup", token });
    } catch (err) {
        console.log(err);
        return res.status(500).json({msg: "Server error!"});
    }
}

export async function refreshToken(req, res) {
  const token = req.cookies.refreshToken;
  console.log(token);

  if (!token) return res.status(401).json({ msg: 'No refresh token provided' });

  try {
    const decoded = verifyRefreshToken(token);
    const newAccessToken = generateAccessToken({ id: decoded.id, email: decoded.email, name: decoded.name });
    res.json({ token: newAccessToken });
  } catch (err) {
    return res.status(403).json({ error: 'Invalid refresh token' });
  }
};