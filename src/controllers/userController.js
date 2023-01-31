import User from "../models/User";
import bcrypt from "bcrypt";

export const getJoin = (req, res) => res.render("join", {pageTitle: "Join"});
export const postJoin = async (req, res) => { 
    
    const {name,username,email,password,pwd2, location} = req.body
    
    const pageTitle = "Join"
    
    if(password !== pwd2) {
        return res.status(400).render("Join", {
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
        return res.status(400).render("Join", {
            pageTitle,
            errorMsg: "The username/email is already taken",
        })
    }
    try {
        await User.create({
            name: name,
            //Db name: form name
            username,
            email,
            password,
            location
        })
        return res.redirect("/login")

    } catch(error) {
        return res.status(400).render("join", {
            pageTitle: "Upload Video",
            errorMsg: error._message,
        })
    }
}

export const getLogin = (req, res) => res.render("login", {pageTitle: "Login"})

export const postLogin = async (req, res) => {
  const {username, password} = req.body;
  const pageTitle = "Login";
  const user = await User.findOne({username:username})

  if(!user) {
    return res.status(400).render("login", {
        pageTitle,
        errorMsg: "An account with this username does not exists."
    })
  }

  const ok = await bcrypt.compare(password, user.password)
  if(!ok) {
    return res.status(400).render("login", {
        pageTitle,
        errorMsg: "Wrong password"
    })
  }
  req.session.loggedIn = true;
  req.session.user = user;

  return res.redirect("/")
} 

export const logout = (req, res) => {
  req.session.loggedIn = false;
  console.log(req.session.loggedIn)
  return res.redirect("/")
}

export const remove = (req,res) => res.send("Remove User");
export const edit = (req, res) => res.send("Edit User");
export const see = (req, res) => res.send("See User");
