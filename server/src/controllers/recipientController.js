import Recipient from "../models/Recipient.js";

/**
 * Obtener todos los destinatarios ordenados alfabéticamente
 */
export const getRecipients = async (req, res) => {
  try {
    const recipients = await Recipient.find().sort({ destinatario: 1 });
    res.json(recipients);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener destinatarios", error: error.message });
  }
};

/**
 * Crear un nuevo destinatario
 */
export const createRecipient = async (req, res) => {
  try {
    const data = req.body;
    
    // Validar que todos los campos requeridos estén presentes
    if (!data.destinatario || !data.rut || !data.giro || !data.direccion || !data.ciudad) {
      return res.status(400).json({ message: "Todos los campos son requeridos" });
    }
    
    // Verificar si el RUT ya existe
    const existing = await Recipient.findOne({ rut: data.rut });
    if (existing) {
      return res.status(400).json({ message: "Este RUT ya existe." });
    }
    
    const newRecipient = new Recipient(data);
    await newRecipient.save();
    res.status(201).json(newRecipient);
  } catch (error) {
    res.status(500).json({ message: "Error al crear destinatario", error: error.message });
  }
};

/**
 * Actualizar un destinatario existente
 */
export const updateRecipient = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    
    // Si se está actualizando el RUT, verificar que no esté duplicado
    if (data.rut) {
      const existing = await Recipient.findOne({ 
        rut: data.rut, 
        _id: { $ne: id } 
      });
      if (existing) {
        return res.status(400).json({ message: "Este RUT ya existe en otro destinatario." });
      }
    }
    
    const updated = await Recipient.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    
    if (!updated) {
      return res.status(404).json({ message: "Destinatario no encontrado" });
    }
    
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar destinatario", error: error.message });
  }
};

/**
 * Eliminar un destinatario
 */
export const deleteRecipient = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Recipient.findByIdAndDelete(id);
    
    if (!deleted) {
      return res.status(404).json({ message: "Destinatario no encontrado" });
    }
    
    res.json({ message: "Destinatario eliminado correctamente", deletedId: id });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar destinatario", error: error.message });
  }
};

/**
 * Obtener un destinatario por ID
 */
export const getRecipientById = async (req, res) => {
  try {
    const { id } = req.params;
    const recipient = await Recipient.findById(id);
    
    if (!recipient) {
      return res.status(404).json({ message: "Destinatario no encontrado" });
    }
    
    res.json(recipient);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener destinatario", error: error.message });
  }
};
