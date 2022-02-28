exports.addTransaction = (req, res) => {
    // DB Logic

    res.status(200).json({
        message: "Add transaction controller hit."
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