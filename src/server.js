import app from "./app.js";

async function connectServer() {
  app.listen(8000, () => {
    console.log(`Server is running on port ${8000}`);
  });
}
connectServer();
