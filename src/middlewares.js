export const localsMiddleware = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.sitName ="Wetube"
  res.locals.loggedInUser = req.session.user;
  console.log(req.session.user)
  next()  
}


export const protectorMiddleware = (req, res, next) => {
  if(req.session.loggedIn) {
    return next()
  }
// 로그인 되어있다면 진행
  else {
    return res.redirect("/login")
  }
}

export const publicOnlyMiddleware = (req, res, next) => {
  if(!req.session.loggedIn) {
    return next()
  }
// 로그인 되어 있지 않으면 요청을 계속
  else {
    return res.redirect("/")
  }
}