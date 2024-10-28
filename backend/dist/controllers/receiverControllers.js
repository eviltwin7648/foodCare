"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReceiver = exports.updateReceiver = exports.getReceiverById = exports.getAllReceivers = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Get all receivers
const getAllReceivers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const receivers = yield prisma.receiver.findMany();
        res.json(receivers);
    }
    catch (error) {
        res.status(500).json({ error: 'Could not fetch receivers.' });
    }
});
exports.getAllReceivers = getAllReceivers;
// Get a specific receiver by ID
const getReceiverById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const receiver = yield prisma.receiver.findUnique({ where: { id } });
        res.json(receiver);
    }
    catch (error) {
        res.status(500).json({ error: 'Could not fetch receiver.' });
    }
});
exports.getReceiverById = getReceiverById;
// Update receiver details
const updateReceiver = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const data = req.body;
    try {
        const updatedReceiver = yield prisma.receiver.update({ where: { id }, data });
        res.json(updatedReceiver);
    }
    catch (error) {
        res.status(500).json({ error: 'Could not update receiver.' });
    }
});
exports.updateReceiver = updateReceiver;
// Delete receiver
const deleteReceiver = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield prisma.receiver.delete({ where: { id } });
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ error: 'Could not delete receiver.' });
    }
});
exports.deleteReceiver = deleteReceiver;
