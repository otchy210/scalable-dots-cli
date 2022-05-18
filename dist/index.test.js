"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
describe('main', () => {
    const mockedLog = jest.spyOn(console, 'log');
    it('works', () => {
        (0, _1.main)(['aa', 'bb', 'cc']);
        expect(mockedLog).toBeCalledWith({});
    });
});
