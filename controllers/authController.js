const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

/**
 * REGISTRAR USUARIO
 */
exports.register = async (req, res) => {
    try {
        const { nombre, apellido, correo, contraseña } = req.body;

        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ correo });
        if (existingUser) {
            return res.status(400).json({ message: "El correo ya está registrado" });
        }

        // Hashear la contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(contraseña, salt);

        // Crear usuario
        const newUser = new User({
            nombre,
            apellido,
            correo,
            contraseña: hashedPassword,
        });

        await newUser.save();
        res.status(201).json({ message: "Usuario registrado con éxito" });
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor", error });
    }
};

/**
 * INICIO DE SESIÓN
 */
exports.login = async (req, res) => {
    try {
        const { correo, contraseña } = req.body;

        const user = await User.findOne({ correo });
        if (!user) {
            return res.status(400).json({ message: "Usuario no encontrado" });
        }

        const validPassword = await bcrypt.compare(contraseña, user.contraseña);
        if (!validPassword) {
            return res.status(400).json({ message: "Contraseña incorrecta" });
        }

        const token = jwt.sign({ id: user._id, correo: user.correo }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        res.json({ message: "Autenticación exitosa", token });
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor", error });
    }
};
