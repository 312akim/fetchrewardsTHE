/**
 * Spend points from oldest timestamp to newest by adding spend transactions to history
 * @param {any} pointsToSpend Object { "points": number } specifies # points being spend
 * @param {Array<any>} transactionHistory Array of transaction objects
 */
const spendPoints = (pointsToSpend, transactionHistory) => {
    let pointBalance = pointsToSpend.points;
    const spentBalance = {};
    const negativeBalance = {};

    // Sort History
    const sortedHistory = transactionHistory.sort(function(x, y) {
        return new Date(x.timestamp) - new Date(y.timestamp);
    })

    // Record negative transactions in a ledger (initial loop)
    recordNegativeBalance(transactionHistory, negativeBalance);

    // Loop transactions
    for (const transaction of sortedHistory) {
        const payer = transaction.payer;

        // Check if Points Used and No negative balance in ledger (complete case)
        if (Object.values(negativeBalance).every((v) => v === 0) && pointBalance === 0) {
            // Record into transactions
            // Return array of payers and points spent
            console.log("Complete case hit");
            return;
        }

        // Skip Negative Transactions
        if (transaction.points < 0) {
            continue;
        }

        // Negative Balance Exists
        if (negativeBalance[payer] < 0) {
            pointBalance = handleNegativeBalance(transaction, negativeBalance, pointBalance);
            continue;
        }        
                
        // No Negative Balance Exists
            // pointBalance >= Transaction balance
                // Reduce pointBalance by Transaction balance
                // Record spending of balance

            // pointBalance < Transaction balance
                // Reduce pointBalance by pointBalance
                // Record spending of balance
    }            
}

/**
 * Loops through transaction history and records negative balances.
 * @param {Array<any>} transactionHistory Array of transaction objects
 * @param {any} negativeBalance Object that keeps track of payers to negative point balances
 */
const recordNegativeBalance = (transactionHistory, negativeBalance) => {
    for (const transaction of transactionHistory) {
        if (transaction.points < 0) {
            negativeBalance[transaction.payer] = (negativeBalance[transaction.payer] || 0) + transaction.points;
        }
    }
}

/**
 * Handles negative transactions if they exist for payer
 * @param {any} transaction Object { "payer": string, "points": number }
 * @param {*} negativeBalance Object that keeps track of payers to negative point balances
 * @param {*} pointBalance Points left to be redeemed
 * @returns Post function point balance
 */
const handleNegativeBalance = (transaction, negativeBalance, pointBalance) => {
    const payer = transaction.payer;
    
    if (transaction.points + negativeBalance[payer] <= 0) {
        negativeBalance[payer] = (negativeBalance[payer] || 0) + transaction.points;
        return pointBalance;
    }

    const remaining = transaction.points + (negativeBalance[payer] || 0);
    negativeBalance[payer] = 0;
    pointBalance = pointBalance - remaining;
    return pointBalance;
}

module.exports.spendPoints = spendPoints;
module.exports.recordNegativeBalance = recordNegativeBalance;
module.exports.handleNegativeBalance = handleNegativeBalance;