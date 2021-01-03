import express, { Request, Response } from "express";
const router = express.Router();

// Url Model
import Url from "../model/Url";

// @route   GET /:code
// @desc    Redirect to original url
router.get("/:code", async (req: Request, res:Response) => {
    try {
        const url = await Url.findOne({ urlCode: req.params.code }, (err:any) => {
           if (err) return console.error(err);
        });

        if (url) {
            res.redirect(url.longUrl);
        }
        else {
            return res.status(404).json({
                error: "No URL Found!",
            });
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            error: err.message,
        });
    }
});

export default router;