import Trainee from "../models/trainee.model.js";
import Trainer from "../models/trainer.model.js";
import Admin from "../models/admin.model.js";
import { hashPassword, comparePassword } from "../utils/hashPassword.js";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../utils/token.js";
// admin
export async function adminSignin(req, res) {
    try {
        const { email, password } = req.body;
        const admin = await Admin.findOne({ where: { email } })
        if (!admin) {
            return res.status(404).json({ msg: "Admin not found!" });
        }
        const isMatch = await comparePassword(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ msg: "Invalid credentials!" });
        }
        const token = generateAccessToken(admin.toJSON(), "admin");
        const refreshToken = generateRefreshToken(admin.toJSON(), "admin");
        
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true, 
            secure: false,
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(200).json({ msg: "Admin signed in", token });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: "Server error!" });
    }
}

export async function adminSignup(req, res) {
    try {
        const { firstName, lastName, email, phone, password } = req.body;
        const existingAdmin = await Admin.findOne({ where: { email } });
        if (existingAdmin) {
            return res.status(400).json({ msg: "Admin already exists!" });
        }
        const hashedPassword = await hashPassword(password);
        const newAdmin = await Admin.create({
            firstName,
            lastName,
            email,
            phone,
            password: hashedPassword
        });
        const token = generateAccessToken(newAdmin.toJSON(), "admin");
        const refreshToken = generateRefreshToken(newAdmin.toJSON(), "admin");

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 
        });
        return res.status(201).json({ msg: "Admin signup", token });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: "Server error!" });
    }
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
        const token = generateAccessToken(trainer.toJSON(), "trainer");
        const refreshToken = generateRefreshToken(trainer.toJSON(), "trainer");

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

export async function trainerSignup(req, res) {
    try {
        const { firstName, lastName, email, workplace, designation, phone, password } = req.body;
        const existingTrainer = await Trainer.findOne({ where: { email } });
        if (existingTrainer) {
            return res.status(400).json({ msg: "Trainer already exists!" });
        }
        const hashedPassword = await hashPassword(password);
        const newTrainer = await Trainer.create({
            firstName,
            lastName,
            email,
            workplace,
            designation,
            phone,
            password: hashedPassword
        });
        const token = generateAccessToken(newTrainer.toJSON(), "trainer");
        const refreshToken = generateRefreshToken(newTrainer.toJSON(), "trainer");

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 
        });
        return res.status(201).json({ msg: "Trainer signup", token });
    } catch (err) {
        console.log(err);
        return res.status(500).json({msg: "Server error!"} );        
    }
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
        const token = generateAccessToken(existingTrainees.toJSON(), "trainee");
        const refreshToken = generateRefreshToken(existingTrainees.toJSON(), "trainee");

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
        const token = generateAccessToken(newTrainee.toJSON(), "trainee");
        const refreshToken = generateRefreshToken(newTrainee.toJSON(), "trainee");

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
    const newAccessToken = generateAccessToken({ id: decoded.id, email: decoded.email, name: decoded.name, role: decoded.role });
    res.json({ token: newAccessToken });
  } catch (err) {
    return res.status(403).json({ error: 'Invalid refresh token' });
  }
};