# scalable-dots-cli

## Install

```
$ npm install @otchy/scalable-dots-cli
```

## Run

```
$ ./dist/scalable-dots input.png > output.svg
```

```
$ ./dist/scalable-dots --help
Options:
  --version       Show version number                                  [boolean]
  --type          Type of dots
           [string] [choices: "SQUARE", "CIRCLE", "RHOMBUS"] [default: "SQUARE"]
  --size          Size of dots                            [number] [default: 16]
  --gap           Gap between dots                         [number] [default: 1]
  --pretty-print  Enable pretty-print output          [boolean] [default: false]
  --help          Show help                                            [boolean]
```

## Development

### Initial setup

```
$ git config --local core.hooksPath .githooks
```
