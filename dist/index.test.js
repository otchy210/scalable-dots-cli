"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
describe('parseOptions', () => {
    it('returns default options when argv is empty', async () => {
        const options = await (0, _1.parseOptions)(['_', '_']);
        expect(options).toMatchObject({
            files: [],
            type: 'SQUARE',
            size: 16,
            gap: 2,
            prettyPrint: false,
        });
    });
    it('parses options properly', async () => {
        const options = await (0, _1.parseOptions)([
            '_',
            '_',
            'file1',
            'file2',
            '--type=CIRCLE',
            '--size=32',
            '--gap=0',
            '--pretty-print',
        ]);
        expect(options).toMatchObject({
            files: ['file1', 'file2'],
            type: 'CIRCLE',
            size: 32,
            gap: 0,
            prettyPrint: true,
        });
    });
});
describe('validateFiles', () => {
    it('throws an error when no file is given', async () => {
        await expect((0, _1.validateFiles)([])).rejects.toThrowError('One input file is required');
    });
    it('throws an error when multiple files are given', async () => {
        await expect((0, _1.validateFiles)(['file1', 'file2'])).rejects.toThrowError('Multiple input files are not supported');
    });
    it("throws an error when given file doesn't exist", async () => {
        await expect((0, _1.validateFiles)(['dummy'])).rejects.toThrowError('"dummy" doesn\'t exist');
    });
});
