import { Request, Response } from "express";
import {
  getManagedNumbers,
  getIncreasedNumbers,
  getPortfolio,
  getLastTransaction,
  getPotentialTransaction,
  getTask,
  postTask,
  getOfferProductRisk,
  getReProfileRiskTarget,
  deleteTask,
  updateTask,
} from "../models/recommendation-centre";

export const getManagedNumbersController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { rm_number } = req.query as { rm_number: string };
    const managedNumber = await getManagedNumbers(rm_number);
    res.json(managedNumber);
    return;
  } catch (error) {
    console.error("Error in getManagedNumbersController:", error);
    res.status(500).json({ error: "Internal server error" });
    return;
  }
};

export const getIncreasedNumbersController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { rm_number } = req.query as { rm_number: string };
    const increasedNumber = await getIncreasedNumbers(rm_number);
    res.json(increasedNumber);
    return;
  } catch (error) {
    console.error("Error in getIncreasedNumbersController:", error);
    res.status(500).json({ error: "Internal server error" });
    return;
  }
};

export const getPortfolioController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { rm_number } = req.query as { rm_number: string };
    const portfolio = await getPortfolio(rm_number);
    res.json(portfolio);
    return;
  } catch (error) {
    console.error("Error in getPortfolioController:", error);
    res.status(500).json({ error: "Internal server error" });
    return;
  }
};

export const getLastTransactionController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { rm_number } = req.query as { rm_number: string };
    const lastTransaction = await getLastTransaction(rm_number);
    res.json(lastTransaction);
    return;
  } catch (error) {
    console.error("Error in getLastTransactionController:", error);
    res.status(500).json({ error: "Internal server error" });
    return;
  }
};

export const getPotentialTransactionController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { rm_number } = req.query as { rm_number: string };
    const potentialTransaction = await getPotentialTransaction(rm_number);
    res.json(potentialTransaction);
    return;
  } catch (error) {
    console.error("Error in getPotentialTransactionController:", error);
    res.status(500).json({ error: "Internal server error" });
    return;
  }
};

export const getTaskController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { rm_number } = req.query as { rm_number: string };
    const task = await getTask(rm_number);
    res.json(task);
    return;
  } catch (error) {
    console.error("Error in getTaskController:", error);
    res.status(500).json({ error: "Internal server error" });
    return;
  }
};

export const postTaskController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { description, invitee, due_date } = req.body;
    // Optionally validate input fields here.
    const rm_number = (req as any).user?.rm_number;

    if (!rm_number) {
      res.status(401).json({ error: "Unauthorized: missing token data" });
      return;
    }

    const newTask = await postTask(description, invitee, due_date, rm_number);
    res.status(201).json(newTask); // 201 Created status code
  } catch (error) {
    console.error("Error posting task:", error);
    res.status(500).json({ error: "Failed to add task" });
  }
};

export const deleteTaskController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.query as { id: string };
    const deletedTask = await deleteTask(id);
    res.json(deletedTask);
    return;
  } catch (error) {
    console.error("Error in deleteTaskController:", error);
    res.status(500).json({ error: "Internal server error" });
    return;
  }
};

export const updateTaskController = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedTask = await updateTask(req.body);
    res.json(updatedTask);
    return;
  } catch (error) {
    console.error("Error in updateTaskController:", error);
    res.status(500).json({ error: "Internal server error" });
    return;
  }
};

export const getOfferProductRiskController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { rm_number } = req.query as { rm_number: string };
    const offerProductRisk = await getOfferProductRisk(rm_number);
    res.json(offerProductRisk);
    return;
  } catch (error) {
    console.error("Error in getOfferProductRiskController:", error);
    res.status(500).json({ error: "Internal server error" });
    return;
  }
};

export const getReProfileRiskTargetController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { rm_number } = req.query as { rm_number: string };
    const reProfileRiskTarget = await getReProfileRiskTarget(rm_number);
    res.json(reProfileRiskTarget);
    return;
  } catch (error) {
    console.error("Error in getReProfileRiskTargetController:", error);
    res.status(500).json({ error: "Internal server error" });
    return;
  }
};
