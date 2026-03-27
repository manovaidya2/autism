import express from "express";
import {
  autismCreateContact,
  autismGetContacts,
  autismDeleteContact,
} from "../controllers/autismContactController.js";

const router = express.Router();

router.post("/create", autismCreateContact);
router.get("/all", autismGetContacts);
router.delete("/:id", autismDeleteContact);

export default router;