URL Shortener Service

A RESTful URL shortening service built with Node.js, Express, and MongoDB.
Provides features similar to TinyURL or Bitly: create, retrieve, update, delete, and track short URLs.

🌟 Features

Shorten URLs: Generate compact URLs using SHA256 + Base62 encoding.

Retrieve original URLs by short code.

Update URLs for existing short codes.

Delete URLs from the database.

Track statistics: Access count, creation date, and last update.

📂 Folder Structure
Backend/
│
├── controllers/
│   └── controllers.js     # Handles all request logic
├── models/
│   └── data.js            # Mongoose schema for URL documents
├── routes/
│   └── urlshort_route.js  # Defines all API endpoints
├── .env                   # MongoDB credentials & environment variables
├── server.js              # Express app entry point
├── package.json
└── package-lock.json

⚙️ Environment Variables

Create a .env file in Backend/:

MONGO_URI=your_mongodb_connection_string
PORT=3001

Important: Keep .env in .gitignore to prevent exposing your database credentials.

💻 Installation

# Clone the repository
git clone https://github.com/YourUsername/URL_Shortner_Service.git
cd URL_Shortner_Service/Backend

# Install dependencies
npm install

# Start the server
node server.js

Server runs at: http://localhost:3001

🛣️ API Endpoints
1️⃣ Create Short URL

POST /shorten/

Body:

{
  "url": "https://example.com"
}

Response:

{
  "id": 1,
  "url": "https://example.com",
  "shortCode": "b2a1",
  "accessCount": 0,
  "createdAt": "2026-03-14T00:00:00Z",
  "updatedAt": "2026-03-14T00:00:00Z"
}

Curl Example:

curl -X POST http://localhost:3001/shorten/ \
-H "Content-Type: application/json" \
-d '{"url":"https://example.com"}'
2️⃣ Retrieve Original URL

GET /shorten/:url

Params: url = short code

Response:

{ "url": "https://example.com" }

Curl Example:

curl http://localhost:3001/shorten/b2a1

3️⃣ Update Short URL

PUT /shorten/:url

Params: url = short code

Body:

{ "url": "https://new-url.com" }

Response:

{ "message": "URL updated successfully" }

Curl Example:

curl -X PUT http://localhost:3001/shorten/b2a1 \
-H "Content-Type: application/json" \
-d '{"url":"https://new-url.com"}'

4️⃣ Delete Short URL

DELETE /shorten/:url

Params: url = short code

Response: 204 No Content on success, 404 Not Found if not exists

Curl Example:

curl -X DELETE http://localhost:3001/shorten/b2a1
5️⃣ Get URL Statistics

GET /shorten/:url/stats

Params: url = short code

Response:

{
  "id": 1,
  "url": "https://example.com",
  "shortCode": "b2a1",
  "accessCount": 5,
  "createdAt": "2026-03-14T00:00:00Z",
  "updatedAt": "2026-03-14T00:00:00Z"
}

Curl Example:

curl http://localhost:3001/shorten/b2a1/stats

🧠 How It Works

Hashing + Base62:
The original URL is hashed using SHA256. The first 8 characters are converted to an integer, then encoded in Base62 to generate a unique short code.

Database Storage:
Each URL document stores:

id: Sequential identifier

url: Original URL

shortCode: Encoded short URL

accessCount: Number of times retrieved

createdAt / updatedAt: Timestamps

Controller Functions:

createshorturlcontroller: Creates new short URLs

retrieveoriginalurlcontroller: Retrieves original URL

updateshorturlcontroller: Updates a URL

deleteshorturlcontroller: Deletes a URL

geturlstatscontroller: Returns statistics

RESTful Routes:

POST /shorten/ → create

GET /shorten/:url → retrieve

GET /shorten/:url/stats → stats

PUT /shorten/:url → update

DELETE /shorten/:url → delete

📈 Project Diagram
[Client] --> POST /shorten --> [Controller] --> [MongoDB]
[Client] --> GET /shorten/:url --> [Controller] --> [MongoDB] --> returns original URL
[Client] --> PUT /shorten/:url --> [Controller] --> updates DB
[Client] --> DELETE /shorten/:url --> [Controller] --> deletes from DB
[Client] --> GET /shorten/:url/stats --> [Controller] --> DB stats

🔧 Tech Stack

Node.js + Express

MongoDB + Mongoose

dotenv for environment variables

Base62 encoding for short URLs

RESTful API design

✅ Notes

Duplicate URLs generate the same short code (deterministic).

Access counts are incremented every retrieval.

Fully modular: controllers, routes, and models are separated.
