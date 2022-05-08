import Account from "../schemas/Account.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";

const createAccount = async (req, res) => {
  // generate random balances with consideration to max of 1 million
  const savings = Math.floor(Math.random() * 1000001);
  const checking = Math.floor(Math.random() * (1000001 - savings));
  const totalBalance = savings + checking;

  const account = await Account.create({
    totalBalance: totalBalance,
    savings: savings,
    checking: checking,
    createdBy: req.user.userId,
  });

  res.status(StatusCodes.CREATED).json({ account });
};

const getBalances = async (req, res) => {
  // find account created by said user
  const userId = req.user.userId;
  const account = await Account.findOne({ userId });

  // throw not found error if that is the case
  if (!account) {
    throw new NotFoundError(`No account associated with user: ${userId}`);
  }

  const balances = {
    totalBalance: account.totalBalance,
    savings: account.savings,
    checking: account.checking,
  };
  res.status(StatusCodes.OK).json({ balances });
};

const transferMoney = async (req, res) => {
  // pull value from user input
  const { toAccount, amount } = req.body;

  // if no value throw new bad request error
  if (!toAccount) {
    throw new BadRequestError("Please provide the transfer account");
  }

  // check for account associate with user
  const userId = req.user.userId;
  const account = await Account.findOne({ userId });

  // if no account throw not found error
  if (!account) {
    throw new NotFoundError("Invalid Account");
  }

  const savings = account.savings;
  const checking = account.checking;
  let newSavings;
  let newChecking;

  // check which account user requested transfer to
  if (toAccount === "Savings") {
    newSavings = savings + amount;
    newChecking = checking - amount;

    // check if requested transfer amount will exceed max bank account amount
    if (newSavings > 1000000) {
      throw new BadRequestError(
        "Adding this amount would exceed the max amount"
      );
    }

    // check if requested transfer amount will cause account to go negative
    if (newChecking < 0) {
      throw new BadRequestError(
        "Transferring this amount would set account negative"
      );
    }
  }

  // '''
  if (toAccount === "Checking") {
    newSavings = savings - amount;
    newChecking = checking + amount;

    // '''
    if (newChecking > 1000000) {
      throw new BadRequestError(
        "Adding this amount would exceed the max amount"
      );
    }

    // '''
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
