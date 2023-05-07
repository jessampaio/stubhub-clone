import { Router } from "express";
import {
  createSeat,
  getSeats,
  getSeat,
  getSectionAndSeats,
  deleteSeat,
} from "../controllers/seats";

const router = Router();

router.get("/seats", getSeats);
router.post("/seats", createSeat);
router.get("/seats/seat/:id", getSeat);
router.get("/seats/sectionseats/:id", getSectionAndSeats);
router.delete("/seats/seat/:id", deleteSeat);

export default router;
