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
export function traineeSignin(req, res) {
    try {
        const { email, password } = req.body;
        res.status(201).json({ msg: "trainee signin" })
    } catch (err) {
        res.status(500).json({msg: "Server error!"});
        console.log(err)
    }
}

export function traineeSignup(req, res) {
    res.status(201).json({msg: "trainee signup"})
}