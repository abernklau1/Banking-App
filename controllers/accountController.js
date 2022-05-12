import Account from "../schemas/Account.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";

const createAccount = async (req, res) => {
  // search for account numbers
  const accNumbers = await Account.find().select("accNumber");

  // generate account numbers between 200k & 300k
  let accNumber = Math.floor(Math.random() * 100000) + 200000;

  // generate unique account numbers
  for (let i = 0; i < accNumbers.length; i++) {
    if (accNumber === accNumbers[i]) {
      accNumber = Math.floor(Math.random() * 100000) + 200000;
      i = -1;
      continue;
    }
  }

  // generate random balances with consideration to max of 1 million
  const savings = parseFloat(
    (Math.floor(Math.random() * 1000001 * 100) / 100).toFixed(2)
  );
  const checking = parseFloat(
    (Math.floor(Math.random() * (1000001 - savings) * 100) / 100).toFixed(2)
  );
  const totalBalance = parseFloat((savings + checking).toFixed(2));

  const account = await Account.create({
    accNumber,
    savings,
    checking,
    totalBalance,
    createdBy: req.user.userId,
  });

  res.status(StatusCodes.CREATED).json({ account });
};

const getBalances = async (req, res) => {
  // find account created by said user
  const userId = req.user.userId;
  const account = await Account.findOne({ createdBy: userId });

  // throw not found error if that is the case
  if (!account) {
    throw new NotFoundError(`No account associated with user: ${userId}`);
  }

  res.status(StatusCodes.OK).json({ account });
};

const transferMoney = async (req, res) => {
  // pull value from user input
  let { toAccount, amount } = req.body;
  amount = parseFloat(amount);
  // if no value throw new bad request error
  if (!toAccount || !amount) {
    console.log(toAccount, amount);
    throw new BadRequestError("Please provide all values");
  }

  // check for account associate with user
  const userId = req.user.userId;
  const account = await Account.findOne({ createdBy: userId });

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
    newSavings = parseFloat((savings + amount).toFixed(2));
    newChecking = parseFloat((checking - amount).toFixed(2));

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
    newSavings = parseFloat((savings - amount).toFixed(2));
    newChecking = parseFloat((checking + amount).toFixed(2));

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

  const newTotal = parseFloat((newSavings + newChecking).toFixed(2));

  const updateAccount = await Account.findOneAndUpdate(
    { createdBy: userId },
    { savings: newSavings, checking: newChecking, totalBalance: newTotal },
    { new: true, runValidators: true }
  );
  res.status(StatusCodes.OK).json({ updateAccount });
};

export { createAccount, getBalances, transferMoney };
