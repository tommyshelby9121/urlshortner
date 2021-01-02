import express, { Request, Response } from "express";
import { isUri } from "valid-url";
import { generate } from "shortid";
const router = express.Router();

// @route   POST /api/url/shorten
// @desc    Create a short url
router.post("/shorten", (req:Request, res:Response) => {
    const { longUrl } = req.body;
    const baseUrl:string = process.env.BASE_URL!;

    // Check if baseUrl is valid
    if (!isUri(baseUrl)) {
        return res.status(400).json("Invalid base url");
    }

    // Create url code
    const urlCode = generate();
});

export default router;