import express from "express";
import dotenv from "dotenv";
import { v4 as uuidv4, validate as isUuid } from "uuid";

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

app.post("/api/users", (req, res) => {
  const { username, age, hobbies } = req.body;
  if (!username || !age || !Array.isArray(hobbies)) {
    return res.status(400).json({ message: "Invalid request body" });
  }
  const newUser = {
    id: uuidv4(),
    username,
    age,
    hobbies,
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

app.get("/api/users/:userId", (req, res) => {
  const { userId } = req.params;
  if (!isUuid(userId)) {
    return res.status(400).json({ message: "Invalid user ID format" });
  }
  const user = users.find((u) => u.id === userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json(user);
});

app.use((req, res) => {
  res.status(404).json({
    message: "The requested endpoint was not found",
  });
});
