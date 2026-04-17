      import express from "express";
      import mongoose from "mongoose";
      import cors from "cors";
      import dotenv from "dotenv";
      dotenv.config();
      import blogRoutes from "./routes/blogRoutes.js";
      import teenageBlogRoutes from "./routes/teenageBlogRoutes.js";
import adultBlogRoutes from "./routes/adultBlogRoutes.js";
import autismRoutes from "./routes/autismContactRoutes.js";
import teenageContactRoutes from './routes/teenageContactRoutes.js'; 


      const app = express();

      // const allowedOrigins = process.env.CORS_ORIGIN
      //   ? process.env.CORS_ORIGIN.split(",").map(o => o.trim())
      //   : ["*", "http://localhost:5174"
      //     ,"https://apicourse.manovaidya.com", "https://course.manovaidya.com",
      //     "https://admincourse.manovaidya.com", "https://www.course.manovaidya.com"
      //   ];
      // app.use(cors({ origin: allowedOrigins, credentials: true }));
      // app.use(cors({ origin: (origin, cb) => !origin || allowedOrigins.includes(origin) ? cb(null, true) : cb(new Error("Not allowed by CORS")), credentials: true }));
      app.use(cors({ origin: "*", credentials: true }));
      app.use(express.json({ limit: "50mb" }));
      app.use(express.urlencoded({ limit: "50mb", extended: true }));
      app.use("/uploads", express.static("uploads"));

      mongoose.connect(process.env.MONGODB_URI)
        .then(() => console.log("✅ MongoDB Connected"))
        .catch(err => console.error("❌ MongoDB Error:", err.message));

    //use routes
  
app.use("/api/blogs", blogRoutes);
app.use("/api", teenageBlogRoutes);
app.use("/api/adult-blogs", adultBlogRoutes);
app.use("/api/autism/contact", autismRoutes);
app.use('/api', teenageContactRoutes);








      app.get("/api/health", (req, res) => res.json({ status: "OK", mongodb: mongoose.connection.readyState === 1 ? "Connected" : "Disconnected" }));

      app.use((err, req, res, next) => {
        console.error("❌ ERROR:", err.message);
        res.status(500).json({ error: err.message });
      });

      const PORT = process.env.PORT || 5008;
      app.listen(PORT, () => console.log(`🚀 Backend running on http://localhost:${PORT}`));
