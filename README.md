# ScalableDots CLI

## Requirement

Node.js v18+

```
$ node -v
```

## Install

Local folder

```
$ npm install @otchy/scalable-dots-cli
```

System global

```
$ npm install -g @otchy/scalable-dots-cli
```

## Run

Local folder

```
$ npx scalable-dots input.png > output.svg
```

System global

```
$ scalable-dots input.png > output.svg
```

## Command line options

```
Options:
  --version       Show version number                                  [boolean]
  --type          Type of dots
           [string] [choices: "SQUARE", "CIRCLE", "RHOMBUS"] [default: "SQUARE"]
  --size          Size of dots                            [number] [default: 16]
  --gap           Gap between dots                         [number] [default: 1]
  --pretty-print  Enable pretty-print output          [boolean] [default: false]
  --help          Show help                                            [boolean]
```

Example

```
$ scalable-dots --type=CIRCLE --size=32 --gap=0 --pretty-print input.png > output.svg
```

## Development

### Initial setup

```
$ git config --local core.hooksPath .githooks
```
