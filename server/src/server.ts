import express from "express";
import path from "path";
import userRoutes from "./routes/userRoutes";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, "../../app/dist")));

app.use("/api/users", userRoutes);

app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname, "../../app/dist/index.html"));
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port ${process.env.PORT || 5000}`);
});