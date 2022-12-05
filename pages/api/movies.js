import clientPromise from "../../lib/mongodb";

export default async(req, res) => {
   try {

      // Connect to database
      const client = await clientPromise;
      const db = client.db("sample_mflix");

      // Get top 10 movies with best metacritic score in descending order as an array
      const movies = await db
         .collection("movies")
         .find({})
         .sort({ metacritic: -1 })
         .limit(10)
         .toArray();
      
      // Return array as JSON
      res.json(movies);
   } catch(e) {
      console.error(e);
   }
}