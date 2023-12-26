import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const app = express();
app.use("*", cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const prisma = new PrismaClient();

app.get("", (req, res) => {
  const message = `Server is running `;
  res.status(StatusCodes.OK).json({
    message,
  });
});

app.post("/login", async (req, res, next) => {
  try {
    const payload = req.body;
    const result = await prisma.user.create({
      data: payload,
    });
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Not found",
    errorMessages: [
      {
        path: req.originalUrl,
        message: "API not found",
      },
    ],
  });
  next();
});

export default app;
