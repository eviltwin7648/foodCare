import express from "express";
import donarRoutes from "./routes/donarRoutes";
import authRoutes from "./routes/authRoutes";
import receiverRoutes from "./routes/receiverRoutes";
import foodListingRoutes from "./routes/foodListingRoutes";
import claimsRoutes from "./routes/claimsRoutes";
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors())

app.use("/api/auth", authRoutes);
app.use("/api/donar", donarRoutes);
app.use("/api/receiver", receiverRoutes);
app.use("/api/claims", claimsRoutes);
app.use("/api/food-listings", foodListingRoutes);

app.get('/api/dashboard/donar/:id',(req,res)=>{})
app.get('/api/dashboard/receiver/:id',(req,res)=>{})
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
