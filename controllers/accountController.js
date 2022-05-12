import User from "../schemas/User.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import checkPermissions from "../utils/checkPermissions.js";

const createAccount = async (req, res) => {
  const { accType, balance } = req.body;

  const userId = req.user.userId;

  const user = await User.findOne({ _id: userId });
  user.accounts.push({ accType: accType, balance: balance });

  await user.save();

  res
    .status(StatusCodes.CREATED)
    .json({ accountCreated: user.accounts.at(-1) });
};

const getAccounts = async (req, res) => {
  // find account created by said user
  const userId = req.user.userId;
  const accounts = await User.findOne({ userId }).select("accounts");

  // throw not found error if that is the case
  if (!accounts) {
    throw new NotFoundError(`No account associated with user: ${userId}`);
  }

  res.status(StatusCodes.OK).json({ accounts });
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
  const accounts = await User.findOne({ _id: userId }).select("accounts");

  // if no account throw not found error
  if (!accounts) {
    throw new NotFoundError("Invalid Account");
  }

  let savings;
  let checking;

  // loop through accounts associated w/ user to find savings and checking accounts
  accounts.map((account) => {
    if (account.accType === "Prime Share Account") {
      savings = account;
    }
    if (account.accType === "Basic Checking") {
      checking = account;
    }
    if (savings && checking) {
      return;
    }
  });

  // check which account user requested transfer to
  if (toAccount === "Savings") {
    savings.balance = parseFloat((savings.balance + amount).toFixed(2));
    checking.balance = parseFloat((checking.balance - amount).toFixed(2));
  }

  // '''
  if (toAccount === "Checking") {
    savings.balance = parseFloat((savings - amount).toFixed(2));
    checking.balance = parseFloat((checking + amount).toFixed(2));
  }
  const accountsList = [savings, checking];
  const updateAccounts = accountsList.forEach((account) => {
    User.findOneAndUpdate(
      { _id: userId, "accounts._id": account._id },
      { $set: { balance: account.balance } },
      { new: true, runValidators: true }
    );
  });
  //await User.findOneAndUpdate(
  //   { _id: userId, "accounts._id": [] },
  //   { savings: newSavings, checking: newChecking, totalBalance: newTotal },
  //   { new: true, runValidators: true }
  // );
  res.status(StatusCodes.OK).json({ updateAccounts });
};

export { createAccount, getAccounts, transferMoney };
