import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { getClient } from "../mongoClient";

const collectionName = "scripts";

// Get all scripts
export const getAllScripts = async (_req: Request, res: Response) => {
  try {
    const client = await getClient();
    const scripts = await client
      .db()
      .collection(collectionName)
      .find()
      .toArray();
    res.status(200).json(scripts);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get a script by ID
export const getScriptById = async (req: Request, res: Response) => {
  try {
    const client = await getClient();
    const script = await client
      .db()
      .collection(collectionName)
      .findOne({ _id: new ObjectId(req.params.id) });
    if (!script) {
      res.status(404).json({ message: "Script not found" });
      return;
    }
    res.status(200).json(script);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Create a new script
export const createScript = async (req: Request, res: Response) => {
  try {
    const client = await getClient();
    const newScript = { ...req.body, createdAt: new Date(), stars: [] };
    const result = await client
      .db()
      .collection(collectionName)
      .insertOne(newScript);
    res.status(201).json({ _id: result.insertedId, ...newScript });
  } catch (error) {
    res.status(400).json({ message: "Bad request" });
  }
};

// Update a script by ID
export const updateScript = async (req: Request, res: Response) => {
  try {
    const client = await getClient();
    const updatedScript = req.body;
    const result = await client
      .db()
      .collection(collectionName)
      .findOneAndUpdate(
        { _id: new ObjectId(req.params.id) },
        { $set: updatedScript },
        { returnDocument: "after" }
      );
    if (!result) {
      res.status(404).json({ message: "Script not found" });
      return;
    }
    res.status(200).json(result.value);
  } catch (error) {
    res.status(400).json({ message: "Bad request" });
  }
};

// Delete a script by ID
export const deleteScript = async (req: Request, res: Response) => {
  try {
    const client = await getClient();
    const result = await client
      .db()
      .collection(collectionName)
      .findOneAndDelete({ _id: new ObjectId(req.params.id) });
    if (!result) {
      res.status(404).json({ message: "Script not found" });
      return;
    }
    res.status(200).json({ message: "Script deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Toggle star for a script
export const toggleStarScript = async (req: Request, res: Response) => {
  try {
    const client = await getClient();
    const userId = req.body.userId;
    const scriptId = new ObjectId(req.params.id);

    const script = await client
      .db()
      .collection(collectionName)
      .findOne({ _id: scriptId });
    if (!script) {
      res.status(404).json({ message: "Script not found" });
      return;
    }

    let update;
    if (script.stars.includes(userId)) {
      update = { $pull: { stars: userId } }; // Remove star
    } else {
      update = { $addToSet: { stars: userId } }; // Add star
    }

    const result = await client
      .db()
      .collection(collectionName)
      .findOneAndUpdate({ _id: scriptId }, update, { returnDocument: "after" });

    if (!result) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json(result.value);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
