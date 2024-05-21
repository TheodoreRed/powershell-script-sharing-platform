import { Router } from "express";
import {
  getAllScripts,
  getScriptById,
  createScript,
  updateScript,
  deleteScript,
  toggleStarScript,
} from "../controllers/scriptController";

const router = Router();

router.get("/", getAllScripts);
router.get("/:id", getScriptById);
router.post("/", createScript);
router.put("/:id", updateScript);
router.delete("/:id", deleteScript);
router.patch("/:id/star", toggleStarScript);

export default router;
