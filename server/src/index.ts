import dotenv from "dotenv";
import app from "./app";
import { connectDB } from "./utils";

dotenv.config();

const PORT = process.env.PORT || 5000;

// Connect to MONGODB Database
(async () => {
  await connectDB();
})();



app.listen(PORT, () => console.log(`Server is listening on port ${PORT}...`));
