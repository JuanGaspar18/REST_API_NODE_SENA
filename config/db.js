const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Conectado a la base de datos:", mongoose.connection.name);
    } catch (error) {
        console.error("Error al conectar a MongoDB:", error);
        process.exit(1); //Detiene la ejecución si hay error
    }
};

module.exports = connectDB;
