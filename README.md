
# Fetch Rewards Take Home Exam
This web server mocks a points earned, spent, and remaining system.

## Downloading and Installing dependencies for the server
[NPM](https://www.npmjs.com/) is required to run this server.

Navigate CLI to desired download location and run

**git clone https://github.com/312akim/fetchrewardsTHE.git**

In CLI navigate to the root of the directory (inside of the directory just cloned)

To download dependencies
Run:

**npm install**

## Starting the Server
In CLI navigate to root directory.

Run:

**npm start**

Server should now be running on localhost port 3306.

Confirm by navigating to http://localhost:3306/ on a browser.
"Server is active" should be visible on the web page.

## Interacting with the Server
[POSTMAN](https://www.postman.com/) is a great tool for interacting with endpoints and my recommended tool for interacting with this server.

#### Endpoints:

#### 1. Add Points to Payer

Send a POST request to the address url below with a format matching the OBJECT listed below.

    POST: 
    http://localhost:3306/api/points/addTransaction

    OBJECT: 
    { "payer" : "DANNON", "points": 5000 }

#### 2. Redeem Points from Payer

Send a POST request to the address url below with a format matching the OBJECT listed below.

    POST: 
    http://localhost:3306/api/points/spendPoints
    
    OBJECT:
    { "points": 500 }

#### 3. Return Payers and Balances

Send a GET request to the address url below

    GET:
    http://localhost:3306/api/points/returnPoints

#### 4. Reset Transaction History

Send a POST request to the address url below with a format matching the OBJECT listed below.

    POST: 
    http://localhost:3306/api/points/resetTransactions
    
    OBJECT:
    { "reset" : true }


## Running Jest Tests
In CLI navigate to root directory.

Run:
**npm run test**
