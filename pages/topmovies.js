import clientPromise from "../lib/mongodb";

export default function Top({ movies }) {
   return (
      <div>
         <h1>Top 1000 Movies of All Time</h1>
         <p>
            <small>(According to Metacritic)</small>
         </p>
         <ul>
            {movies.map(movie => (
               <li key={Date.parse(movie.released)}>
                  <h2>{movie.title}</h2>
                  <h3>{ `Metacritic score: ${movie.metacritic}` }</h3>
                  <p>{movie.plot}</p>
               </li>
            ))}
         </ul>
      </div>
   );
}

export async function getStaticProps() {
   try {

      // Connect to database
      const client = await clientPromise;
      const db = client.db("sample_mflix");

      // Get top 1000 movies with best metacritic score in descending order as an array
      const movies = await db
         .collection("movies")
         .find({})
         .sort({ metacritic: -1 })
         .limit(1000)
         .toArray();
      
      // Return array to page component as JSON
      return {
         props: {
            movies: JSON.parse(JSON.stringify(movies))
         }
      };
   } catch(e) {
      console.error(e);
   }
}