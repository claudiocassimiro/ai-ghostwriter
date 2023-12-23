import { Router } from "express";
import multer from "multer";
import pdfController from "../controllers/pdfController/handlerPdf";
import commandController from "../controllers/commandController/handlerCommand";
import { storage } from "../utils/multer/storage";

const router = Router();

const upload = multer({ storage: storage() });

router.post("/api/files", upload.single("file"), pdfController.save);
router.post(
  "/api/copywriteFiles",
  upload.single("file"),
  // eslint-disable-next-line prettier/prettier
  pdfController.saveCopywriteKnowledge
);
router.delete("/api/deleteAllDocs", pdfController.deleteAllDocuments);
router.get("/api/saveManyPdfs", pdfController.saveManyPdfs);
router.post("/api/command", commandController.command);

export default router;
