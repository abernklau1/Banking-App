import express from "express";
import {
  getBalances,
  transferMoney,
} from "../controllers/accountController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.route("/").get(getBalances);
router.route("/transfer").patch(auth, transferMoney);

export default router;
