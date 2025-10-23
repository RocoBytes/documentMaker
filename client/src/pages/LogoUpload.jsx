import { useState } from "react";
import { Link } from "react-router-dom";
import { getApiUrl, API_BASE_URL } from "../config/api";

export default function LogoUpload() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  // Cargar preview del logo actual al montar el componente
  useState(() => {
    const img = new Image();
    const logoUrl = API_BASE_URL ? `${API_BASE_URL}/uploads/logo.png` : "/uploads/logo.png";
    img.src = logoUrl + "?t=" + new Date().getTime();
    img.onload = () => setPreview(img.src);
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    
    if (!selectedFile) {
      setFile(null);
      return;
    }

    // Validar que sea PNG
    if (selectedFile.type !== "image/png") {
      setMessage({ type: "error", text: "Solo se permiten archivos PNG" });
      setFile(null);
      return;
    }

    // Validar tamaño (máx 2MB)
    if (selectedFile.size > 2 * 1024 * 1024) {
      setMessage({ type: "error", text: "El archivo es demasiado grande. Máximo 2MB." });
      setFile(null);
      return;
    }

    setFile(selectedFile);
    setMessage({ type: "", text: "" });
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      setMessage({ type: "error", text: "Por favor selecciona un archivo" });
      return;
    }

    setUploading(true);
    setMessage({ type: "", text: "" });

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(getApiUrl("/api/assets/logo"), {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ 
          type: "success", 
          text: "✅ Logo subido exitosamente" 
        });
        
        // Actualizar preview con timestamp para forzar recarga
        const logoUrl = API_BASE_URL ? `${API_BASE_URL}${data.url}` : data.url;
        setPreview(`${logoUrl}?t=${new Date().getTime()}`);
        setFile(null);
        
        // Resetear input file
        document.getElementById("fileInput").value = "";
      } else {
        setMessage({ 
          type: "error", 
          text: `❌ Error: ${data.error || "No se pudo subir el logo"}` 
        });
      }
    } catch (error) {
      setMessage({ 
        type: "error", 
        text: `❌ Error de conexión: ${error.message}` 
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.title}>🖼️ Administrador de Logo</h1>
          <Link to="/documents" style={styles.backButton}>
            ← Volver al listado
          </Link>
        </div>

        <p style={styles.description}>
          Sube el logo de tu empresa que aparecerá en las guías de despacho impresas.
          Solo se permiten archivos PNG de máximo 2MB.
        </p>

        {/* Preview del logo actual */}
        {preview && (
          <div style={styles.previewSection}>
            <h3 style={styles.subtitle}>Logo actual:</h3>
            <div style={styles.previewContainer}>
              <img 
                src={preview} 
                alt="Logo actual" 
                style={styles.previewImage}
                onError={() => setPreview(null)}
              />
            </div>
          </div>
        )}

        {/* Mensajes */}
        {message.text && (
          <div style={{
            ...styles.message,
            backgroundColor: message.type === "success" ? "#d4edda" : "#f8d7da",
            color: message.type === "success" ? "#155724" : "#721c24",
            borderColor: message.type === "success" ? "#c3e6cb" : "#f5c6cb"
          }}>
            {message.text}
          </div>
        )}

        {/* Formulario de upload */}
        <form onSubmit={handleUpload} style={styles.form}>
          <div style={styles.formGroup}>
            <label htmlFor="fileInput" style={styles.label}>
              Seleccionar nuevo logo (PNG):
            </label>
            <input
              type="file"
              id="fileInput"
              accept="image/png"
              onChange={handleFileChange}
              style={styles.fileInput}
            />
          </div>

          {file && (
            <div style={styles.fileInfo}>
              <p style={styles.fileInfoText}>
                📄 Archivo seleccionado: <strong>{file.name}</strong>
              </p>
              <p style={styles.fileInfoText}>
                📊 Tamaño: <strong>{(file.size / 1024).toFixed(2)} KB</strong>
              </p>
            </div>
          )}

          <button 
            type="submit" 
            disabled={!file || uploading}
            style={{
              ...styles.submitButton,
              opacity: (!file || uploading) ? 0.5 : 1,
              cursor: (!file || uploading) ? "not-allowed" : "pointer"
            }}
          >
            {uploading ? "Subiendo..." : "⬆️ Subir Logo"}
          </button>
        </form>

        {/* Instrucciones */}
        <div style={styles.instructions}>
          <h3 style={styles.subtitle}>📋 Instrucciones:</h3>
          <ol style={styles.list}>
            <li>Selecciona un archivo PNG (solo se aceptan archivos PNG)</li>
            <li>El tamaño máximo permitido es 2MB</li>
            <li>El logo se guardará y aparecerá en todas las guías de despacho</li>
            <li>Puedes reemplazar el logo subiendo uno nuevo</li>
            <li>Recomendación: usa un logo con fondo transparente</li>
          </ol>
        </div>

        {/* Nota técnica */}
        <div style={styles.note}>
          <small>
            <strong>Nota técnica:</strong> El logo se guarda en el servidor como <code>logo.png</code>.
            Si ya existe un logo, será reemplazado por el nuevo.
          </small>
        </div>
      </div>
    </div>
  );
}

// Estilos inline
const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    padding: "40px 20px",
    fontFamily: "system-ui, -apple-system, sans-serif"
  },
  card: {
    maxWidth: "700px",
    margin: "0 auto",
    backgroundColor: "white",
    borderRadius: "12px",
    padding: "40px",
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    flexWrap: "wrap",
    gap: "15px"
  },
  title: {
    margin: 0,
    fontSize: "2rem",
    fontWeight: "bold",
    color: "#333"
  },
  backButton: {
    padding: "10px 20px",
    backgroundColor: "#6c757d",
    color: "white",
    textDecoration: "none",
    borderRadius: "6px",
    fontWeight: "600",
    transition: "background-color 0.3s"
  },
  description: {
    fontSize: "1rem",
    color: "#666",
    marginBottom: "25px",
    lineHeight: "1.6"
  },
  subtitle: {
    fontSize: "1.2rem",
    fontWeight: "600",
    color: "#667eea",
    marginBottom: "15px"
  },
  previewSection: {
    marginBottom: "30px",
    padding: "20px",
    backgroundColor: "#f8f9fa",
    borderRadius: "8px",
    border: "1px solid #dee2e6"
  },
  previewContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    backgroundColor: "white",
    borderRadius: "8px",
    border: "2px dashed #ccc"
  },
  previewImage: {
    maxWidth: "200px",
    maxHeight: "120px",
    height: "auto"
  },
  message: {
    padding: "15px",
    borderRadius: "8px",
    marginBottom: "20px",
    border: "1px solid"
  },
  form: {
    marginBottom: "30px"
  },
  formGroup: {
    marginBottom: "20px"
  },
  label: {
    display: "block",
    fontSize: "1rem",
    fontWeight: "500",
    color: "#444",
    marginBottom: "10px"
  },
  fileInput: {
    width: "100%",
    padding: "12px",
    fontSize: "1rem",
    border: "2px solid #ddd",
    borderRadius: "8px",
    cursor: "pointer"
  },
  fileInfo: {
    padding: "15px",
    backgroundColor: "#e7f3ff",
    borderRadius: "8px",
    marginBottom: "20px",
    border: "1px solid #b3d9ff"
  },
  fileInfoText: {
    margin: "5px 0",
    fontSize: "0.95rem",
    color: "#333"
  },
  submitButton: {
    width: "100%",
    padding: "16px 32px",
    fontSize: "1.1rem",
    fontWeight: "600",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "8px",
    transition: "background-color 0.3s"
  },
  instructions: {
    padding: "20px",
    backgroundColor: "#fff8e1",
    borderRadius: "8px",
    marginBottom: "20px",
    border: "1px solid #ffe082"
  },
  list: {
    paddingLeft: "20px",
    lineHeight: "1.8",
    color: "#333"
  },
  note: {
    padding: "15px",
    backgroundColor: "#f0f0f0",
    borderRadius: "8px",
    color: "#666",
    fontSize: "0.9rem"
  }
};
