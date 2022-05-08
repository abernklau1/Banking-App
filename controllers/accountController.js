import Account from "../schemas/Account.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";

const createAccount = async (req, res) => {
  const accNumbers = await Account.find();
  let accountNumber = Math.floor(Math.random * 100000) + 200000;
  for (let i = 0; i < accNumbers.length; i++) {
    if (accountNumber === accNumbers[i]) {
      accountNumber = Math.floor(Math.random * 100000) + 200000;
      i = -1;
      continue;
    }
  }
  const savings = Math.floor(Math.random() * 1000001);
  const checking = Math.floor(Math.random * (1000001 - savings));
  const balance = savings + checking;

  const account = await Account.create({
    accNumber: accountNumber,
    balance: balance,
    savings: savings,
    checking: checking,
    createBy: req.user.userId,
  });

  res.status(StatusCodes.CREATED).json({ account });
};

const getBalances = async (req, res) => {
  const userId = req.user.userId;
  const account = await Account.findOne({ userId });

  if (!account) {
    throw new NotFoundError(`No account associated with user: ${userId}`);
  }

  balances = {
    balance: account.balance,
    savings: account.savings,
    checking: account.checking,
  };
  res.status(StatusCodes.OK).json({ balances });
};

const transferMoney = async (req, res) => {
  const { toAccount, amount } = req.body;
  const userId = req.user.userId;
  const account = await Account.findOne({ userId });

  if (!toAccount) {
    throw new BadRequestError("Please provide the transfer account");
  }

  if (!account) {
    throw new NotFoundError("Invalid Account");
  }

  if (toAccount === "Savings") {
    savings = account.savings;
    checking = account.checking;
    const newSavings = savings + amount;
    const newChecking = checking - amount;
    if (newSavings > 1000000) {
      throw new BadRequestError(
        "Adding this amount would exceed the max amount"
      );
    }
    if (newChecking < 0) {
      throw new BadRequestError(
        "Transferring this amount would set account negative"
      );
    }
  }

  if (toAccount === "Checking") {
    savings = account.savings;
    checking = account.checking;
    const newSavings = savings - amount;
    const newChecking = checking + amount;
    if (newChecking > 1000000) {
      throw new BadRequestError(
        "Adding this amount would exceed the max amount"
      );
    }
    if (newSavings < 5) {
      throw new BadRequestError(
        "Transferring this amount would set account negative"
      );
    }
  }

  const updateAccount = await Account.findOneAndUpdate(
    { userId },
    { savings: newSavings, checking: newChecking },
    { new: true, runValidators: true }
  );
  res.status(StatusCodes.OK).json({ updateAccount });
};

export { createAccount, getBalances, transferMoney };
