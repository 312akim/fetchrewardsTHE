# Fetch Rewards Take Home Exam
This server mocks a points earned, spent, and remaining system.

### Downloading and Installing dependencies for the server
[NPM](https://www.npmjs.com/) is required to run this server.

Navigate CLI to desired download location and run

**git clone https://github.com/312akim/fetchrewardsTHE.git**

In CLI navigate to the root of the directory (inside of the directory just cloned)

To download dependencies
Run:

**npm install**

### Starting the Server
In CLI navigate to root directory.

Run:

**npm start**

Server should now be running on localhost port 3306.

Confirm by navigating to http://localhost:3306/ on a browser.
"Server is active" should be visible on the web page.

### Interacting with the Server
[POSTMAN](https://www.postman.com/) is a great tool for interacting with endpoints and my recommended tool for interacting with this server.

#### Endpoints:
To add a transaction[^1]

POST: http://localhost:3306/api/points/addTransaction

To spend points[^2]

POST: http://localhost:3306/api/points/spendPoints

To get all payers and points remaining

GET: http://localhost:3306/api/points/returnPoints

To reset transaction history[^3]

POST: http://localhost:3306/api/points/resetTransactions

[^1]: Requires object with keys "payer" and "points". Eg. { "payer": "DANNON", "points": 5000 }
[^2]: Requires object key "points". Eg. { "points": 500 }
[^3]: Requires object key "reset" set to true. Eg. { "reset": true }


### Running Jest Tests
In CLI navigate to root directory.

Run:
**npm run test**