"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = exports.convertToXml = exports.validateFiles = exports.parseOptions = void 0;
const yargs_1 = __importDefault(require("yargs/yargs"));
const helpers_1 = require("yargs/helpers");
const fs_1 = require("fs");
const sharp_1 = __importDefault(require("sharp"));
const scalable_dots_core_1 = require("@otchy/scalable-dots-core");
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
        default: 1,
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
exports.parseOptions = parseOptions;
const validateFiles = async (files) => {
    if (files.length === 0) {
        throw new Error('One input file is required');
    }
    if (files.length > 1) {
        throw new Error('Multiple input files are not supported');
    }
    const file = files[0];
    if (!(0, fs_1.existsSync)(file)) {
        throw new Error(`"${file}" doesn't exist`);
    }
    return file;
};
exports.validateFiles = validateFiles;
const convertToXml = async (options) => {
    const file = options.files[0];
    const image = (0, sharp_1.default)(file);
    const meta = await image.metadata();
    if (meta.width === undefined || meta.height === undefined) {
        throw new Error(`Failed to load metadata: ${meta.toString()}`);
    }
    const raw = await image.ensureAlpha().raw().toBuffer();
    const imageData = {
        width: meta.width,
        height: meta.height,
        data: new Uint8ClampedArray(raw),
    };
    const props = {
        imageData,
        type: options.type,
        size: options.size,
        gap: options.gap,
    };
    const dots = (0, scalable_dots_core_1.scalableDots)(props);
    if (options.prettyPrint) {
        return dots.toPrettyXml();
    }
    else {
        return dots.toMinifiedXml();
    }
};
exports.convertToXml = convertToXml;
const main = async (argv = process.argv) => {
    const options = await (0, exports.parseOptions)(argv);
    const file = await (0, exports.validateFiles)(options.files).catch((e) => {
        console.error(e.message);
    });
    if (!file) {
        return 1;
    }
    const xml = await (0, exports.convertToXml)(options).catch((e) => {
        console.error(e.message);
    });
    if (!xml) {
        return 1;
    }
    process.stdout.write(xml);
    return 0;
};
exports.main = main;
