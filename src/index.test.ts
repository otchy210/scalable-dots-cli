import { convertToXml, main, Options, parseOptions, validateFiles } from '.';

describe('parseOptions', () => {
  it('returns default options when argv is empty', async () => {
    const options = await parseOptions(['_', '_']);
    expect(options).toMatchObject({
      files: [],
      type: 'SQUARE',
      size: 16,
      gap: 1,
      prettyPrint: false,
    });
  });
  it('parses options properly', async () => {
    const options = await parseOptions([
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
    await expect(validateFiles([])).rejects.toThrowError(
      'One input file is required'
    );
  });
  it('throws an error when multiple files are given', async () => {
    await expect(validateFiles(['file1', 'file2'])).rejects.toThrowError(
      'Multiple input files are not supported'
    );
  });
  it("throws an error when given file doesn't exist", async () => {
    await expect(validateFiles(['dummy'])).rejects.toThrowError(
      '"dummy" doesn\'t exist'
    );
  });
  it('returns proper file path when given file exists', async () => {
    await expect(validateFiles(['test/image.png'])).resolves.toBe(
      'test/image.png'
    );
  });
});

describe('convertToXml', () => {
  const defaultOptions: Options = {
    files: ['./test/image.png'],
    type: 'SQUARE',
    size: 16,
    gap: 1,
    prettyPrint: false,
  };
  it('matches snapshot when options are default', async () => {
    await expect(convertToXml(defaultOptions)).resolves.toMatchSnapshot();
  });
  it('matches snapshot when options enable prettyPrint', async () => {
    const options = { ...defaultOptions, prettyPrint: true };
    await expect(convertToXml(options)).resolves.toMatchSnapshot();
  });
});

describe('main', () => {
  const mockedError = jest.spyOn(console, 'error');
  const mockedWrite = jest.spyOn(process.stdout, 'write');

  beforeEach(() => {
    jest.resetAllMocks();
  });
  it('shows error when files are invalid', async () => {
    await expect(main(['_', '_'])).resolves.toBe(1);
    expect(mockedError).toBeCalledWith('One input file is required');
  });
  it('shows error when input file is not an image', async () => {
    await expect(main(['_', '_', './README.md'])).resolves.toBe(1);
    expect(mockedError).toBeCalledWith(
      'Input file contains unsupported image format'
    );
  });
  it('writes xml when input file is an image', async () => {
    await expect(main(['_', '_', './test/image.png'])).resolves.toBe(0);
    expect(mockedWrite).toBeCalledTimes(1);
  });
});
