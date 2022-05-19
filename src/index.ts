import { DotType } from '@otchy/scalable-dots-core/dist/esm/types';
import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';
import { existsSync } from 'fs';
import sharp from 'sharp';

type Options = {
  files: string[];
  type: DotType;
  size: number;
  gap: number;
  prettyPrint: boolean;
};

export const parseOptions = async (argv = process.argv): Promise<Options> => {
  const {
    _: files,
    type,
    size,
    gap,
    prettyPrint,
  } = await yargs(hideBin(argv))
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

export const validateFiles = async (files: string[]) => {
  if (files.length === 0) {
    throw new Error('One input file is required');
  }
  if (files.length > 1) {
    throw new Error('Multiple input files are not supported');
  }
  const file = files[0];
  if (!existsSync(file)) {
    throw new Error(`"${file}" doesn't exist`);
  }
  return file;
};

export const main = async (argv = process.argv) => {
  const options = await parseOptions(argv);
  const file = await validateFiles(options.files).catch((e: Error) => {
    console.error(e.message);
    process.exit(1);
  });
  const image = sharp(file);
  const meta = await image.metadata().catch((e) => {
    console.error(e.message);
    process.exit(1);
  });
  console.log(meta);
};
