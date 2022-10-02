"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable quotes */
const http_errors_1 = __importDefault(require("http-errors"));
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const compression_1 = __importDefault(require("compression"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const accountRoute_1 = __importDefault(require("./routes/accountRoute"));
const txRoute_1 = __importDefault(require("./routes/txRoute"));
const app = (0, express_1.default)();
console.log("app running on port 7000");
app.use((0, compression_1.default)());
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json({
    limit: "10mb",
}));
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use("/api/users", userRoute_1.default);
app.use("/api/account", accountRoute_1.default);
app.use("/api/notify", txRoute_1.default);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next((0, http_errors_1.default)(404));
});
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.send(err);
    next();
});
exports.default = app;
//# sourceMappingURL=app.js.map