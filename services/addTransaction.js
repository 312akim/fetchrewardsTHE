/**
 * Adds transaction to history param.
 * @param {any} transaction Object { payer: string, points: number, timestamp?: timestamp } 
 * @param {Array<any>} history Array of transaction objects
 * @returns Updated history array
 */
const addTransaction = (transaction, history) => {
    history.push(transaction);
}

module.exports.addTransaction = addTransaction;