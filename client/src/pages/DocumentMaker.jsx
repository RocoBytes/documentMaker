import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getApiUrl } from "../config/api";

export default function DocumentMaker() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    destinatario: "",
    rut: "",
    direccion: "",
    ciudadDestinatario: "",
    giro: "",
    chofer: "",
    rutChofer: "",
    destino: "",
    ciudadDestino: "",
    centroDeNegocios: ""
  });

  const [referencias, setReferencias] = useState([
    { documentoReferencia: "", nroDocto: "", fecha: "", nroSAP: "" },
    { documentoReferencia: "", nroDocto: "", fecha: "", nroSAP: "" },
    { documentoReferencia: "", nroDocto: "", fecha: "", nroSAP: "" }
  ]);

  const [items, setItems] = useState([
    { codigoItem: "", detalle: "", cantidad: 0 }
  ]);

  const [observaciones, setObservaciones] = useState("");

  // Calcular total en tiempo real
  const total = items.reduce((acc, item) => acc + (Number(item.cantidad) || 0), 0);

  const [status, setStatus] = useState({
    type: "", // 'success' | 'error' | ''
    message: "",
    documentId: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Manejar cambios en la tabla de referencias
  const handleReferenciaChange = (index, field, value) => {
    setReferencias(prev => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        [field]: value
      };
      return updated;
    });
  };

  // Manejar cambios en la tabla de items
  const updateItem = (idx, field, value) => {
    setItems(prev => {
      const next = [...prev];
      next[idx] = {
        ...next[idx],
        [field]: field === "cantidad" ? (value === "" ? 0 : Number(value)) : value
      };
      return next;
    });
  };

  // Agregar fila de item
  const addRow = () => {
    setItems(prev => [...prev, { codigoItem: "", detalle: "", cantidad: 0 }]);
  };

  // Eliminar última fila de item (mantener al menos 1)
  const removeRow = () => {
    setItems(prev => prev.length > 1 ? prev.slice(0, -1) : prev);
  };

  // Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: "", message: "", documentId: "" });

    try {
      const response = await fetch(getApiUrl("/api/documents"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...formData,
          referencias,
          items,
          observaciones
        })
      });

      const data = await response.json();

      if (response.ok) {
        // Éxito - Mostrar mensaje breve y redirigir a vista de impresión
        setStatus({
          type: "success",
          message: "✅ Documento guardado correctamente. Redirigiendo...",
          documentId: data._id
        });

        // Redirigir a la vista de impresión después de 1 segundo
        setTimeout(() => {
          navigate(`/documents/${data._id}/print`);
        }, 1000);
      } else {
        // Error del servidor
        setStatus({
          type: "error",
          message: `❌ Error: ${data.error || "No se pudo guardar el documento"}`,
          documentId: ""
        });
      }
    } catch (error) {
      setStatus({
        type: "error",
        message: `❌ Error de conexión: ${error.message}`,
        documentId: ""
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>📄 Document Maker</h1>
        <p style={styles.subtitle}>
          Crea guías de despacho de forma rápida y sencilla
        </p>

        {/* Mensajes de estado */}
        {status.message && (
          <div style={{
            ...styles.message,
            backgroundColor: status.type === "success" ? "#d4edda" : "#f8d7da",
            color: status.type === "success" ? "#155724" : "#721c24",
            borderColor: status.type === "success" ? "#c3e6cb" : "#f5c6cb"
          }}>
            <p style={{ margin: 0 }}>{status.message}</p>
            {status.documentId && (
              <small style={{ display: "block", marginTop: "8px" }}>
                ID: {status.documentId}
              </small>
            )}
          </div>
        )}

        {/* Formulario */}
        <form onSubmit={handleSubmit} style={styles.form}>
          {/* Sección Destinatario */}
          <fieldset style={styles.fieldset}>
            <legend style={styles.legend}>📍 Información del Destinatario</legend>
            
            <div style={styles.formGroup}>
              <label htmlFor="destinatario" style={styles.label}>
                Destinatario *
              </label>
              <input
                type="text"
                id="destinatario"
                name="destinatario"
                value={formData.destinatario}
                onChange={handleChange}
                required
                style={styles.input}
                placeholder="Nombre del destinatario"
              />
            </div>

            <div style={styles.formRow}>
              <div style={styles.formGroup}>
                <label htmlFor="rut" style={styles.label}>
                  RUT *
                </label>
                <input
                  type="text"
                  id="rut"
                  name="rut"
                  value={formData.rut}
                  onChange={handleChange}
                  required
                  style={styles.input}
                  placeholder="12.345.678-9"
                />
              </div>

              <div style={styles.formGroup}>
                <label htmlFor="giro" style={styles.label}>
                  Giro
                </label>
                <input
                  type="text"
                  id="giro"
                  name="giro"
                  value={formData.giro}
                  onChange={handleChange}
                  style={styles.input}
                  placeholder="Comercio, servicios, etc."
                />
              </div>
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="direccion" style={styles.label}>
                Dirección *
              </label>
              <input
                type="text"
                id="direccion"
                name="direccion"
                value={formData.direccion}
                onChange={handleChange}
                required
                style={styles.input}
                placeholder="Calle, número, depto."
              />
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="ciudadDestinatario" style={styles.label}>
                Ciudad *
              </label>
              <input
                type="text"
                id="ciudadDestinatario"
                name="ciudadDestinatario"
                value={formData.ciudadDestinatario}
                onChange={handleChange}
                required
                style={styles.input}
                placeholder="Ciudad del destinatario"
              />
            </div>
          </fieldset>

          {/* Sección Transporte */}
          <fieldset style={styles.fieldset}>
            <legend style={styles.legend}>🚚 Información del Transporte</legend>

            <div style={styles.formRow}>
              <div style={styles.formGroup}>
                <label htmlFor="chofer" style={styles.label}>
                  Chofer
                </label>
                <input
                  type="text"
                  id="chofer"
                  name="chofer"
                  value={formData.chofer}
                  onChange={handleChange}
                  style={styles.input}
                  placeholder="Nombre del chofer"
                />
              </div>

              <div style={styles.formGroup}>
                <label htmlFor="rutChofer" style={styles.label}>
                  RUT Chofer
                </label>
                <input
                  type="text"
                  id="rutChofer"
                  name="rutChofer"
                  value={formData.rutChofer}
                  onChange={handleChange}
                  style={styles.input}
                  placeholder="12.345.678-9"
                />
              </div>
            </div>
          </fieldset>

          {/* Sección Destino */}
          <fieldset style={styles.fieldset}>
            <legend style={styles.legend}>🎯 Información del Destino</legend>

            <div style={styles.formGroup}>
              <label htmlFor="destino" style={styles.label}>
                Destino *
              </label>
              <input
                type="text"
                id="destino"
                name="destino"
                value={formData.destino}
                onChange={handleChange}
                required
                style={styles.input}
                placeholder="Dirección de destino"
              />
            </div>

            <div style={styles.formRow}>
              <div style={styles.formGroup}>
                <label htmlFor="ciudadDestino" style={styles.label}>
                  Ciudad *
                </label>
                <input
                  type="text"
                  id="ciudadDestino"
                  name="ciudadDestino"
                  value={formData.ciudadDestino}
                  onChange={handleChange}
                  required
                  style={styles.input}
                  placeholder="Ciudad de destino"
                />
              </div>

              <div style={styles.formGroup}>
                <label htmlFor="centroDeNegocios" style={styles.label}>
                  Proyecto
                </label>
                <input
                  type="text"
                  id="centroDeNegocios"
                  name="centroDeNegocios"
                  value={formData.centroDeNegocios}
                  onChange={handleChange}
                  style={styles.input}
                  placeholder="Nombre del proyecto"
                />
              </div>
            </div>
          </fieldset>

          {/* Sección Documentos de Referencia */}
          <fieldset style={styles.fieldset}>
            <legend style={styles.legend}>📋 Documentos de Referencia</legend>
            
            <div style={styles.tableContainer}>
              <table style={styles.table}>
                <thead>
                  <tr style={styles.tableHeaderRow}>
                    <th style={styles.tableHeader}>Documento de Referencia</th>
                    <th style={styles.tableHeader}>Nro. Docto</th>
                    <th style={styles.tableHeader}>Fecha</th>
                    <th style={styles.tableHeader}>Nro. SAP</th>
                  </tr>
                </thead>
                <tbody>
                  {referencias.map((ref, index) => (
                    <tr key={index} style={styles.tableRow}>
                      <td style={styles.tableCell}>
                        <input
                          type="text"
                          value={ref.documentoReferencia}
                          onChange={(e) => handleReferenciaChange(index, 'documentoReferencia', e.target.value)}
                          style={styles.tableInput}
                          placeholder="Ej: Factura"
                        />
                      </td>
                      <td style={styles.tableCell}>
                        <input
                          type="text"
                          value={ref.nroDocto}
                          onChange={(e) => handleReferenciaChange(index, 'nroDocto', e.target.value)}
                          style={styles.tableInput}
                          placeholder="Ej: 12345"
                        />
                      </td>
                      <td style={styles.tableCell}>
                        <input
                          type="date"
                          value={ref.fecha}
                          onChange={(e) => handleReferenciaChange(index, 'fecha', e.target.value)}
                          style={styles.tableInput}
                        />
                      </td>
                      <td style={styles.tableCell}>
                        <input
                          type="text"
                          value={ref.nroSAP}
                          onChange={(e) => handleReferenciaChange(index, 'nroSAP', e.target.value)}
                          style={styles.tableInput}
                          placeholder="Ej: SAP-001"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <p style={styles.tableNote}>
              <small>💡 Máximo 3 documentos de referencia (todos los campos son opcionales)</small>
            </p>
          </fieldset>

          {/* Sección Detalle (Items) */}
          <fieldset style={styles.fieldset}>
            <legend style={styles.legend}>📦 Detalle</legend>
            
            <div style={styles.itemsTableContainer}>
              {/* Encabezados */}
              <div style={styles.itemsGrid}>
                <div style={styles.itemsHeaderCell}><strong>Código ITEM</strong></div>
                <div style={styles.itemsHeaderCell}><strong>Detalle</strong></div>
                <div style={styles.itemsHeaderCell}><strong>Cantidad</strong></div>
                <div style={styles.itemsHeaderCell}><strong>Acciones</strong></div>
              </div>

              {/* Filas dinámicas */}
              {items.map((item, idx) => (
                <div key={idx} style={styles.itemsGrid}>
                  <input
                    type="text"
                    value={item.codigoItem}
                    onChange={(e) => updateItem(idx, "codigoItem", e.target.value)}
                    placeholder="Ej: ITM-001"
                    style={styles.itemInput}
                  />
                  <input
                    type="text"
                    value={item.detalle}
                    onChange={(e) => updateItem(idx, "detalle", e.target.value)}
                    placeholder="Descripción del ítem"
                    style={styles.itemInput}
                  />
                  <input
                    type="number"
                    min="0"
                    step="1"
                    value={item.cantidad}
                    onChange={(e) => updateItem(idx, "cantidad", e.target.value)}
                    style={styles.itemInput}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (items.length > 1) {
                        setItems(prev => prev.filter((_, i) => i !== idx));
                      }
                    }}
                    disabled={items.length <= 1}
                    style={{
                      ...styles.deleteRowButton,
                      opacity: items.length <= 1 ? 0.3 : 1,
                      cursor: items.length <= 1 ? "not-allowed" : "pointer"
                    }}
                  >
                    🗑️
                  </button>
                </div>
              ))}

              {/* Total */}
              <div style={styles.totalRow}>
                <div></div>
                <div style={styles.totalLabel}><strong>Total cantidad:</strong></div>
                <div style={styles.totalValue}><strong>{total}</strong></div>
                <div></div>
              </div>
            </div>

            {/* Botón agregar fila */}
            <div style={styles.itemsActions}>
              <button type="button" onClick={addRow} style={styles.addRowButton}>
                ➕ Agregar fila
              </button>
              <button type="button" onClick={removeRow} style={styles.removeRowButton}>
                ➖ Eliminar última
              </button>
            </div>
          </fieldset>

          {/* Sección Observaciones */}
          <fieldset style={styles.fieldset}>
            <legend style={styles.legend}>📝 Observaciones</legend>
            
            <div style={styles.formGroup}>
              <label htmlFor="observaciones" style={styles.label}>
                Notas adicionales
              </label>
              <textarea
                id="observaciones"
                value={observaciones}
                onChange={(e) => setObservaciones(e.target.value)}
                rows={4}
                placeholder="Ingrese cualquier observación o nota adicional..."
                style={styles.textarea}
              />
            </div>
          </fieldset>

          {/* Botón de envío */}
          <button 
            type="submit" 
            disabled={isSubmitting}
            style={{
              ...styles.submitButton,
              opacity: isSubmitting ? 0.6 : 1,
              cursor: isSubmitting ? "not-allowed" : "pointer"
            }}
          >
            {isSubmitting ? "Guardando..." : "💾 Guardar Documento"}
          </button>
        </form>

        {/* Nota */}
        <p style={styles.note}>
          <small>* Campos requeridos</small>
        </p>
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
    maxWidth: "800px",
    margin: "0 auto",
    backgroundColor: "white",
    borderRadius: "12px",
    padding: "40px",
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)"
  },
  title: {
    margin: "0 0 10px 0",
    fontSize: "2rem",
    fontWeight: "bold",
    color: "#333",
    textAlign: "center"
  },
  subtitle: {
    margin: "0 0 30px 0",
    fontSize: "1rem",
    color: "#666",
    textAlign: "center"
  },
  message: {
    padding: "15px",
    borderRadius: "8px",
    marginBottom: "20px",
    border: "1px solid"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "25px"
  },
  fieldset: {
    border: "2px solid #e0e0e0",
    borderRadius: "8px",
    padding: "20px",
    margin: "0"
  },
  legend: {
    fontSize: "1.1rem",
    fontWeight: "600",
    color: "#667eea",
    padding: "0 10px"
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    flex: 1
  },
  formRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "15px"
  },
  label: {
    fontSize: "0.95rem",
    fontWeight: "500",
    color: "#444"
  },
  input: {
    padding: "12px 16px",
    fontSize: "1rem",
    border: "2px solid #ddd",
    borderRadius: "8px",
    outline: "none",
    transition: "border-color 0.3s",
    fontFamily: "inherit"
  },
  submitButton: {
    padding: "16px 32px",
    fontSize: "1.1rem",
    fontWeight: "600",
    backgroundColor: "#667eea",
    color: "white",
    border: "none",
    borderRadius: "8px",
    transition: "background-color 0.3s",
    marginTop: "10px"
  },
  note: {
    marginTop: "20px",
    textAlign: "center",
    color: "#888"
  },
  tableContainer: {
    overflowX: "auto",
    marginTop: "10px"
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "0.95rem"
  },
  tableHeaderRow: {
    backgroundColor: "#f8f9fa"
  },
  tableHeader: {
    padding: "12px 8px",
    textAlign: "left",
    fontWeight: "600",
    color: "#555",
    borderBottom: "2px solid #dee2e6",
    fontSize: "0.9rem"
  },
  tableRow: {
    borderBottom: "1px solid #e0e0e0"
  },
  tableCell: {
    padding: "8px"
  },
  tableInput: {
    width: "100%",
    padding: "8px 10px",
    fontSize: "0.95rem",
    border: "1px solid #ddd",
    borderRadius: "6px",
    outline: "none",
    fontFamily: "inherit",
    boxSizing: "border-box"
  },
  tableNote: {
    marginTop: "12px",
    marginBottom: "0",
    color: "#666",
    fontStyle: "italic"
  },
  itemsTableContainer: {
    marginTop: "10px"
  },
  itemsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 4fr 1fr auto",
    gap: "8px",
    alignItems: "center",
    marginBottom: "8px"
  },
  itemsHeaderCell: {
    padding: "8px",
    backgroundColor: "#f8f9fa",
    borderBottom: "2px solid #dee2e6",
    fontSize: "0.9rem",
    color: "#555"
  },
  itemInput: {
    width: "100%",
    padding: "8px 10px",
    fontSize: "0.95rem",
    border: "1px solid #ddd",
    borderRadius: "6px",
    outline: "none",
    fontFamily: "inherit",
    boxSizing: "border-box"
  },
  deleteRowButton: {
    padding: "8px 12px",
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "1rem",
    transition: "background-color 0.3s"
  },
  totalRow: {
    display: "grid",
    gridTemplateColumns: "1fr 4fr 1fr auto",
    gap: "8px",
    alignItems: "center",
    marginTop: "12px",
    paddingTop: "12px",
    borderTop: "2px solid #667eea"
  },
  totalLabel: {
    textAlign: "right",
    color: "#667eea",
    fontSize: "1rem"
  },
  totalValue: {
    textAlign: "center",
    color: "#667eea",
    fontSize: "1.2rem",
    backgroundColor: "#f0f0ff",
    padding: "8px",
    borderRadius: "6px"
  },
  itemsActions: {
    display: "flex",
    gap: "10px",
    marginTop: "15px"
  },
  addRowButton: {
    padding: "10px 20px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "0.95rem",
    transition: "background-color 0.3s"
  },
  removeRowButton: {
    padding: "10px 20px",
    backgroundColor: "#6c757d",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "0.95rem",
    transition: "background-color 0.3s"
  },
  textarea: {
    width: "100%",
    padding: "12px 16px",
    fontSize: "1rem",
    border: "2px solid #ddd",
    borderRadius: "8px",
    outline: "none",
    fontFamily: "inherit",
    resize: "vertical",
    boxSizing: "border-box",
    transition: "border-color 0.3s"
  }
};
