const express = require("express");
const {
  createTask,
  updateTask,
  deleteTask,
  getTasks,
} = require("../controllers/taskController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, createTask);
router.put("/:id", authMiddleware, updateTask);
router.delete("/:id", authMiddleware, deleteTask);
router.get("/", authMiddleware, getTasks);

module.exports = router;
