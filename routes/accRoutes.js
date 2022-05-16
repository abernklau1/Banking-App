import express from "express";
import {
  createAccount,
  getAccounts,
  transferMoney,
  deleteAccount,
  payAccount,
} from "../controllers/accountController.js";

const router = express.Router();

router.route("/").post(createAccount).get(getAccounts);

router.route("/transfer").patch(transferMoney);
router.route("/:id").delete(deleteAccount).patch(payAccount);

export default router;
