import { DotType } from '@otchy/scalable-dots-core/dist/esm/types';
import * as yargs from 'yargs';

type Options = {
  files: string[];
  type: DotType;
  size: number;
  gap: number;
  prettyPrint: boolean;
};

const parseOptions = async (): Promise<Options> => {
  const {
    _: files,
    type,
    size,
    gap,
    prettyPrint,
  } = await yargs
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
    type: type as DotType,
    size,
    gap,
    prettyPrint,
  };
};

export const main = async () => {
  const options = await parseOptions();
  console.log(options);
};
main();
