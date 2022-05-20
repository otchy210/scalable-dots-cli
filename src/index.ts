import {
  DotType,
  ImageData,
  ScalableDotsProps,
} from '@otchy/scalable-dots-core/dist/esm/types';
import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';
import { existsSync } from 'fs';
import sharp from 'sharp';
import { scalableDots } from '@otchy/scalable-dots-core';

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
  if (meta.width === undefined || meta.height === undefined) {
    console.error('Failed to load metadata', meta);
    process.exit(1);
  }
  const raw = await image.ensureAlpha().raw().toBuffer();
  const imageData: ImageData = {
    width: meta.width,
    height: meta.height,
    data: new Uint8ClampedArray(raw),
  };
  const props: ScalableDotsProps = {
    imageData,
    type: options.type,
    size: options.size,
    gap: options.gap,
  };
  const dots = scalableDots(props);
  if (options.prettyPrint) {
    process.stdout.write(dots.toPrettyXml());
  } else {
    process.stdout.write(dots.toMinifiedXml());
  }
};
