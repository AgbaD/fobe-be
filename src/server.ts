import app from "./app";
import config from "./config";
import { AppDataSource } from "./utils/database.utils";

const PORT = config.port;

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected");
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error initializing database:", error);
  });
