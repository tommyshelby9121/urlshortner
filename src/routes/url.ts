import express, { Request, Response } from "express";
import { isUri } from "valid-url";
import { generate } from "shortid";
const router = express.Router();

// Url Model
import Url from "../model/Url";

// @route   POST /api/url/shorten
// @desc    Create a short url
router.post("/shorten", async (req: Request, res: Response) => {
    const {longUrl} = req.body;
    const baseUrl: string = process.env.BASE_URL!;

    // Check if baseUrl is valid
    if (!isUri(baseUrl)) {
        return res.status(400).json("Invalid base url");
    }

    // Create url code
    const urlCode = generate();

    // Check if longUrl is valid
    if (isUri(longUrl)) {
        try {
            let url = await Url.findOne({ longUrl });

            if (url) {
                res.status(409).json(`${url} already exists`);
            }
            else {
                const shortUrl = baseUrl + "/" + urlCode;

                url = new Url({
                    urlCode,
                    longUrl,
                    shortUrl,
                });

                await url.save();

                res.status(201).json(shortUrl);
            }
         } catch (err) {
            console.error(err);
            res.status(400).json("Invalid long url");
        }
    }
});

export default router;