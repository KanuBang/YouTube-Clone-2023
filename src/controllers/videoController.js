import Video from "../models/video";

/*
console.log("start")
Video.find({}, (error, videos) => {
  return res.render("home", { pageTitle: "Home", videos });
});
console.log("finished")
*/

export const home = async (req, res) => {
    console.log("start")
    const videos = await Video.find({});
    console.log("finished")
    return res.render("home", {pageTitle:"HOME", videos})
}

export const watch = (req, res) => {
    const {id} = req.params;
    return res.render('watch', {pageTitle: `Watching`})   
}

export const getEdit = (req, res) => {
  const {id} = req.params;
  return res.render('edit', {pageTitle: `Editing`})
}

export const postEdit = (req, res ) => {
  const id = req.params.id;
  const title = req.body.title;
  return res.redirect(`/videos/${id}`);
};

export const getUpload = (req,res) => {
  return res.render("upload", {pageTitle:"Upload Video"})
};

export const postUpload = (req,res) => {
  const title = req.body.chanwu
  return res.redirect("/")
}
