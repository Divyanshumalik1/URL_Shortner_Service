import base62 from 'base62/lib/ascii.js';
import crypto from 'crypto';
import Datamodel from '../models/data.js';
import { error, log } from 'console';

let idcounter = 0;

/* 
   url -> hashing using crypto -> parse first 8 integers -> encode the integers -> base62 encoded value -> store {key, url} in DB
   */

export const createshorturlcontroller = async function (req, res, next) {
    const url_to_shorten = req.body.url;

    // check if already in DB
    const alreadypresent = await Datamodel.findOne({ url: url_to_shorten }).exec();
    if (alreadypresent) {
        return res.status(200).json(alreadypresent);
    }

    // hash + base62 encode
    const hash = crypto.createHash("sha256").update(url_to_shorten).digest("hex");
    const num = parseInt(hash.substring(0, 8), 16);
    const shortCode = base62.encode(num);

    idcounter++;
    const newobj = {
        id: idcounter,
        url: url_to_shorten,
        shortCode: shortCode,
        accessCount: 0,
        createdAt: Date.now(),
        updatedAt: Date.now()
    };

    // create a new mongoose document
    const doc = new Datamodel(newobj);
    await doc.save();

    res.status(201).json(doc);
};


export const retrieveoriginalurlcontroller = async function (req, res, next) {
    const shorturlgenerated = req.params.url;

    try {
        const retrievedoriginalurl = await Datamodel.findOne({ shortCode: shorturlgenerated });

        if (!retrievedoriginalurl) {
            return res.status(404).json({ error: "URL not found" });
        }

        retrievedoriginalurl.accessCount += 1;
        await retrievedoriginalurl.save();
        
        res.status(200).json({ url: retrievedoriginalurl.url });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
};

// First we get the shortcode we need to change the url for, then get the json
// then we edit and use updated values
export const updateshorturlcontroller = async function (req, res, next) {

    const shorturl = req.params.url;
    const newurl = req.body.url;

    try {

        const urltoupdate = await Datamodel.findOne({ shortCode: shorturl });

        if (!urltoupdate) {
            return res.status(404).json({ error: "Short URL not found" });
        }

        urltoupdate.url = newurl;
        urltoupdate.updatedAt = Date.now();

        await urltoupdate.save();

        res.status(200).json({ message: "URL updated successfully" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Bad Request" });
    }
};

// Delete Short URL
// Delete an existing short URL using the DELETE method

// plaintext

// DELETE /shorten/abc123
// The endpoint should return a 204 No Content status code if the short URL was successfully deleted 
// or a 404 Not Found status code if the short URL was not found.
export const deleteshorturlcontroller = async function (req, res, next) {
    const shorturltodelete = req.params.url;

    try {
        const deletedData = await Datamodel.findOneAndDelete({ shortCode: shorturltodelete });

        if (!deletedData) {
            return res.status(404).json({ error: "Short URL not found" });
        }

        // URL existed and was deleted
        return res.status(204).send(); // No content in response

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Server Error" });
    }
};

export const geturlstatscontroller = async function (req, res, next) {

    try {

        const shortCodetoaccess = req.params.url;
        const data = await Datamodel.findOne({ shortCode: shortCodetoaccess });

        if (!data) {
            return res.status(404).json({ error: "Could not Find Short URL" });
        }

        res.status(200).json({
            id: data.id,
            url: data.url,
            shortCode: data.shortCode,
            accessCount: data.accessCount,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt
        });


    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server Error" });
    }

};

// export default {
//     createshorturlcontroller,
//     retrieveoriginalurlcontroller,
//     geturlstatscontroller,
//     deleteshorturlcontroller,
//     updateshorturlcontroller
// };
