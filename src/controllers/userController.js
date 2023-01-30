import User from "../models/User";

export const getJoin = (req, res) => res.render("join", {pageTitle: "Join"});
export const postJoin = async (req, res) => { 
    
    const {name,username,email,password,pwd2, location} = req.body
    
    const pageTitle = "Join"
    
    if(password !== pwd2) {
        return res.render("Join", {
            pageTitle,
            errorMsg: "Password confrimation failed",
        })
    }
    
    const exists = await User.exists({$or: [{username: username}, {email: email}]})
    /*
        username: db username
        username: form username
    */
    if(exists) {
        return res.render("Join", {
            pageTitle,
            errorMsg: "The username/email is already taken",
        })
    }

    await User.create({
        name,
        username,
        email,
        password,
        location
    })
    return res.redirect("/login")
}

export const remove = (req,res) => res.send("Remove User");
export const edit = (req, res) => res.send("Edit User");
export const login = (req, res) => res.send("Login");
export const logout = (req, res) => res.send("Logout");
export const see = (req, res) => res.send("See User");
