const { addTransaction } = require("../services/addTransaction");

describe("function addTransaction", () => {
  const mockDate = new Date("2022-01-01 01:00:00");
  jest.useFakeTimers().setSystemTime(new Date(mockDate).getTime());
  let history = [];
  const transaction = { payer: "DANNON", points: 3000 };
  const transaction2 = { payer: "UNILEVER", points: 5000 };
  beforeEach(() => {
    history = [];
  });

  it("pushes a new transaction to the history", () => {
    addTransaction(transaction, history);
    expect(history).toStrictEqual([
      {
        payer: "DANNON",
        points: 3000,
        timestamp: mockDate,
      },
    ]);
  });

  it("pushes 2 transactions to the history", () => {
    addTransaction(transaction, history);
    addTransaction(transaction2, history);
    expect(history).toStrictEqual([
      { payer: "DANNON", points: 3000, timestamp: mockDate },
      { payer: "UNILEVER", points: 5000, timestamp: mockDate },
    ]);
  });
});
