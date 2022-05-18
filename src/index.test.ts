import { parseOptions } from '.';

describe('parseOptions', () => {
  it('returns default options when argv is empty', async () => {
    const options = await parseOptions(['_', '_']);
    expect(options).toMatchObject({
      files: [],
      type: 'SQUARE',
      size: 16,
      gap: 2,
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
