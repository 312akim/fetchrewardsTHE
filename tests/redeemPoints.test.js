const { spendPoints, recordNegativeBalance, handleNegativeBalance, recordPointSpend, calculatePointsUsed, convertSpentBalance } = require('../services/redeemPoints');
const { addTransaction} = require('../services/addTransaction');


describe('function redeem points', () => {
    const transactionHistory = [
        { "payer": "DANNON", "points": 1000, "timestamp": "2020-11-02T14:00:00Z" },
        { "payer": "UNILEVER", "points": 200, "timestamp": "2020-10-31T11:00:00Z" },
        { "payer": "DANNON", "points": -200, "timestamp": "2020-10-31T15:00:00Z" },
        { "payer": "MILLER COORS", "points": 10000, "timestamp": "2020-11-01T14:00:00Z" },
        { "payer": "DANNON", "points": 300, "timestamp": "2020-10-31T10:00:00Z" },
    ]

    const pointsToSpend = { "points": 5000 }

    it('redeems points from the oldest timestamp', () => {
        const result = spendPoints(pointsToSpend, transactionHistory)
        expect(result).toEqual([
            { "payer": "DANNON", "points": -100 }, 
            { "payer": "UNILEVER", "points": -200 }, 
            { "payer": "MILLER COORS", "points": -4700 }
        ])
    })
})

describe('function convertSpentBalance', () => {
    let spentBalance;

    it('converts spentBalance to array of spend objects', () => {
        spentBalance = {
            "DANNON": -200,
            "UNILEVER": -400,
            "MILLER COORS": -2000,
        };
        const result = convertSpentBalance(spentBalance)
        expect(result).toEqual([
            { "payer": "DANNON", "points": -200 }, 
            { "payer": "UNILEVER", "points": -400 }, 
            { "payer": "MILLER COORS", "points": -2000 }
        ])
    })

    it('does not convert if spentBalance points is equal to 0', () => {
        spentBalance = {
            "DANNON": -200,
            "UNILEVER": 0,
            "MILLER COORS": 0,
        };
        const result = convertSpentBalance(spentBalance)
        expect(result).toEqual([
           { "payer": "DANNON", "points": -200}
        ])
    })
})

describe ('function recordNegativeBalance', () => {
    let history = [
        { "payer": "DANNON", "points": 1000, "timestamp": "2020-11-02T14:00:00Z" },
        { "payer": "UNILEVER", "points": 200, "timestamp": "2020-10-31T11:00:00Z" },
        { "payer": "DANNON", "points": -200, "timestamp": "2020-10-31T15:00:00Z" },
        { "payer": "DANNON", "points": -100, "timestamp": "2020-10-31T15:00:00Z" },
        { "payer": "UNILEVER", "points": -500, "timestamp": "2020-10-31T15:00:00Z" },
        { "payer": "MILLER COORS", "points": 10000, "timestamp": "2020-11-01T14:00:00Z" },
        { "payer": "DANNON", "points": 300, "timestamp": "2020-10-31T10:00:00Z" },
    ];

    const negativeBalance = {};

    it('Records negative transactions into the negativeBalance object', () => {
        recordNegativeBalance(history, negativeBalance);
        expect(negativeBalance).toEqual({
            "DANNON": -300,
            "UNILEVER": -500
        })
    })
})

describe('function handleNegativeBalance', () => {
    let negativeBalance;
    let pointBalance;
    let spentBalance;

    beforeEach(() => {
        negativeBalance = {
            "DANNON": -400
        };
        pointBalance = 1000;
        spentBalance = {};
    })

    it('updates when points are greater than the neg balance', () => {
        transaction = {"payer": "DANNON", "points": 500}
        pointBalance = handleNegativeBalance(transaction, pointBalance, negativeBalance, spentBalance);
        expect(negativeBalance).toEqual({
            "DANNON": 0
        })
        expect(pointBalance).toBe(900);
        expect(spentBalance).toEqual({
            "DANNON": -100
        });
    })

    it('updates when points are equal to the neg balance', () => {
        transaction = {"payer": "DANNON", "points": 400};
        handleNegativeBalance(transaction, pointBalance, negativeBalance, spentBalance);
        expect(negativeBalance).toEqual({
            "DANNON": 0
        })
        expect(pointBalance).toBe(1000);
        expect(spentBalance).toEqual({});
    })

    it('updates when points are lesser than neg balance', () => {
        transaction = {"payer": "DANNON", "points": 300};
        handleNegativeBalance(transaction, pointBalance, negativeBalance, spentBalance);
        expect(negativeBalance).toEqual({
            "DANNON": -100
        })
        expect(pointBalance).toBe(1000);
        expect(spentBalance).toEqual({});
    })
})

describe('function recordPointSpend', () => {
    let spentBalance;

    beforeEach(() => {
        spentBalance = {}
    })

    it('records points spent to the balance record', () => {
        recordPointSpend("DANNON", 300, spentBalance);
        recordPointSpend("UNILEVER", 400, spentBalance);
        expect(spentBalance).toEqual({
            "DANNON": -300,
            "UNILEVER": -400
        })
    })

    it('updates points spent with the same payer on the balance record', () =>{
        recordPointSpend("DANNON", 300, spentBalance);
        recordPointSpend("DANNON", 400, spentBalance);
        expect(spentBalance).toEqual({
            "DANNON": -700
        })
    })
})

describe('function calculatePointsUsed', () => {
    let pointBalance;
    let spentBalance;

    beforeEach(() => {
        pointBalance = 5000;
        spentBalance = {};
    })

    it('takes a transaction, redeems points, and records it', () => {
        transaction = { "payer": "DANNON", "points": 200 };
        pointBalance = calculatePointsUsed(transaction, pointBalance, spentBalance);
        expect(pointBalance).toBe(4800);
        expect(spentBalance).toEqual({
            "DANNON": -200
        })
    })

    it('takes 3 transactions (2 of same payer), redeems points, and records it', () => {
        transaction = { "payer": "DANNON", "points": 200 };
        let transaction2 = { "payer": "UNILEVER", "points": 400 };
        let transaction3 = { "payer": "DANNON", "points": 300 };
        pointBalance = calculatePointsUsed(transaction, pointBalance, spentBalance);
        pointBalance = calculatePointsUsed(transaction2, pointBalance, spentBalance);
        pointBalance = calculatePointsUsed(transaction3, pointBalance, spentBalance);
        expect(pointBalance).toBe(4100);
        expect(spentBalance).toEqual({
            "DANNON": -500,
            "UNILEVER": -400
        })
    })

    it('takes a transaction with points higher than the pointBalance', () => {
        transaction = { "payer": "DANNON", "points": 400 };
        pointBalance = 300;
        pointBalance = calculatePointsUsed(transaction, pointBalance, spentBalance);
        expect(spentBalance).toEqual({
            "DANNON": -300
        })
    })

    it('Does not change pointBalance nor spentBalance if pointBalance is empty', () => {
        transaction = { "payer": "DANNON", "points": 300};
        spentBalance = {"DANNON": -300}
        pointBalance = 0;
        pointBalance = calculatePointsUsed(transaction, pointBalance, spentBalance);
        expect(pointBalance).toBe(0);
        expect(spentBalance).toEqual({
            "DANNON": -300
        })
    })
})