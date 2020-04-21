import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}
interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    // const transaction = this.transactions.reduce(t => t.type === 'outcome');
    return this.transactions;
  }

  public getBalance(): Balance {
    /**
     * (amount, { type, value })
     * @type and @value are being desctructured
     *
     */
    return this.transactions.reduce(
      (amount, { type, value }) => ({
        ...amount,
        [type]: amount[type] + Number(value),
      }),
      { income: 0, outcome: 0, total: 0 },
    );
  }

  public create({ title, value, type }: TransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
