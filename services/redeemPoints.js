/**
 * Spend points from oldest timestamp to newest by adding spend transactions to history
 * @param {any} pointsToSpend Object { "points": number } specifies # points being spend
 * @param {Array<any>} transactionHistory Array of transaction objects
 */
const spendPoints = (pointsToSpend, transactionHistory) => {
    if (pointsToSpend.points < 0) {
        throw new Error("Points to spend cannot be negative.")
    }
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
            let result = [];
            result = convertSpentBalance(spentBalance);
            // RECORD TRANSACTIONS
            return result;
        }

        // Skip Negative Transactions
        if (transaction.points < 0) {
            continue;
        }

        // Negative Balance Exists
        if (negativeBalance[payer] < 0) {
            pointBalance = handleNegativeBalance(transaction, pointBalance, negativeBalance, spentBalance);
            continue;
        }        
                
        // No Negative Balance Exists
        pointBalance = calculatePointsUsed(transaction, pointBalance, spentBalance);
    }
    throw new Error("Never hit final!")            
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
 * Handles negative transactions if they exist for payer and updates pointBalance record if points used.
 * @param {any} transaction Object { "payer": string, "points": number }
 * @param {any} negativeBalance Object that keeps track of payers to negative point balances
 * @param {number} pointBalance Points left to be redeemed
 * @returns Post function point balance
 */
const handleNegativeBalance = (transaction, pointBalance, negativeBalance, spentBalance) => {
    const payer = transaction.payer;
    
    if (transaction.points + negativeBalance[payer] <= 0) {
        negativeBalance[payer] = (negativeBalance[payer] || 0) + transaction.points;
        return pointBalance;
    }

    const remaining = transaction.points + (negativeBalance[payer] || 0);
    negativeBalance[payer] = 0;
    recordPointSpend(payer, remaining, spentBalance);
    pointBalance = pointBalance - remaining;
    return pointBalance;
}

/**
 * Calculates points used amd updates point balance record if points used.
 * @param {any} transaction Object { "payer": string, "points": number }
 * @param {*} pointBalance Points left to be redeemed
 * @param {*} spentBalance Spent points balance record
 * @returns Post function calculation point balance 
 */
const calculatePointsUsed = (transaction, pointBalance, spentBalance) => {
    if (pointBalance >= transaction.points) {
        recordPointSpend(transaction.payer, transaction.points, spentBalance);
        pointBalance = pointBalance - transaction.points;
        return pointBalance;
    }

    recordPointSpend(transaction.payer, pointBalance, spentBalance);
    return pointBalance = 0;
}

/**
 * Records the number of points used for the payer in the spentBalance
 * @param {string} payer Payer name
 * @param {number} pointsSpent # of points spent
 * @param {any} spentBalance Spent points balance record
 */
const recordPointSpend = (payer, pointsSpent, spentBalance) => {
    if (pointsSpent === 0) {
        return;
    }
    spentBalance[payer] = (spentBalance[payer] || 0) - pointsSpent;
}

/**
 * Converts spentBalance object to an array of objects with keys "payers" and "points"
 * @param {any} spentBalance Object { "payer": string, "points": number }
 * @returns Formatted Array of Objects with keys "payer" and "points"
 */
const convertSpentBalance = (spentBalance) => {
    const result = [];
    for (const [key, value] of Object.entries(spentBalance)) {
        if (value === 0) {
            continue;
        }

        const entry = {
            "payer": key,
            "points": value,
        }

        result.push(entry);
    }

    return result;
}

module.exports.spendPoints = spendPoints;
module.exports.recordNegativeBalance = recordNegativeBalance;
module.exports.handleNegativeBalance = handleNegativeBalance;
module.exports.recordPointSpend = recordPointSpend;
module.exports.calculatePointsUsed = calculatePointsUsed;
module.exports.convertSpentBalance = convertSpentBalance;