import express from "express";
import dotenv from 'dotenv';
import path from "path";
import { fileURLToPath } from 'url';
import authRoutes from './routes/auth.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const app = express();
const port = process.env.PORT || 3000;

app.use("/auth", authRoutes);

app.get("/health", (req, res) => {
    res.json({ status: "API Gateway is running" });
});

app.listen(port, () => {
    console.log(`API Gateway running on port ${port}`);
});



