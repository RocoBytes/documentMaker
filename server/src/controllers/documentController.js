import Document from "../models/Document.js";

/**
 * GET /api/documents
 * Lista documentos con paginación y búsqueda
 */
export const listDocuments = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      sort = "-createdAt",
      q = ""
    } = req.query;

    // Convertir a números
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);

    // Construir filtro de búsqueda
    const filter = q
      ? {
          $or: [
            { destinatario: { $regex: q, $options: "i" } },
            { rut: { $regex: q, $options: "i" } }
          ]
        }
      : {};

    // Calcular skip
    const skip = (pageNum - 1) * limitNum;

    // Obtener documentos y total
    const [data, total] = await Promise.all([
      Document.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(limitNum),
      Document.countDocuments(filter)
    ]);

    res.status(200).json({
      data,
      page: pageNum,
      limit: limitNum,
      total,
      totalPages: Math.ceil(total / limitNum)
    });
  } catch (error) {
    console.error("Error al listar documentos:", error);
    res.status(500).json({
      error: "Error al listar documentos",
      details: error.message
    });
  }
};

/**
 * POST /api/documents
 * Crea un nuevo documento
 */
export const createDocument = async (req, res) => {
  const maxRetries = 3;
  let attempt = 0;

  while (attempt < maxRetries) {
    try {
      const {
        destinatario,
        rut,
        direccion,
        ciudadDestinatario,
        giro,
        chofer,
        rutChofer,
        destino,
        ciudadDestino,
        centroDeNegocios,
        referencias
      } = req.body;

      // Validación de campos requeridos
      const requiredFields = {
        destinatario,
        rut,
        direccion,
        ciudadDestinatario,
        destino,
        ciudadDestino
      };

      for (const [field, value] of Object.entries(requiredFields)) {
        if (!value || value.trim() === "") {
          return res.status(400).json({ 
            error: `${field} es requerido` 
          });
        }
      }

      // Normalizar referencias: si no viene, setear a [{},{},{}]
      let referenciasNormalizadas = referencias || [{}, {}, {}];
      
      // Validar que sea un array
      if (!Array.isArray(referenciasNormalizadas)) {
        return res.status(400).json({
          error: "referencias debe ser un array"
        });
      }

      // Validar que no exceda 3 elementos
      if (referenciasNormalizadas.length > 3) {
        return res.status(400).json({
          error: "Se permiten como máximo 3 documentos de referencia"
        });
      }

      // Asegurar que tenga exactamente 3 elementos
      while (referenciasNormalizadas.length < 3) {
        referenciasNormalizadas.push({});
      }

      // Crear documento
      const document = await Document.create({
        destinatario,
        rut,
        direccion,
        ciudadDestinatario,
        giro,
        chofer,
        rutChofer,
        destino,
        ciudadDestino,
        centroDeNegocios,
        referencias: referenciasNormalizadas
      });

      return res.status(201).json(document);
    } catch (error) {
      // Manejo de error de duplicate key (E11000)
      if (error.code === 11000 && error.keyPattern?.docNumber) {
        attempt++;
        console.warn(`Colisión de docNumber, reintento ${attempt}/${maxRetries}`);
        
        if (attempt >= maxRetries) {
          return res.status(500).json({
            error: "Error al asignar número de documento después de varios intentos",
            details: error.message
          });
        }
        
        // Esperar un poco antes de reintentar
        await new Promise(resolve => setTimeout(resolve, 100));
        continue;
      }

      // Otro tipo de error
      console.error("Error al crear documento:", error);
      return res.status(500).json({ 
        error: "Error al crear el documento",
        details: error.message 
      });
    }
  }
};

/**
 * GET /api/documents/:id
 * Obtiene un documento por ID
 */
export const getDocumentById = async (req, res) => {
  try {
    const { id } = req.params;

    const document = await Document.findById(id);

    if (!document) {
      return res.status(404).json({ 
        error: "Documento no encontrado" 
      });
    }

    res.status(200).json(document);
  } catch (error) {
    console.error("Error al obtener documento:", error);
    
    // Error de ID inválido de MongoDB
    if (error.name === "CastError") {
      return res.status(400).json({ 
        error: "ID de documento inválido" 
      });
    }

    res.status(500).json({ 
      error: "Error al obtener el documento",
      details: error.message 
    });
  }
};
