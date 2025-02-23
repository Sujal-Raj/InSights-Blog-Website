import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    title: {
        type: String,
        required: [true, "Title is required"],
    },
    category:{
        type:String,
        trim:true
    },
    content:{
        type:String,
        require:true,
    }  
})

const Blog = mongoose.models.blogs||mongoose.model("blogs",blogSchema)

export default Blog;