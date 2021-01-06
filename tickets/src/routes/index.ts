import express, { Request, Response } from "express";
import { requireAuth, validateRequest } from "@ldctickets/common";
import { body } from "express-validator";
import { Ticket } from "../models/Ticket";

const router = express.Router();

router.get("/api/tickets", async (req: Request, res: Response) => {
  const tickets = await Ticket.find({ orderId: undefined });
  return res.send(tickets);
});

export { router as indexTicketRouter };
