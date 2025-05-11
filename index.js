import express from "express";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

const users = [
  {
    id: uuidv4(),
    username: "John Doe",
    age: 30,
    hobbies: ["reading", "traveling"],
  },
  {
    id: uuidv4(),
    username: "Jane Smith",
    age: 25,
    hobbies: ["painting", "cycling"],
  },
];

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.get("/api/users", (_, res) => {
  res.status(200).json(users);
});
