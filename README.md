# Fetch Rewards Take Home Exam
This server mocks a points earned. spent, and remaining system.

### Downloading and Installing dependencies for the server
NPM is required to run this server.

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
POSTMAN is a great tool for interacting with endpoints and my recommended tool to interacting with this server.

#### Endpoints:
To add a transaction
POST: http://localhost:3306/api/points/addTransaction
Requires object with keys "payer": string and "points": number.

To spend points
POST: http://localhost:3306/api/points/spendPoints
Requires object key "points": number.

To get all payers and points remaining
GET: http://localhost:3306/api/points/returnPoints


### Running Jest Tests
In CLI navigate to root directory.

Run:
**npm run test**