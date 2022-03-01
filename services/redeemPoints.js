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
        // Points Used and No negative balance in ledger (complete case)
            // Record into transactions
            // Return array of payers and points spent

        // Skip Negative Transactions


        // Negative Balance Exists
            // Transaction balance <= Negative balance
                // Reduce Negative balance by transaction balance

            // Transaction balance > Negative balance
                // Reduce Negative balance to 0
                // Calculate remaining points
                // Reduce pointBalance by remaining
                
        // No Negative Balance Exists
            // pointBalance >= Transaction balance
                // Reduce pointBalance by Transaction balance
                // Record spending of balance

            // pointBalance < Transaction balance
                // Reduce pointBalance by pointBalance
                // Record spending of balance
}

/**
 * Loops through transaction history and records negative balances.
 * @param {Array<any>} transactionHistory Array of transaction objects
 * @param {any} negativeBalance Object that keeps track of payers to negative points
 */
const recordNegativeBalance = (transactionHistory, negativeBalance) => {
    for (const transaction of transactionHistory) {
        if (transaction.points < 0) {
            negativeBalance[transaction.payer] = (negativeBalance[transaction.payer] || 0) + transaction.points;
        }
    }
}

module.exports.spendPoints = spendPoints;
module.exports.recordNegativeBalance = recordNegativeBalance;