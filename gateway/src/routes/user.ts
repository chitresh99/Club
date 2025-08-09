import express, { type Request, type Response } from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import dotenv from 'dotenv';
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const router = express.Router();

const user_service_url = process.env.USER_SERVICE_URL;

if (!user_service_url) {
    console.error("USER_SERVICE_URL is not defined in environment variables");
    process.exit(1);
}

const userProxy = createProxyMiddleware({
    target: user_service_url,
    changeOrigin: true,
    pathRewrite: { "^/club": "" },
    timeout: 5000,
    onError: (err: Error, req: Request, res: Response) => {
        console.error("Proxy error:", err.message);
        if (!res.headersSent) {
            res.status(500).json({ 
                error: "Club service unavailable",
                message: err.message 
            });
        }
    },
    onProxyReq: (proxyReq: any, req: Request, res: Response) => {
        console.log(`Proxying ${req.method} ${req.url} to ${user_service_url}`);
    }
} as any);

router.use("/", userProxy);

export default router;