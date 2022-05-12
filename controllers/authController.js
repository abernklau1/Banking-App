import User from "../schemas/User.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnAuthenticatedError } from "../errors/index.js";

const register = async (req, res) => {
  const { name, lastName, email, password } = req.body;
  // check for missing fields
  if (!name || !email || !password) {
    throw new BadRequestError("Please provide starred values");
  }

  // check if email is already in use
  const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists) {
    throw new BadRequestError("Email already in use");
  }

  // search for account numbers
  const accNumbers = await User.find().select("accNumber");

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

  //send request to create new user if errors have been avoided
  const user = await User.create({
    name,
    lastName,
    email,
    password,
    accNumber,
    accounts: [
      { accType: "Prime Share Account", balance: savings },
      { accType: "Basic Checking", balance: checking },
    ],
  });

  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({
    user: {
      email: user.email,
      lastName: user.lastName,
      location: user.location,
      name: user.name,
      accNumber: user.accNumber,
    },
    token,
    location: user.location,
    accounts: {
      savings: user.accounts[0],
      checking: user.accounts[1],
    },
  });
};

const login = async (req, res) => {
  // check for an input email and password
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide all values");
  }
  // check for user with input email
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new UnAuthenticatedError("User Not Found");
  }

  // check for correct password
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnAuthenticatedError("Invalid Credentials");
  }

  const token = user.createJWT();
  user.password = undefined;
  res.status(StatusCodes.OK).json({ user, token, location: user.location });
  res.send("login user");
};

export { register, login };
