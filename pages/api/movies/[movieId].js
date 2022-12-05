import clientPromise from "../../../lib/mongodb";
import { ObjectId } from 'mongodb';

export default async(req, res) => {

   // Get parameter in URL as 'movieId'
   const { movieId } = req.query;

   try {

      // Connect to database
      const client = await clientPromise;
      const db = client.db("sample_mflix");

      // Get first movie that matches captured 'movieId' as an array
      const movie = await db
         .collection("movies")
         .find({ _id: ObjectId(movieId) })
         .toArray();
      
      // Return array as JSON
      res.json(movie);
   } catch(e) {
      console.error(e);
   }
}