const path=require("path");delete process.env.ELECTRON_RUN_AS_NODE,process.env.VSCODE_DEV?(process.env.VSCODE_INJECT_NODE_MODULE_LOOKUP_PATH=process.env.VSCODE_INJECT_NODE_MODULE_LOOKUP_PATH||path.join(__dirname,"..","remote","node_modules"),require("./bootstrap-node").injectNodeModuleLookupPath(process.env.VSCODE_INJECT_NODE_MODULE_LOOKUP_PATH)):delete process.env.VSCODE_INJECT_NODE_MODULE_LOOKUP_PATH,require("./bootstrap-amd").load("vs/server/node/server.cli");

//# sourceMappingURL=https://ticino.blob.core.windows.net/sourcemaps/8dfae7a5cd50421d10cd99cb873990460525a898/core/server-cli.js.map
