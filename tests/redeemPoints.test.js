const { redeemPoints, recordNegativeBalance, handleNegativeBalance, recordPointSpend } = require('../services/redeemPoints');

describe('function redeem points', () => {
    it.todo('redeems points from the oldest timestamp')
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
    let transaction = {"payer": "DANNON", "points": 400}
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
    let spendBalance;

    beforeEach(() => {
        spendBalance = {}
    })

    it('records points spent to the balance record', () => {
        recordPointSpend("DANNON", 300, spendBalance);
        recordPointSpend("UNILEVER", 400, spendBalance);
        expect(spendBalance).toEqual({
            "DANNON": -300,
            "UNILEVER": -400
        })
    })

    it('updates points spent with the same payer on the balance record', () =>{
        recordPointSpend("DANNON", 300, spendBalance);
        recordPointSpend("DANNON", 400, spendBalance);
        expect(spendBalance).toEqual({
            "DANNON": -700
        })
    })
})