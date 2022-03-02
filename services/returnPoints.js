/**
 * Takes transaction history and calculates how many points are unredeemed.
 * @param {Array[any]} transactionHistory Array of transactions history
 * @returns Object { payer: points } Returns all payers and total of points unredeemed
 */
const returnPoints = (transactionHistory) => {
    const pointBalance = {};
    transactionHistory.map((transaction) => {
        const prevPoints = pointBalance[transaction.payer] || 0;
        pointBalance[transaction.payer] = transaction.points + prevPoints;
    })

    return pointBalance;
}

module.exports.returnPoints = returnPoints;