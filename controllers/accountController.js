import User from "../schemas/User.js";
import Account from "../schemas/Account.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import mongoose from "mongoose";

const createAccount = async (req, res) => {
  const { accType, balance } = req.body;

  if (!accType || !balance) {
    throw new BadRequestError("Please provide all values");
  }

  req.body.createdBy = req.user.userId;
  const account = await Account.create(req.body);
  res.status(StatusCodes.CREATED).json({ account });
};

const deleteAccount = async (req, res) => {
  const { id: accountId } = req.params;
  const account = await Account.findOne({ _id: accountId });

  if (!accountId) {
    throw new NotFoundError(`No account with id: ${accountId}`);
  }

  // check permissions
  checkPermissions(req.user, account.createdBy);

  await account.remove();

  res.status(StatusCodes.OK).json({ msg: "Success! Account removed" });
};

const getAccounts = async (req, res) => {
  // create variables for search params
  const { search } = req.query;
  const queryObject = {
    createdBy: req.user.userId,
  };

  if (search) {
    queryObject.accType = { $regex: search, $options: "i" };
  }

  let result = Account.find(queryObject);

  // setup pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 4;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const accounts = await result;
  const totalAccounts = await Account.countDocuments(queryObject);

  const numOfPages = Math.ceil(totalAccounts / limit);

  res.status(StatusCodes.OK).json({ accounts, totalAccounts, numOfPages });
};

const payAccount = async (req, res) => {
  const { id: accountId } = req.params;
  const { payAmount } = req.body;
  if (!payAmount) {
    throw new BadRequestError("Please provide an amount");
  }

  const account = await Account.findOne({ _id: accountId });
  if (!account) {
    throw new NotFoundError(`No account with id: ${accountId}`);
  }

  // check permissions
  checkPermissions(req.user, account.createdBy);

  const newBalance = account.balance - amount;

  const updatedAccount = await Account.findOneAndUpdate(
    { _id: accountId },
    { balance: newBalance },
    { new: true, runValidators: true }
  );

  res.status(StatusCodes.OK).json({ updatedAccount });
};

const updateMainAccount = async (req, res) => {
  const { action, amount, account } = req.body;
  if (!action || !amount || !account) {
    throw new BadRequestError("Please provide all values");
  }

  if (account) {
  }
};

const transferMoney = async (req, res) => {
  // pull value from user input
  let { toAccount, amount } = req.body;
  // if no value throw new bad request error
  if (!toAccount || !amount) {
    throw new BadRequestError("Please provide all values");
  }

  let i;
  amount = parseFloat(amount);
  toAccount = [...toAccount].map((char, index) => {
    if (char === "(") {
      i = index;
      return toAccount.substring(0, index - 1);
    }
  })[i];

  // check for account associate with user
  const userId = req.user.userId;
  const { accounts } = await User.findOne({ _id: userId }).select(
    "mainAccount"
  );

  // if no account throw not found error
  if (!accounts) {
    throw new NotFoundError("Invalid Account");
  }

  let savings;
  let checking;
  // loop through accounts associated w/ user to find savings and checking accounts
  Object.entries(accounts).map(([key, account]) => {
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
  if (toAccount === "Prime Share Account") {
    if (checking.balance - amount < 0) {
      throw new BadRequestError("This amount is too great");
    }

    savings.balance = parseFloat((savings.balance + amount).toFixed(2));
    checking.balance = parseFloat((checking.balance - amount).toFixed(2));
  }

  // '''
  if (toAccount === "Basic Checking") {
    if (savings.balance - amount < 5) {
      throw new BadRequestError("This amount is too great");
    }

    savings.balance = parseFloat((savings.balance - amount).toFixed(2));
    checking.balance = parseFloat((checking.balance + amount).toFixed(2));
  }

  const accountsList = [savings, checking];
  const updatedUser = await Promise.all(
    accountsList.map(async (account) => {
      return await User.findOneAndUpdate(
        { _id: userId, "accounts.accType": account.accType },
        { $set: { "accounts.$.balance": account.balance } },
        { new: true, runValidators: true }
      );
    })
  );
  const user = updatedUser[1];

  res.status(StatusCodes.OK).json({ user });
};

export { createAccount, deleteAccount, getAccounts, payAccount, transferMoney };
