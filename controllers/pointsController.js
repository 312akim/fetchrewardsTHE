const transactionHistory = [];
const { addTransaction } = require('../services/addTransaction');
const { spendPoints } = require('../services/spendPoints');
const { returnPoints } = require('../services/returnPoints');

exports.addTransaction = (req, res) => {
    if (!req.body.payer || !req.body.points) {
        res.status(400).json({
            message: "Transaction object requires 'payer' and 'points' keys."
        })
        return;
    }
    
    addTransaction(req.body, transactionHistory);
    
    res.status(200).json({
        message: "Transaction successfully added.",
    })
}

exports.spendPoints = (req, res) => {
    if (req.body.spendPoints <= 0) {
        res.status(400).json({
            message: "Points being spent cannot be negative nor 0."
        })
        return;
    }

    const result = spendPoints(req.body, transactionHistory);

    res.status(200).json(result)
}

exports.returnPoints = (req, res) => {
    const result = returnPoints(transactionHistory);

    res.status(200).json(result)
}