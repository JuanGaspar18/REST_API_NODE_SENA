require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db"); // 🔹 Importamos la conexión a la BD

const authRoutes = require("./routes/auth");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Rutas
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("Servidor funcionando correctamente");
});

// Conectar a la BD
connectDB();

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
