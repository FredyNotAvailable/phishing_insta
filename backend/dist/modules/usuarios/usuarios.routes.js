"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuarios_controller_1 = __importDefault(require("./usuarios.controller"));
const router = (0, express_1.Router)();
// Define routes
router.post('/', (req, res, next) => { usuarios_controller_1.default.create(req, res, next); });
router.get('/', (req, res, next) => { usuarios_controller_1.default.getAll(req, res, next); });
router.get('/stats', (req, res, next) => { usuarios_controller_1.default.getStats(req, res, next); });
router.delete('/:id', (req, res, next) => { usuarios_controller_1.default.delete(req, res, next); });
exports.default = router;
