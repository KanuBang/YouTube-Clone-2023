import Video from "../models/video";

export const home = (req, res) => {
  console.log("Start");
  Video.find({}, (error, videos) => {
    console.log("Finished");
    console.log(error)
    console.log(videos)
    return res.render("home", { pageTitle: "Home", videos });
  });
  console.log("I finish first");
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
