"use strict";

// Compatibility entry point; the implementation lives in the descriptively
// named runner so Node's general test discovery never executes it implicitly.
await import("./run-file-protocol-tests.mjs");
