/**
 * Spend points from oldest timestamp to newest by adding spend transactions to history
 * @param {any} pointsToSpend Object { "points": number } specifies # points being spend
 * @param {Array<any>} history Array of transaction objects
 */
const spendPoints = (pointsToSpend, history) => {
    let pointBalance = pointsToSpend.points;
    const spentBalance = {};

    // Sort History


    // Record negative transactions in a ledger (initial loop)


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