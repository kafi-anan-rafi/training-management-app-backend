export function adminSignin(req, res) {
    res.status(201).json({msg: "Admin singin"})
}

export function adminSignup(req, res) {
    res.status(201).json({msg: "Admin signup"})
}

export function trainerSignin(req, res) {
    res.status(201).json({msg: "trainer signin"})
}
export function trainerSignup(req, res) {
    res.status(201).json({msg: "trainer signup"})
}

export function traineeSignin(req, res) {
    res.status(201).json({msg: "trainee signin"})
}
export function traineeSignup(req, res) {
    res.status(201).json({msg: "trainee signup"})
}