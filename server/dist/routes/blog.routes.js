"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogRoutes = void 0;
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const upload_1 = require("../middlewares/upload");
const router = express_1.default.Router();
exports.blogRoutes = router;
router.post("/get-upload-url", upload_1.upload.single("banner"), controllers_1.blogController.generateUploadURL);
//# sourceMappingURL=blog.routes.js.map