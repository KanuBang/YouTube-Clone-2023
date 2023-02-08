import User from "../models/User";
import bcrypt from "bcrypt";
import fetch from "node-fetch"
import e from "express";

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
  const user = await User.findOne({username:username, socialOnly: false})
  // 소셜 로그인이 아님을 socialOnly로 표현

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

export const startGithubLogin = (req, res) => {
    //https://github.com/login/oauth/authorize?client_id=bbb94458388405cea69b&allow_signup=false&scope=read%3Auser+user%3Aemail
    console.log("Users are redirected to request their GitHub identity")
    const baseUrl = "https://github.com/login/oauth/authorize"
    // USER가 소셜 APP에서 신원을 확인한다. 
    // USER가 어떠 한 APP에 소셜 APP의 유저 정보 접근 권한을 부여하면
    // 그 APP은 OAuth App이 된다.

    // 위의 과정을 위해서는
    // USER가 소셜 APP(github)으로 redirect 되어서 위의 과정을 시행해야 한다.
    // baseUrl이 그 redirect 주소다.

    
    // 유저를 OAUTH APP으로 redirect 시킬 때 필요한 url 정보
    const config = {
        client_id : process.env.GH_CLIENT,
        //Required.  // OAuth App의 식별자로
        //어떤 APP이 소셜 App으로부터 OAUTH APP으로 등록됬을때 받는 것
        allow_signup : true,
        // 유저가 소셜 APP에 인증되지 않았을때 
        //그 유저가 소멸 APP에 계정을 등록할 옵션을 제공받게 할지 말지 결정한다.
        scope: "read:user user:email" 
        // OAUTH APP이 소셜 APP으로부터 USER에 대한 정보를 얼마 만큼 읽어내고 어떤 정보를 가져올 것인지
    }
    
    const params = new URLSearchParams(config).toString()
    // 유저를 OAUTH APP으로 redirect 시킬 때 필요한 url 정보
    const finalUrl = `${baseUrl}?${params}`
    // callbakc redirect
    console.log(config)
    return res.redirect(finalUrl) 
    // USER는 
}

// callback 라우터로 인해 finishGithubLogin 컨트롤러가 이용됨
export const  finishGithubLogin = async (req,res) => {
    console.log("Users are redirected back to your site by GitHub")
    console.log("Exchange this code for an access token")
    console.log("POST https://github.com/login/oauth/access_token")

    const baseUrl = "https://github.com/login/oauth/access_token"
    const config = {
        client_id: process.env.GH_CLIENT,
        client_secret: process.env.GH_SECRET,
        /* 
        인증 서버와 OAuth App만이 가지고 있는 기밀이다.
        이것을 인증된 요청자에게만 부여함으로써 client의 reosource를 보호한다.
        */
        code: req.query.code
        //
        // 소셜 로그인 서버가 
        // 명시된 scope를 참고하여 code를 민든다. 
        // 이 코드는 후에 accessToken으로 교환된다.
        /*http://localhost:8081/users/github/callback?code=13c5c82af44b7f5e0781*/
    }

    const params = new URLSearchParams(config).toString()
    const finalUrl = `${baseUrl}?${params}`
    //code를 accessToken으로 교환하는 요청을 보낼 URL

    const tokenRequest = await (
        await fetch(finalUrl, {
        //POST https://github.com/login/oauth/access_token
        method: "POST", //finalUrl에 POST 요청 후 data를 받아옴
        headers: {
            Accept:"application/json" //json으로 data리턴. 이거 없으면 text로 리턴함
          },
        })
    ).json()
    
    console.log("3. Use the access token to access the API")
    console.log("The access token allows you to make requests to the API on a behalf of a user.")
    console.log("Authorization: Bearer OAUTH-TOKEN \n GET https://api.github.com/user")
    
    
      //즉, 우리가 정한 scope에 따라서 github가 code를 준다.
      //그리고 access_token은 code에 따라 만들어지므로
      //access_token에는 scope 내용이 담겨져 있다.

    if("access_token" in tokenRequest) {
        //scope: "read:user user:email" 중 read:user을 함
        const {access_token} = tokenRequest
        const apiUrl ="https://api.github.com"
        const userData = await(
            //github api를 통해 public user 데이터를 받아올 수 있다.
            await fetch(`${apiUrl}/user`, {
                headers: {
                    Authorization: `token ${access_token}`,
                }
            })
        ).json()
        console.log(userData);
      
        const emailData = await(
            //내가 scope로 정했기 때문에
            //github api를 통해 email 데이터를 받아올 수 있다.
            await fetch(`${apiUrl}/user/emails`, {
                headers: {
                    Authorization: `token ${access_token}`
                },
            })
        ).json()

        const emailObj = emailData.find(
            (email) => email.primary === true && email.verified === true
        ) // 유효한 이메일 객체를 찾고

        console.log(emailObj);
        
        if (!emailObj) {
            return res.redirect("/"); // 유효한 이메일 객체를 못 찾았다면 홈으로 리다이렉트
        }
        let user = await User.findOne({email: emailObj.email}) // database 해당 이메일을 가진 유저를 찾는다
    
        if(!user) {
            const user = await User.create({
                avatarUrl: userData.avatar_url,
                name: userData.name,
                username: userData.login,
                email: emailObj.email,
                password: "",
                socialOnly: true,
                location: userData.location,
            })
        }
        else {
            // database에 해당 유효한 이메일이 없다면 그 github email로 계정을 생성한다.
            // socialLogin이기에 다음이 필요하다.
            /*
              password: "",
              socialOnly: true,
            */
         
            req.session.loggedIn = true;
            req.session.user = user;
            return res.redirect("/");
        }
    }

    else {
        //response 안에 엑세스 토큰이 없다면 login으로 redirect
        return res.redirect("/login");
    }
    //즉, url 코드를 가지고 github 백엔드에 request를 보내니 access_token이 생겼다.
  

}

export const logout = (req, res) => {
    req.session.destroy();
    return res.redirect("/")
  }

export const getEdit = (req,res) => {
    return res.render("edit-profile", {pageTitle: "Edit Profile"});
};

export const postEdit = (req, res) => {
    return res.render("edit-profile");
}

export const see = (req, res) => res.send("See User");
