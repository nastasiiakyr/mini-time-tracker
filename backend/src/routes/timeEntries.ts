import { Router } from "express";
import prisma from "../prisma";

const router = Router();

// POST /time-entries
router.post("/", async (req, res) => {
  try {
    const { date, project, hours, description } = req.body;

    // Basic validation
    if (!date || !project || !hours || !description) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const hoursNumber = Number(hours);
    if (isNaN(hoursNumber) || hoursNumber <= 0) {
      return res.status(400).json({ error: "Hours must be a positive number" });
    }

    // Check if adding these hours exceeds 24 per day
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const totalHoursToday = await prisma.timeEntry.aggregate({
      _sum: {
        hours: true,
      },
      where: {
        date: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    });

    const alreadyHours = totalHoursToday._sum.hours || 0;

    if (alreadyHours + hoursNumber > 24) {
      return res.status(400).json({
        error: `Total hours for this date exceed 24. Already logged: ${alreadyHours}`,
      });
    }

    // Create entry
    const newEntry = await prisma.timeEntry.create({
      data: {
        date: new Date(date),
        project,
        hours: hoursNumber,
        description,
      },
    });

    res.status(201).json(newEntry);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// GET /time-entries
router.get("/", async (req, res) => {
  try {
    // Get all entries
    const entries = await prisma.timeEntry.findMany({
      orderBy: { date: "asc" },
    });

    // Group by dates
    const grouped: Record<string, any> = {};
    let grandTotal = 0;

    entries.forEach((entry) => {
      const dateKey = entry.date.toISOString().split("T")[0];
      if (!grouped[dateKey]) {
        grouped[dateKey] = { entries: [], total: 0 };
      }
      grouped[dateKey].entries.push(entry);
      grouped[dateKey].total += entry.hours;
      grandTotal += entry.hours;
    });

    res.json({ groupedEntries: grouped, grandTotal });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
