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
    const videos = await Video.find({}); // 비디오 전체 데이터
    console.log("finished")
    return res.render("home", {pageTitle:"HOME", videos})
    res.send("it will be ingnored. That's because there is return")
}

export const watch = async (req, res) => {
    const {id} = req.params;
    const video = await Video.findById(id);
    console.log(video) //just test
    if(!video) {
      return res.render("404", {pageTitle: "NOT FOUND"})
    }
    console.log("hereadsf")

    return res.render('watch', {pageTitle: video.title, video:video})   
}

export const getEdit = async (req, res) => {
  console.log("here")
  const {id} = req.params;
  const video = await Video.findById(id);
  console.log("5")

  if(!video) {
    console.log("23452345")
    return res.render("404", {pageTitle: "NOT FOUND"})
  }
  console.log("hereasdfsdfafd")
  return res.render('edit', {pageTitle: `Edit: ${video.title}`, video})
}

export const postEdit = async (req, res ) => {
  const id = req.params.id;
  const {title, description, hashtags} = req.body;
  const video = await Video.exists({_id:id});
  if(!video) {
    return res.render("404", {pageTitle: "NOT FOUND"})
  }

  await Video.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: Video.formatHashtags(hashtags),
  })
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
      //createdAt:"asdfsadf", // error발생  -> catch문으로 이동
      createdAt: Date.now(),
      hashtags: Video.formatHashtags(hashtags),
    })
    return res.redirect("/")
  } catch(error) {
    return res.render("upload", {
      pageTitle: "Upload Video",
      errorMessage: error._message, 
    })
  }

}
