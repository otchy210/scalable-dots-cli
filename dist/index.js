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
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
const yargs = __importStar(require("yargs"));
const parseOptions = async () => {
    const { _: files, type, size, gap, prettyPrint, } = await yargs
        .option('type', {
        type: 'string',
        description: 'Type of dots',
        choices: ['SQUARE', 'CIRCLE', 'RHOMBUS'],
        default: 'SQUARE',
    })
        .option('size', {
        type: 'number',
        description: 'Size of dots',
        default: 16,
    })
        .option('gap', {
        type: 'number',
        description: 'Gap between dots',
        default: 2,
    })
        .option('pretty-print', {
        type: 'boolean',
        description: 'Enable pretty-print output',
        default: false,
    })
        .locale('en')
        .help().argv;
    return {
        files: files.map((file) => String(file)),
        type: type,
        size,
        gap,
        prettyPrint,
    };
};
const main = async () => {
    const options = await parseOptions();
    console.log(options);
};
exports.main = main;
(0, exports.main)();
