"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
const yargs_1 = __importDefault(require("yargs/yargs"));
const helpers_1 = require("yargs/helpers");
const parseOptions = async (argv = process.argv) => {
    const { _: files, type, size, gap, prettyPrint, } = await (0, yargs_1.default)((0, helpers_1.hideBin)(argv))
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
const main = async (argv = process.argv) => {
    const options = await parseOptions(argv);
    console.log(options);
};
exports.main = main;
