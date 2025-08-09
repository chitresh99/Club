import express, { type Request, type Response } from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url); //gives the file name (basically the whole path with the file name)
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const router = express.Router();

const event_service_url = process.env.EVENT_SERVICE_URL;

if (!event_service_url) {
    console.error("EVENT_SERVICE_URL is not defined in environment variables");
    process.exit(1);
}

const eventsProxy = createProxyMiddleware({
    target: event_service_url,
    changeOrigin: true,
    pathRewrite: { "^/events": "" },
    timeout:5000,
    onError: (err: Error,req:Request,res:Response) => {
        console.log("Proxy error:",err.message);
        if(!res.headersSent){
            res.status(500).json({
                error:"Events service unavailable",
                message: err.message
            });
        }
    },
    onProxyReq:(proxyReq:any,req:Request,res:Response) =>{
        console.log(`Proxying ${req.method} ${req.url} to ${event_service_url}`);
    }
} as any);

router.use("/",eventsProxy);

export default router;