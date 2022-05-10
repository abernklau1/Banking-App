import express from "express";
import {
  createAccount,
  getBalances,
  transferMoney,
} from "../controllers/accountController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.route("/").post(createAccount).get(getBalances);
router.route("/transfer").patch(transferMoney);

export default router;
