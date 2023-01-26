/*이거 제목 강의에서는 대문자임 => Video.js */
import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    title: String,
    description: String,
    createdAt: Date,
    hashtags: [{type: String}],
    meta: {
        views: Number,
        rating: Number,
    }
})

const Video = mongoose.model("Video", videoSchema)

export default Video;