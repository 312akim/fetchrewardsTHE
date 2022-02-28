const transactionHistory = [];
const { addTransaction } = require('../services/addTransaction');

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
        data: transactionHistory
    })
}

exports.spendPoints = (req, res) => {
    // DB Logic

    res.status(200).json({
        message: "Spend points controller hit."
    })
}

exports.returnPoints = (req, res) => {
    // DB Logic

    res.status(200).json({
        message: "Return points controller hit."
    })
}