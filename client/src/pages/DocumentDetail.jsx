import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import "../styles/print.css";

/**
 * Formatea una fecha ISO a formato legible
 */
const formatDate = (isoString) => {
  if (!isoString) return "N/A";
  const date = new Date(isoString);
  return date.toLocaleString("es-CL", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function DocumentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [document, setDocument] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDocument = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/documents/${id}`);

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Documento no encontrado");
          }
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        setDocument(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDocument();
  }, [id]);

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <div style={styles.loading}>
            <p>⏳ Cargando documento...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <div style={styles.error}>
            <h2>❌ Error</h2>
            <p>{error}</p>
            <div style={styles.actions}>
              <button onClick={() => navigate(-1)} style={styles.backButton}>
                ← Volver
              </button>
              <Link to="/documents" style={styles.listButton}>
                📋 Ver listado
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!document) {
    return null;
  }

  // Función para imprimir
  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* Botones de acción - No se imprimen */}
        <div className="no-print" style={styles.actions}>
          <button onClick={() => navigate(-1)} style={styles.backButton}>
            ← Volver
          </button>
          <Link to="/documents" style={styles.listButton}>
            📋 Ver listado
          </Link>
          <button onClick={handlePrint} style={styles.printButton}>
            🖨️ Imprimir
          </button>
        </div>

        {/* Contenedor imprimible */}
        <div className="print-container">
          {/* Encabezado para impresión */}
          <div className="print-header">
            <img 
              src="http://localhost:4000/uploads/logo.png" 
              alt="Logo" 
              className="print-logo"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            <div className="print-company-info">
              <h1 className="print-company-name">Cablex Latam SPA.</h1>
              <p className="print-company-details">
                RUT: 77.967.372-3 | Dirección: Av. Lo Espejo 01565 Oficina 1222 Calle 12 Sur<br />
                Email:intercambio.cablexlatam@docele.cl
              </p>
            </div>
            <div className="print-doc-number">
              <div>GUÍA DE DESPACHO</div>
              <div>N° {document.docNumber}</div>
            </div>
          </div>

        {/* Sección Destinatario */}
        <section className="print-section" style={styles.section}>
          <h2 className="print-section-title" style={styles.sectionTitle}>📍 Información del Destinatario</h2>
          <div className="print-field-grid" style={styles.grid}>
            <div className="print-field" style={styles.field}>
              <span className="print-field-label" style={styles.fieldLabel}>Destinatario:</span>
              <span className="print-field-value" style={styles.fieldValue}>{document.destinatario}</span>
            </div>
            <div style={styles.field}>
              <span style={styles.fieldLabel}>RUT:</span>
              <span style={styles.fieldValue}>{document.rut}</span>
            </div>
            <div style={styles.field}>
              <span style={styles.fieldLabel}>Dirección:</span>
              <span style={styles.fieldValue}>{document.direccion}</span>
            </div>
            <div style={styles.field}>
              <span style={styles.fieldLabel}>Ciudad:</span>
              <span style={styles.fieldValue}>{document.ciudadDestinatario}</span>
            </div>
            {document.giro && (
              <div style={styles.field}>
                <span style={styles.fieldLabel}>Giro:</span>
                <span style={styles.fieldValue}>{document.giro}</span>
              </div>
            )}
          </div>
        </section>

        {/* Sección Transporte */}
        {(document.chofer || document.rutChofer) && (
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>🚚 Información del Transporte</h2>
            <div style={styles.grid}>
              {document.chofer && (
                <div style={styles.field}>
                  <span style={styles.fieldLabel}>Chofer:</span>
                  <span style={styles.fieldValue}>{document.chofer}</span>
                </div>
              )}
              {document.rutChofer && (
                <div style={styles.field}>
                  <span style={styles.fieldLabel}>RUT Chofer:</span>
                  <span style={styles.fieldValue}>{document.rutChofer}</span>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Sección Destino */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>🎯 Información del Destino</h2>
          <div style={styles.grid}>
            <div style={styles.field}>
              <span style={styles.fieldLabel}>Destino:</span>
              <span style={styles.fieldValue}>{document.destino}</span>
            </div>
            <div style={styles.field}>
              <span style={styles.fieldLabel}>Ciudad:</span>
              <span style={styles.fieldValue}>{document.ciudadDestino}</span>
            </div>
            {document.centroDeNegocios && (
              <div style={styles.field}>
                <span style={styles.fieldLabel}>Centro de Negocios:</span>
                <span style={styles.fieldValue}>{document.centroDeNegocios}</span>
              </div>
            )}
          </div>
        </section>

        {/* Sección Documentos de Referencia */}
        {document.referencias && document.referencias.length > 0 && (
          <section className="print-section" style={styles.section}>
            <h2 className="print-section-title" style={styles.sectionTitle}>📋 Documentos de Referencia</h2>
            <div style={styles.tableContainer}>
              <table className="print-table" style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>#</th>
                    <th style={styles.th}>Documento de Referencia</th>
                    <th style={styles.th}>Nro. Docto</th>
                    <th style={styles.th}>Fecha</th>
                    <th style={styles.th}>Nro. SAP</th>
                  </tr>
                </thead>
                <tbody>
                  {document.referencias.map((ref, index) => {
                    // Verificar si la fila tiene al menos un campo lleno
                    const hasData = ref.documentoReferencia || ref.nroDocto || ref.fecha || ref.nroSAP;
                    
                    return (
                      <tr 
                        key={index} 
                        style={{
                          ...styles.tr,
                          opacity: hasData ? 1 : 0.4
                        }}
                      >
                        <td style={styles.td}>{index + 1}</td>
                        <td style={styles.td}>{ref.documentoReferencia || "-"}</td>
                        <td style={styles.td}>{ref.nroDocto || "-"}</td>
                        <td style={styles.td}>{ref.fecha || "-"}</td>
                        <td style={styles.td}>{ref.nroSAP || "-"}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Sección Detalle (Items) */}
        {document.items && document.items.length > 0 && (
          <section className="print-section" style={styles.section}>
            <h2 className="print-section-title" style={styles.sectionTitle}>📦 Detalle</h2>
            <div style={styles.tableContainer}>
              <table className="print-table" style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>#</th>
                    <th style={styles.th}>Código ITEM</th>
                    <th style={styles.th}>Detalle</th>
                    <th style={styles.th}>Cantidad</th>
                  </tr>
                </thead>
                <tbody>
                  {document.items.map((item, index) => (
                    <tr key={index} style={styles.tr}>
                      <td style={styles.td}>{index + 1}</td>
                      <td style={styles.td}>{item.codigoItem || "-"}</td>
                      <td style={styles.td}>{item.detalle || "-"}</td>
                      <td style={styles.td}>{item.cantidad}</td>
                    </tr>
                  ))}
                  {/* Fila de Total */}
                  <tr className="total-row" style={styles.totalRow}>
                    <td colSpan="3" style={styles.totalCell}>
                      <strong>Total cantidad:</strong>
                    </td>
                    <td style={styles.totalValueCell}>
                      <strong>{document.totalCantidad || 0}</strong>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Sección Observaciones */}
        {document.observaciones && (
          <section className="print-section" style={styles.section}>
            <h2 className="print-section-title" style={styles.sectionTitle}>📝 Observaciones</h2>
            <div className="print-observations" style={styles.observacionesBox}>
              {document.observaciones}
            </div>
          </section>
        )}

        {/* Metadata */}
        <section className="print-metadata" style={styles.metadata}>
          <div style={styles.metadataItem}>
            <span style={styles.metadataLabel}>🆔 ID:</span>
            <code style={styles.metadataValue}>{document._id}</code>
          </div>
          <div style={styles.metadataItem}>
            <span style={styles.metadataLabel}>📅 Creado:</span>
            <span style={styles.metadataValue}>
              {formatDate(document.createdAt)}
            </span>
          </div>
          <div style={styles.metadataItem}>
            <span style={styles.metadataLabel}>🔄 Actualizado:</span>
            <span style={styles.metadataValue}>
              {formatDate(document.updatedAt)}
            </span>
          </div>
        </section>
        </div>
        {/* Fin contenedor imprimible */}
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
    fontFamily: "system-ui, -apple-system, sans-serif",
  },
  card: {
    maxWidth: "900px",
    margin: "0 auto",
    backgroundColor: "white",
    borderRadius: "12px",
    padding: "40px",
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
    flexWrap: "wrap",
    gap: "15px",
    paddingBottom: "20px",
    borderBottom: "2px solid #eee",
  },
  title: {
    margin: 0,
    fontSize: "2rem",
    fontWeight: "bold",
    color: "#333",
  },
  headerActions: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
  },
  backButton: {
    padding: "10px 20px",
    backgroundColor: "#6c757d",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontWeight: "600",
    cursor: "pointer",
    textDecoration: "none",
    transition: "background-color 0.3s",
  },
  listButton: {
    padding: "10px 20px",
    backgroundColor: "#667eea",
    color: "white",
    textDecoration: "none",
    borderRadius: "6px",
    fontWeight: "600",
    transition: "background-color 0.3s",
    display: "inline-block",
  },
  printButton: {
    padding: "10px 20px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontWeight: "600",
    cursor: "pointer",
    textDecoration: "none",
    transition: "background-color 0.3s",
  },
  actions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
    marginBottom: "20px",
    flexWrap: "wrap",
  },
  section: {
    marginBottom: "30px",
    padding: "20px",
    backgroundColor: "#f8f9fa",
    borderRadius: "8px",
    border: "1px solid #dee2e6",
  },
  sectionTitle: {
    margin: "0 0 20px 0",
    fontSize: "1.3rem",
    fontWeight: "600",
    color: "#667eea",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "15px",
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  },
  fieldLabel: {
    fontSize: "0.85rem",
    fontWeight: "600",
    color: "#666",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  fieldValue: {
    fontSize: "1rem",
    color: "#333",
    fontWeight: "500",
  },
  metadata: {
    marginTop: "30px",
    padding: "20px",
    backgroundColor: "#f0f0f0",
    borderRadius: "8px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  metadataItem: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    flexWrap: "wrap",
  },
  metadataLabel: {
    fontSize: "0.9rem",
    fontWeight: "600",
    color: "#555",
  },
  metadataValue: {
    fontSize: "0.9rem",
    color: "#333",
  },
  loading: {
    textAlign: "center",
    padding: "60px 20px",
    fontSize: "1.2rem",
    color: "#667eea",
  },
  error: {
    textAlign: "center",
    padding: "40px 20px",
  },
  actions: {
    display: "flex",
    justifyContent: "center",
    gap: "15px",
    marginTop: "20px",
    flexWrap: "wrap",
  },
  tableContainer: {
    overflowX: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "0.95rem",
  },
  th: {
    backgroundColor: "#667eea",
    color: "white",
    padding: "12px",
    textAlign: "left",
    fontWeight: "600",
    fontSize: "0.9rem",
  },
  tr: {
    borderBottom: "1px solid #dee2e6",
  },
  td: {
    padding: "12px",
    color: "#333",
  },
  totalRow: {
    borderTop: "2px solid #667eea",
    backgroundColor: "#f0f0ff",
  },
  totalCell: {
    padding: "12px",
    textAlign: "right",
    color: "#667eea",
    fontSize: "1rem",
  },
  totalValueCell: {
    padding: "12px",
    textAlign: "center",
    color: "#667eea",
    fontSize: "1.1rem",
  },
  observacionesBox: {
    padding: "15px",
    backgroundColor: "#f8f9fa",
    borderRadius: "8px",
    border: "1px solid #dee2e6",
    color: "#333",
    fontSize: "1rem",
    lineHeight: "1.6",
    whiteSpace: "pre-wrap",
  },
};
