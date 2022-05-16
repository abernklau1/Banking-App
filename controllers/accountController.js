import User from "../schemas/User.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import mongoose from "mongoose";

const createAccount = async (req, res) => {
  const { accType, balance } = req.body;

  const userId = req.user.userId;

  const user = await User.findOne({ _id: userId });
  user.accounts.push({ accType: accType, balance: balance });

  await user.save();

  res.status(StatusCodes.CREATED).json({ user });
};

const getAccounts = async (req, res) => {
  // create variables for search params
  let { search } = req.query;
  const queryList = [{ _id: mongoose.Types.ObjectId(req.user.userId) }];
  let accounts;

  if (search) {
    search = search.toLowerCase();
    if (
      "prime share account".startsWith(search) ||
      "basic checking".startsWith(search) ||
      "credit card/heloc".startsWith(search) ||
      "car loan".startsWith(search) ||
      "home loan".startsWith(search)
    ) {
      queryList.push({ "accounts.accType": { $regex: search, $options: "i" } });
    } else {
      res
        .status(StatusCodes.OK)
        .json({ accounts: [], totalAccounts: 0, numOfPages: 1 });
    }
  }

  let result = User.aggregate([
    { $unwind: "$accounts" },
    {
      $match: {
        $and: queryList,
      },
    },
    {
      $group: {
        _id: "$_id",
        accounts: { $push: "$accounts" },
      },
    },
  ]);

  // setup pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 5;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  accounts = await result;
  const totalAccounts = accounts ? accounts[0].accounts.length : 0;
  accounts = accounts[0].accounts;
  const numOfPages = Math.ceil(totalAccounts / limit);

  res.status(StatusCodes.OK).json({ accounts, totalAccounts, numOfPages });
};

const transferMoney = async (req, res) => {
  // pull value from user input
  let { toAccount, amount } = req.body;
  let i;
  amount = parseFloat(amount);
  toAccount = [...toAccount].map((char, index) => {
    if (char === "(") {
      i = index;
      return toAccount.substring(0, index - 1);
    }
  })[i];
  // if no value throw new bad request error
  if (!toAccount || !amount) {
    throw new BadRequestError("Please provide all values");
  }

  // check for account associate with user
  const userId = req.user.userId;
  const { accounts } = await User.findOne({ _id: userId }).select("accounts");

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

export { createAccount, getAccounts, transferMoney };
