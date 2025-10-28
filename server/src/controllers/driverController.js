import Driver from "../models/Driver.js";

/**
 * Obtener todos los choferes ordenados alfabéticamente
 */
export const getDrivers = async (req, res) => {
  try {
    const drivers = await Driver.find().sort({ chofer: 1 });
    res.json(drivers);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener choferes", error: error.message });
  }
};

/**
 * Crear un nuevo chofer
 */
export const createDriver = async (req, res) => {
  try {
    const data = req.body;
    
    // Validar que todos los campos requeridos estén presentes
    if (!data.chofer || !data.rutChofer) {
      return res.status(400).json({ message: "Todos los campos son requeridos" });
    }
    
    // Verificar si el RUT ya existe
    const existing = await Driver.findOne({ rutChofer: data.rutChofer });
    if (existing) {
      return res.status(400).json({ message: "Este RUT ya existe." });
    }
    
    const newDriver = new Driver(data);
    await newDriver.save();
    res.status(201).json(newDriver);
  } catch (error) {
    res.status(500).json({ message: "Error al crear chofer", error: error.message });
  }
};

/**
 * Actualizar un chofer existente
 */
export const updateDriver = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    
    // Si se está actualizando el RUT, verificar que no esté duplicado
    if (data.rutChofer) {
      const existing = await Driver.findOne({ 
        rutChofer: data.rutChofer, 
        _id: { $ne: id } 
      });
      if (existing) {
        return res.status(400).json({ message: "Este RUT ya existe en otro chofer." });
      }
    }
    
    const updated = await Driver.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    
    if (!updated) {
      return res.status(404).json({ message: "Chofer no encontrado" });
    }
    
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar chofer", error: error.message });
  }
};

/**
 * Eliminar un chofer
 */
export const deleteDriver = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Driver.findByIdAndDelete(id);
    
    if (!deleted) {
      return res.status(404).json({ message: "Chofer no encontrado" });
    }
    
    res.json({ message: "Chofer eliminado correctamente", deletedId: id });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar chofer", error: error.message });
  }
};

/**
 * Obtener un chofer por ID
 */
export const getDriverById = async (req, res) => {
  try {
    const { id } = req.params;
    const driver = await Driver.findById(id);
    
    if (!driver) {
      return res.status(404).json({ message: "Chofer no encontrado" });
    }
    
    res.json(driver);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener chofer", error: error.message });
  }
};
