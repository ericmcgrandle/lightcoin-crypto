class Account {
  constructor(username) {
    this.username = username;
    this.transaction = [];
  }

  get balance() {
    let balance = 0;
    for (let elem of this.transaction){
      balance += elem.value;
    }
    return balance;
  }

  addTransaction(transaction) {
    this.transaction.push(transaction);
  }
}

class Transaction {
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }
  commit() {
    if (!this.isAllowed()){
      console.log('Withdrawal Failed');
      return false;
    }

    this.time = new Date();
    this.account.addTransaction(this);
    return true;

  }
}

class Withdrawal extends Transaction {
  isAllowed(value) {
    return (this.account.balance - this.amount >= 0);
  }

  get value() {
    return -this.amount;
  }
}

class Deposit extends Transaction {
  isAllowed(value) {
    return true;
  }
  get value() {
    return this.amount;
  }
}




// DRIVER CODE

const myAccount = new Account("snow-patrol");

console.log('Starting Balance:', myAccount.balance);

const t1 = new Deposit(120.00, myAccount);
t1.commit();

const t2 = new Withdrawal(20.00, myAccount);
t2.commit();

const t3 = new Deposit(100.00, myAccount);
t3.commit();

const t4 = new Withdrawal(210.00, myAccount);
t4.commit();

const t5 = new Deposit(100.00, myAccount);
t5.commit();

const t6 = new Withdrawal(150.00, myAccount);
t6.commit();

console.log('Ending Balance:', myAccount.balance);
