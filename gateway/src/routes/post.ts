import express, { type Request, type Response } from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const router = express.Router();

const post_service_url = process.env.POST_SERVICE_URL;

if (!post_service_url) {
    console.log("POST_SERVICE_URL is not defined in environment variables");
    process.exit(1);
}

const postProxy = createProxyMiddleware({
    target: post_service_url,
    changeOrigin: true,
    pathRewrite: { "^/post": "" },
    timeout: 5000,
    onError: (err: Error, req: Request, res: Response) => {
        console.log("Proxy error: ", err.message);
        if (!res.headersSent) {
            res.status(500).json({
                error: "Post service unavailable",
                message: err.message
            });
        }
    },
    onProxyReq: (proxyReq: any, req: Request, res: Request) => {
        console.log(`Proxying ${req.method} ${req.url} to ${post_service_url}`);
    }
    
} as any);

router.use("/",postProxy);

export default router;
