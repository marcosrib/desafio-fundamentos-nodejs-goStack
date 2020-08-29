import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransaction {
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
    return this.transactions;
  }

  public getBalance(): Balance {
    const incomeSum = this.transactions
      .filter(transaction => transaction.type === 'income')
      .reduce((sum, cur) => sum + cur.value, 0);
    const outcomeSum = this.transactions
      .filter(transaction => transaction.type === 'outcome')
      .reduce((sum, cur) => sum + cur.value, 0);

    const total = incomeSum - outcomeSum;

    const balance = {
      income: incomeSum,
      outcome: outcomeSum,
      total,
    };
    return balance;
  }

  public create({ title, value, type }: CreateTransaction): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
