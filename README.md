# node-debug

A set of short examples that illustrate https://www.npmjs.com/package/debug using across different modules.

## Install

`npm i`

## There are 3 kind of examples:

* Node console based
* Backend express based
* Frontend

### Node console based

`npm start`

The result should be like this:

```
ddfcsvreader:log reading  { select: { all: true } } +0ms
ddfcsvreader:err just an error +0ms
ddfcsvreader:log trying to validate  { select: { all: true } } +0ms
waffleserver:log got data  { data: [ 1, 2, 3 ], for: { select: { all: true } } }  in accordance with  { select: { all: true } } +0ms
```

Also, you can comment https://github.com/VS-work/node-debug/blob/master/src/index.ts#L5 and uncomment https://github.com/VS-work/node-debug/blob/master/src/index.ts#L6

and run again.

The result should be like this:

```
ddfcsvreader:err just an error +0ms
```

The latest example illustrates how to use standard filters on `debug` module.

### Backend express based

`npm run backend`

Open browser with url `http://localhost:3000/`. The result should be like this:

```
2018-11-06T11:42:49.856Z ddfcsvreader:log reading
{
  "select": {
    "all": true
  }
}
2018-11-06T11:42:49.858Z ddfcsvreader:err just an error
2018-11-06T11:42:49.858Z ddfcsvreader:log trying to validate
{
  "select": {
    "all": true
  }
}
2018-11-06T11:42:49.858Z waffleserver:log got data
{
  "data": [
    1,
    2,
    3
  ],
  "for": {
    "select": {
      "all": true
    }
  }
}
 in accordance with
{
  "select": {
    "all": true
  }
}
----------------------
result is {
  "data": [
    1,
    2,
    3
  ],
  "for": {
    "select": {
      "all": true
    }
  }
}
```

The main specific of this solution is regarding using of `loggerWrapper` https://github.com/VS-work/node-debug/blob/master/src/server.ts#L13 .

`loggerWrapper` allows us to redirect logging stream from console to another stream (see `Output streams` in https://www.npmjs.com/package/debug). It's critical in case of backend (express based application).

In this case (https://github.com/VS-work/node-debug/blob/master/src/server.ts) we need to expose out log results to http response.

Let's explain:

1. Create `loggerWrapper`: https://github.com/VS-work/node-debug/blob/master/src/server.ts#L13 .
2. `loggerWrapper` implements only one menthod - `log`: https://github.com/VS-work/node-debug/blob/master/src/logger-utils.ts#L7
3. In the current case, `loggerWrapper` get http response object during its creation
4. And it's trying to write all of the log parameters to HTTP response instead console
5. Another mandatory point is: https://github.com/VS-work/node-debug/blob/master/src/logger-utils.ts#L29 (see `Output streams` in https://www.npmjs.com/package/debug).
6. That's why `createLogger` is just an utility method: https://github.com/VS-work/node-debug/blob/master/src/logger-utils.ts#L25

### Frontend

`npm run frontend`

Open browser with url `http://localhost:8080/index.html`. The result should be following:

```
{ "data": [ 1, 2, 3 ], "for": { "select": { "all": true } } }
```

Open `Chrome DevTools`->`Console` and you will see expected output.

*Important note*: if you want to see JS objects as is (collapsable), please don't apply formatters to them (see `Formatters` section in https://www.npmjs.com/package/debug). In following, for example, code https://github.com/VS-work/node-debug/blob/master/src/waffle-server.ts#L15 we get JS objects as is.

## Pros:

1. This is a standard solution

2. Independent logger for each module and an ability to create own namespace

    * https://github.com/VS-work/node-debug/blob/master/src/waffle-server.ts#L8
    * https://github.com/VS-work/node-debug/blob/master/src/ddfcsv-reader.ts#L9-L10
    * https://github.com/VS-work/node-debug/blob/master/src/ddf-query-validator.ts#L7

3. An ability to filter different namespaces using wildcards

    * https://github.com/VS-work/node-debug/blob/master/src/index.ts#L5-L6
    * and we can do it inside the application

## Cons:

1. Predefined Log Levels such as `notice`, `debug`, `error` are missing. The issue can be resolved via new debug namespace creating. (see Pros)

2. We need to pass the loggerObject https://github.com/VS-work/node-debug/blob/master/src/index.ts#L13 through all expected modules if we want to use the *CUSTOM* output. (see https://github.com/VS-work/node-debug/blob/master/src/custom-logger.ts#L4 and https://github.com/VS-work/node-debug/blob/master/src/custom-logger.ts#L12).

3. I some cases we must use system variables: https://github.com/VS-work/node-debug/blob/master/package.json#L10 . In this case we are using `DEBUG_COLORS`. The goal is to get the output without special (colors) characters. There is no way to switch off `color mode` inside the application.
