import Video from "../models/video";

/*
console.log("start")
Video.find({}, (error, videos) => {
  if(error){
    return res.render("server-error")
  }
  return res.render("home", { pageTitle: "Home", videos });
});
console.log("finished")
*/

export const home = async (req, res) => {
    console.log("start")
    const videos = await Video.find({});
    console.log("finished")
    return res.render("home", {pageTitle:"HOME", videos})
    res.send("it will be ingnored. That's because there is return")
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

export const postUpload = async (req,res) => {

  try {
    const {title, description, hashtags} = req.body
    await Video.create({
      title,
      description,
      createdAt:"asdfsadf", // error발생  -> catch문으로 이동
      //createdAt: Date.now(),
      hashtags: hashtags.split(",").map((word) => `#${word}`),
      meta: {
        views: 0,
        rating: 0,
      }
    })
    return res.redirect("/")
  } catch(error) {
    return res.render("upload", {
      pageTitle: "Upload Video",
      errorMessage: error._message, 
    })
  }

}
