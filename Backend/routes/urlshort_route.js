import express from "express";
const router = express.Router();

import {
    createshorturlcontroller,
    retrieveoriginalurlcontroller,
    updateshorturlcontroller,
    deleteshorturlcontroller,
    geturlstatscontroller
} from '../controllers/controllers.js';

// Create a new short URL using the POST method
router.post('/shorten/', createshorturlcontroller);

// Get statistics for a short URL using the GET method (moved before /:url)
router.get('/shorten/:url/stats', geturlstatscontroller);

// Retrieve the original URL from a short URL using the GET method
router.get('/shorten/:url', retrieveoriginalurlcontroller);

// Update an existing short URL using the PUT method
router.put('/shorten/:url', updateshorturlcontroller);

// Delete an existing short URL using the DELETE method
router.delete('/shorten/:url', deleteshorturlcontroller);

export default router;