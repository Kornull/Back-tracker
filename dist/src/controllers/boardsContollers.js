"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.deleteBoard = exports.updateBoard = exports.createBoard = exports.getBoardById = exports.getBoards = void 0;
const boardService = __importStar(require("../services/board.service"));
const error_service_1 = require("../services/error.service");
const getBoards = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foundedBoards = yield boardService.findBoards();
        res.json(foundedBoards);
    }
    catch (err) {
        console.log(err);
    }
});
exports.getBoards = getBoards;
const getBoardById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foundedBoards = yield boardService.findBoardById(req.params['boardId']);
        res.json(foundedBoards);
    }
    catch (err) {
        return res.status(404).send((0, error_service_1.createError)(404, 'Board was not founded!'));
    }
});
exports.getBoardById = getBoardById;
const createBoard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const guid = req.header('Guid') || 'undefined';
    const initUser = req.header('initUser') || 'undefined';
    const bodyError = (0, error_service_1.checkBody)(req.body, ['title', 'description', 'owner', 'users']);
    if (bodyError) {
        return res.status(400).send((0, error_service_1.createError)(400, "bad request: " + bodyError));
    }
    const { title, description, owner, users } = req.body;
    try {
        const newBoard = yield boardService.createBoard({ title, description, owner, users }, guid, initUser);
        res.json(newBoard);
    }
    catch (err) {
        return console.log(err);
    }
});
exports.createBoard = createBoard;
const updateBoard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const guid = req.header('Guid') || 'undefined';
    const initUser = req.header('initUser') || 'undefined';
    const bodyError = (0, error_service_1.checkBody)(req.body, ['title', 'description', 'owner', 'users']);
    if (bodyError) {
        return res.status(400).send((0, error_service_1.createError)(400, "bad request: " + bodyError));
    }
    const { title, description, owner, users } = req.body;
    try {
        const updatedBoard = yield boardService.updateBoard(req.params['boardId'], { title, description, owner, users }, guid, initUser);
        res.json(updatedBoard);
    }
    catch (err) {
        return console.log(err);
    }
});
exports.updateBoard = updateBoard;
const deleteBoard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const guid = req.header('Guid') || 'undefined';
    const initUser = req.header('initUser') || 'undefined';
    try {
        const deletedBoard = yield boardService.deleteBoardById(req.params['boardId'], guid, initUser);
        res.json(deletedBoard);
    }
    catch (err) {
        return console.log(err);
    }
});
exports.deleteBoard = deleteBoard;
