import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { getClient } from "../mongoClient";

const collectionName = "users";

export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const client = await getClient();
    const users = await client.db().collection(collectionName).find().toArray();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const client = await getClient();
    const user = await client
      .db()
      .collection(collectionName)
      .findOne({ _id: new ObjectId(req.params.id) });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const client = await getClient();
    const newUser = req.body;
    const result = await client
      .db()
      .collection(collectionName)
      .insertOne(newUser);
    res.status(201).json({ _id: result.insertedId, ...newUser });
  } catch (error) {
    res.status(400).json({ message: "Bad request" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const client = await getClient();
    const updatedUser = req.body;
    const result = await client
      .db()
      .collection(collectionName)
      .findOneAndUpdate(
        { _id: new ObjectId(req.params.id) },
        { $set: updatedUser },
        { returnDocument: "after" }
      );
    if (!result) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json(result.value);
  } catch (error) {
    res.status(400).json({ message: "Bad request" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const client = await getClient();
    const result = await client
      .db()
      .collection(collectionName)
      .findOneAndDelete({ _id: new ObjectId(req.params.id) });
    if (!result) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
