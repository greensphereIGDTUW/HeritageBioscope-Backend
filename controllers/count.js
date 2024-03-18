import Posts from '../models/posts.js'; 
import Blog from "../models/blog.js";
import { MongoClient } from "mongodb";
import dotenv from 'dotenv'; 

dotenv.config();

const uri = process.env.MONGO; 
const client = new MongoClient(uri);

 export const getPostsCount = async (req, res) => {
     let estimate = 0; 
    try {
        await client.connect();
    
        const database = client.db("heritage");
        const posts = database.collection("posts");
    
        // Estimate the total number of documents in the collection
        // and print out the count.
        estimate = await posts.estimatedDocumentCount();
        console.log(`Estimated number of documents in the posts collection: ${estimate}`);
      } finally {
        res.status(200).json(estimate); 
        await client.close();
      }
    }

export const getBlogCount = async (req, res) => {
    let estimate = 0; 
    try {
        await client.connect();
    
        const database = client.db("heritage");
        const posts = database.collection("blogs");
    
        // Estimate the total number of documents in the collection
        // and print out the count.
        estimate = await posts.estimatedDocumentCount();
        console.log(`Estimated number of documents in the blogs collection: ${estimate}`);
      } finally {
        res.status(200).json(estimate); 
        await client.close();
      }
}
