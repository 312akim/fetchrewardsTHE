const { addTransaction } = require('../services/addTransaction');

describe('function addTransaction', () => {
    let history = [];
    const transaction = { "payer": "DANNON", "points": 3000 };
    const transaction2 = { "payer": "UNILEVER", "points": 5000 };
    
    beforeEach(() => {
        history = [];
    })

    it('pushes a new transaction to the history', () =>{
        addTransaction(transaction, history);

        expect(history).toStrictEqual([{
            "payer": "DANNON", 
            "points": 3000 
        }])
    })

    it('pushes 2 transactions to the history', () => {
        addTransaction(transaction, history);
        addTransaction(transaction2, history);

        expect(history).toStrictEqual([
            { "payer": "DANNON", "points": 3000 },
            { "payer": "UNILEVER", "points": 5000 },
        ]);
    })
})