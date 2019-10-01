To reproduce the issue:

```
nvm install v10.16.3
npm install
node index.js
# wait ~5 minutes.
```

Result:
```
Read 250 docs (250 total). Last doc: 04vXQFuo3vA4Remqyazy
Read 250 docs (500 total). Last doc: 09JXOMuMSLjMmCx1mpcs
... (usually it fails once it gets to ~"95000 total") ...
(node:35737) UnhandledPromiseRejectionWarning: Error: Bandwidth exhausted
    at Http2CallStream.call.on (/Users/mikelehen/src/node-http2-repro/node_modules/@grpc/grpc-js/build/src/call.js:68:41)
    at Http2CallStream.emit (events.js:203:15)
    at process.nextTick (/Users/mikelehen/src/node-http2-repro/node_modules/@grpc/grpc-js/build/src/call-stream.js:71:22)
    at process._tickCallback (internal/process/next_tick.js:61:11)
```

Now `nvm install v10.16.2` and run it. It should complete successfully:

```
Read 250 docs (250 total). Last doc: 04vXQFuo3vA4Remqyazy
Read 250 docs (500 total). Last doc: 09JXOMuMSLjMmCx1mpcs
...
Read 200 docs (201700 total). Last doc: zzzhIf3SovjTPCEvT4TR
All done!
```
