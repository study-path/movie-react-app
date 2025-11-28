import { Client, TablesDB, Query, ID } from "appwrite";

const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_TABLE_ID;

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(PROJECT_ID);

const tablesDB = new TablesDB(client);

export const updateSearchCount = async (searchTerm, movie) => {
  console.log(PROJECT_ID, DATABASE_ID, COLLECTION_ID);
  //1. Use Appwrite SDK to check if the search term exists in the database
  try {
    const result = await tablesDB.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("searchTerm", searchTerm),
    ]);
    //2. If it does, update the count
    if (result.rows.length > 0) {
      const doc = result.rows[0];

      await tablesDB.updateDocument(DATABASE_ID, COLLECTION_ID, doc.$id, {
        count: doc.count + 1,
      });
      //3. If it doesn't, create a new document with the search term and set a count as 1
    } else {
      await tablesDB.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        searchTerm,
        count: 1,
        movie_id: movie.id,
        poster_url: `https://image.tmdb.org/t/p/w200${poster_path}`,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
