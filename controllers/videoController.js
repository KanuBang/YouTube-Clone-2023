export const trending = (req, res) => res.send("<!DOCTYPE html><html lang='ko'><head><title>Wetube</title></head><body><h1>Home</h1><footer>&copy;2021 Wetube - All rights reserved</footer></body></html>");

export const see = (req, res) => {
    return res.send(`Watch Video #${req.params.id}`)   
}

export const edit = (req, res) => res.send("Edit Video");
export const search = (req, res) => res.send("Search")
export const upload = (req, res) => res.send("Upload")
export const deleteVideo = (req, res) => res.send("Delete Video")
