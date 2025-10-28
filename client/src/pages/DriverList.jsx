import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getApiUrl } from "../config/api";

export default function DriverList() {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    chofer: "",
    rutChofer: ""
  });

  // Fetch choferes
  const fetchDrivers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(getApiUrl("/api/drivers"));
      if (!res.ok) throw new Error("Error al cargar choferes");
      const data = await res.json();
      setDrivers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  // Manejar submit del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const url = editingId 
        ? getApiUrl(`/api/drivers/${editingId}`)
        : getApiUrl("/api/drivers");
      
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Error al guardar chofer");
      }

      // Limpiar formulario y recargar lista
      setForm({ chofer: "", rutChofer: "" });
      setShowForm(false);
      setEditingId(null);
      fetchDrivers();
      
      alert(editingId ? "✅ Chofer actualizado" : "✅ Chofer creado");
    } catch (err) {
      setError(err.message);
      alert("❌ " + err.message);
    }
  };

  // Eliminar chofer
  const handleDelete = async (id, nombre) => {
    if (!confirm(`¿Eliminar chofer "${nombre}"?`)) return;

    try {
      const res = await fetch(getApiUrl(`/api/drivers/${id}`), {
        method: "DELETE"
      });

      if (!res.ok) throw new Error("Error al eliminar");

      fetchDrivers();
      alert("✅ Chofer eliminado");
    } catch (err) {
      alert("❌ " + err.message);
    }
  };

  // Editar chofer
  const handleEdit = (driver) => {
    setForm({
      chofer: driver.chofer,
      rutChofer: driver.rutChofer
    });
    setEditingId(driver._id);
    setShowForm(true);
  };

  // Cancelar edición
  const handleCancel = () => {
    setForm({ chofer: "", rutChofer: "" });
    setEditingId(null);
    setShowForm(false);
    setError(null);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* Header */}
        <div style={styles.header}>
          <h1 style={styles.title}>🚚 Gestión de Choferes</h1>
          <div style={styles.headerButtons}>
            <Link to="/documents" style={styles.backButton}>
              ← Volver a Documentos
            </Link>
            {!showForm && (
              <button onClick={() => setShowForm(true)} style={styles.createButton}>
                ➕ Nuevo Chofer
              </button>
            )}
          </div>
        </div>

        {/* Formulario */}
        {showForm && (
          <div style={styles.formContainer}>
            <h2 style={styles.formTitle}>
              {editingId ? "✏️ Editar Chofer" : "➕ Nuevo Chofer"}
            </h2>
            
            {error && <div style={styles.errorMessage}>{error}</div>}

            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Nombre del Chofer *</label>
                  <input
                    type="text"
                    required
                    value={form.chofer}
                    onChange={e => setForm({ ...form, chofer: e.target.value })}
                    placeholder="Nombre completo del chofer"
                    style={styles.input}
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>RUT del Chofer *</label>
                  <input
                    type="text"
                    required
                    value={form.rutChofer}
                    onChange={e => setForm({ ...form, rutChofer: e.target.value })}
                    placeholder="12.345.678-9"
                    style={styles.input}
                  />
                </div>
              </div>

              <div style={styles.formActions}>
                <button type="button" onClick={handleCancel} style={styles.cancelButton}>
                  Cancelar
                </button>
                <button type="submit" style={styles.submitButton}>
                  {editingId ? "💾 Guardar Cambios" : "➕ Crear Chofer"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Lista de choferes */}
        <div style={styles.listContainer}>
          <h2 style={styles.listTitle}>
            Lista de Choferes ({drivers.length})
          </h2>

          {loading && <p style={styles.loading}>⏳ Cargando...</p>}

          {!loading && drivers.length === 0 && (
            <p style={styles.empty}>
              No hay choferes registrados. Crea uno para comenzar.
            </p>
          )}

          {!loading && drivers.length > 0 && (
            <div style={styles.tableContainer}>
              <table style={styles.table}>
                <thead>
                  <tr style={styles.tableHeaderRow}>
                    <th style={styles.th}>Nombre del Chofer</th>
                    <th style={styles.th}>RUT</th>
                    <th style={styles.th}>Fecha Creación</th>
                    <th style={styles.th}>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {drivers.map(driver => (
                    <tr key={driver._id} style={styles.tr}>
                      <td style={styles.td}>
                        <strong>{driver.chofer}</strong>
                      </td>
                      <td style={styles.td}>{driver.rutChofer}</td>
                      <td style={styles.td}>
                        {new Date(driver.createdAt).toLocaleDateString('es-CL')}
                      </td>
                      <td style={styles.tdActions}>
                        <button
                          onClick={() => handleEdit(driver)}
                          style={styles.editButton}
                          title="Editar"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => handleDelete(driver._id, driver.chofer)}
                          style={styles.deleteButton}
                          title="Eliminar"
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Estilos inline (iguales a RecipientList)
const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    padding: "40px 20px",
    fontFamily: "system-ui, -apple-system, sans-serif",
  },
  card: {
    maxWidth: "1000px",
    margin: "0 auto",
    backgroundColor: "white",
    borderRadius: "12px",
    padding: "30px",
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
    flexWrap: "wrap",
    gap: "15px",
  },
  title: {
    margin: 0,
    fontSize: "2rem",
    fontWeight: "bold",
    color: "#333",
  },
  headerButtons: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
  },
  backButton: {
    padding: "12px 24px",
    backgroundColor: "#6c757d",
    color: "white",
    textDecoration: "none",
    borderRadius: "8px",
    fontWeight: "600",
    border: "none",
    cursor: "pointer",
  },
  createButton: {
    padding: "12px 24px",
    backgroundColor: "#667eea",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontWeight: "600",
    cursor: "pointer",
    fontSize: "1rem",
  },
  formContainer: {
    backgroundColor: "#f8f9fa",
    padding: "25px",
    borderRadius: "8px",
    marginBottom: "30px",
    border: "2px solid #667eea",
  },
  formTitle: {
    margin: "0 0 20px 0",
    fontSize: "1.3rem",
    color: "#667eea",
  },
  errorMessage: {
    padding: "12px",
    backgroundColor: "#f8d7da",
    color: "#721c24",
    borderRadius: "6px",
    marginBottom: "15px",
    border: "1px solid #f5c6cb",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  formRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "15px",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  label: {
    fontSize: "0.9rem",
    fontWeight: "600",
    color: "#555",
  },
  input: {
    padding: "10px 14px",
    fontSize: "1rem",
    border: "2px solid #ddd",
    borderRadius: "6px",
    outline: "none",
    transition: "border-color 0.3s",
  },
  formActions: {
    display: "flex",
    gap: "10px",
    justifyContent: "flex-end",
    marginTop: "10px",
  },
  cancelButton: {
    padding: "10px 20px",
    backgroundColor: "#6c757d",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontWeight: "600",
    cursor: "pointer",
    fontSize: "1rem",
  },
  submitButton: {
    padding: "10px 20px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontWeight: "600",
    cursor: "pointer",
    fontSize: "1rem",
  },
  listContainer: {
    marginTop: "30px",
  },
  listTitle: {
    fontSize: "1.5rem",
    marginBottom: "20px",
    color: "#333",
  },
  loading: {
    textAlign: "center",
    padding: "40px",
    fontSize: "1.1rem",
    color: "#667eea",
  },
  empty: {
    textAlign: "center",
    padding: "40px",
    fontSize: "1rem",
    color: "#666",
    backgroundColor: "#f8f9fa",
    borderRadius: "8px",
  },
  tableContainer: {
    overflowX: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "0.95rem",
  },
  tableHeaderRow: {
    backgroundColor: "#667eea",
  },
  th: {
    padding: "12px",
    textAlign: "left",
    fontWeight: "600",
    color: "white",
    fontSize: "0.9rem",
  },
  tr: {
    borderBottom: "1px solid #dee2e6",
  },
  td: {
    padding: "12px",
    color: "#333",
  },
  tdActions: {
    padding: "12px",
    display: "flex",
    gap: "8px",
  },
  editButton: {
    padding: "6px 12px",
    backgroundColor: "#ffc107",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "1rem",
  },
  deleteButton: {
    padding: "6px 12px",
    backgroundColor: "#dc3545",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "1rem",
  },
};
