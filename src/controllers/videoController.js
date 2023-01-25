export const trending = (req, res) => {

  const videos = [
    
    {
        title:"KOREA"
    },
    {
        title:"JAPAN"
    },
    {
        title:"CHINA"
    }
  ];
  
  return res.render("home", {pageTitle: "Home", videos});
}

export const see = (req, res) => {
    res.render('watch', {pageTitle: "videos/watch(5.4 testing)"})   
}

export const edit = (req, res) => {
    res.render("edit");
}

export const search = (req, res) => res.send("Search");
export const upload = (req, res) => res.send("Upload");
export const deleteVideo = (req, res) => {
  return res.send("Delete Video");
};