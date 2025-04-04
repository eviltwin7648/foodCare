"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const donarRoutes_1 = __importDefault(require("./routes/donarRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const receiverRoutes_1 = __importDefault(require("./routes/receiverRoutes"));
const foodListingRoutes_1 = __importDefault(require("./routes/foodListingRoutes"));
const claimsRoutes_1 = __importDefault(require("./routes/claimsRoutes"));
const dashboardRoutes_1 = __importDefault(require("./routes/dashboardRoutes"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
// origin: "http://localhost:5000"
}));
app.use("/api/auth", authRoutes_1.default);
app.use("/api/donar", donarRoutes_1.default);
app.use("/api/receiver", receiverRoutes_1.default);
app.use("/api/claims", claimsRoutes_1.default);
app.use("/api/food-listings", foodListingRoutes_1.default);
app.use("/api/dashboard", dashboardRoutes_1.default);
app.get('/api/dashboard/donar/:id', (req, res) => { });
app.get('/api/dashboard/receiver/:id', (req, res) => { });
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
