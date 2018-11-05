# node-debug

A short example that illustrates https://www.npmjs.com/package/debug using across different modules.

## Install & Run

`npm i`

`npm start`

## Pros:

1. This is a standard solution

2. Independent logger for each module and an ability to create own namespace

    * https://github.com/VS-work/node-debug/blob/master/src/waffle-server.ts#L9-10
    * https://github.com/VS-work/node-debug/blob/master/src/ddfcsv-reader.ts#L10-L13
    * https://github.com/VS-work/node-debug/blob/master/src/ddf-query-validator.ts#L8-L9

3. An ability to filter different namespaces using wildcards

    * https://github.com/VS-work/node-debug/blob/master/src/index.ts#L11
    * https://github.com/VS-work/node-debug/blob/master/src/index.ts#L24

    * and we can do it inside the application

## Cons:

1. Predefined Log Levels such as `notice`, `debug`, `error` are missing. The issue can be resolved via new debug namespace creating. (see Pros)

2. We need to pass the loggerObject https://github.com/VS-work/node-debug/blob/master/src/index.ts#L13 through all expected modules if we want to use the custom output. (see https://github.com/VS-work/node-debug/blob/master/src/custom-logger.ts#L4 and https://github.com/VS-work/node-debug/blob/master/src/custom-logger.ts#L12).

3. I some cases we must use system variables: https://github.com/VS-work/node-debug/blob/master/package.json#L10 . In this case we are using `DEBUG_COLORS`. The goal is to get the output without special (colors) characters. There is no way to switch off `color mode` inside the application.
