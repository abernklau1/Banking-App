import express from "express";
import {
  createAccount,
  getAccounts,
  transferMoney,
} from "../controllers/accountController.js";

const router = express.Router();

router.route("/").patch(createAccount).get(getAccounts);

router.route("/transfer").patch(transferMoney);

export default router;
