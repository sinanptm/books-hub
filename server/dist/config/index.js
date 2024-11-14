"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NODE_ENV = exports.CLIENT_URL = exports.MONGODB_URL = exports.PORT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
_a = process.env, exports.PORT = _a.PORT, exports.MONGODB_URL = _a.MONGODB_URL, exports.CLIENT_URL = _a.CLIENT_URL, exports.NODE_ENV = _a.NODE_ENV;
