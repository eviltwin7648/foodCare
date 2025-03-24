import express from "express";
import donarRoutes from "./routes/donarRoutes";
import authRoutes from "./routes/authRoutes";
import receiverRoutes from "./routes/receiverRoutes";
import foodListingRoutes from "./routes/foodListingRoutes";
import claimsRoutes from "./routes/claimsRoutes";
import dashboardRoutes from "./routes/dashboardRoutes";
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors({
    origin: "https://sharemeal.vishalrai.tech"
}))

//hey there

app.use("/api/auth", authRoutes);
app.use("/api/donar", donarRoutes);
app.use("/api/receiver", receiverRoutes);
app.use("/api/claims", claimsRoutes);
app.use("/api/food-listings", foodListingRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.get('/api/dashboard/donar/:id',(req,res)=>{})
app.get('/api/dashboard/receiver/:id',(req,res)=>{})
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
