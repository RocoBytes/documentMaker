import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getApiUrl } from "../config/api";

export default function RecipientList() {
  const [recipients, setRecipients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    destinatario: "",
    rut: "",
    giro: "",
    direccion: "",
    ciudad: ""
  });

  // Fetch destinatarios
  const fetchRecipients = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(getApiUrl("/api/recipients"));
      if (!res.ok) throw new Error("Error al cargar destinatarios");
      const data = await res.json();
      setRecipients(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipients();
  }, []);

  // Manejar submit del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const url = editingId 
        ? getApiUrl(`/api/recipients/${editingId}`)
        : getApiUrl("/api/recipients");
      
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Error al guardar destinatario");
      }

      // Limpiar formulario y recargar lista
      setForm({ destinatario: "", rut: "", giro: "", direccion: "", ciudad: "" });
      setShowForm(false);
      setEditingId(null);
      fetchRecipients();
      
      alert(editingId ? "✅ Destinatario actualizado" : "✅ Destinatario creado");
    } catch (err) {
      setError(err.message);
      alert("❌ " + err.message);
    }
  };

  // Eliminar destinatario
  const handleDelete = async (id, nombre) => {
    if (!confirm(`¿Eliminar destinatario "${nombre}"?`)) return;

    try {
      const res = await fetch(getApiUrl(`/api/recipients/${id}`), {
        method: "DELETE"
      });

      if (!res.ok) throw new Error("Error al eliminar");

      fetchRecipients();
      alert("✅ Destinatario eliminado");
    } catch (err) {
      alert("❌ " + err.message);
    }
  };

  // Editar destinatario
  const handleEdit = (recipient) => {
    setForm({
      destinatario: recipient.destinatario,
      rut: recipient.rut,
      giro: recipient.giro,
      direccion: recipient.direccion,
      ciudad: recipient.ciudad
    });
    setEditingId(recipient._id);
    setShowForm(true);
  };

  // Cancelar edición
  const handleCancel = () => {
    setForm({ destinatario: "", rut: "", giro: "", direccion: "", ciudad: "" });
    setEditingId(null);
    setShowForm(false);
    setError(null);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* Header */}
        <div style={styles.header}>
          <h1 style={styles.title}>📇 Gestión de Destinatarios</h1>
          <div style={styles.headerButtons}>
            <Link to="/documents" style={styles.backButton}>
              ← Volver a Documentos
            </Link>
            {!showForm && (
              <button onClick={() => setShowForm(true)} style={styles.createButton}>
                ➕ Nuevo Destinatario
              </button>
            )}
          </div>
        </div>

        {/* Formulario */}
        {showForm && (
          <div style={styles.formContainer}>
            <h2 style={styles.formTitle}>
              {editingId ? "✏️ Editar Destinatario" : "➕ Nuevo Destinatario"}
            </h2>
            
            {error && <div style={styles.errorMessage}>{error}</div>}

            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Destinatario *</label>
                  <input
                    type="text"
                    required
                    value={form.destinatario}
                    onChange={e => setForm({ ...form, destinatario: e.target.value })}
                    placeholder="Nombre de la empresa o persona"
                    style={styles.input}
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>RUT *</label>
                  <input
                    type="text"
                    required
                    value={form.rut}
                    onChange={e => setForm({ ...form, rut: e.target.value })}
                    placeholder="12.345.678-9"
                    style={styles.input}
                  />
                </div>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Giro *</label>
                <input
                  type="text"
                  required
                  value={form.giro}
                  onChange={e => setForm({ ...form, giro: e.target.value })}
                  placeholder="Actividad comercial"
                  style={styles.input}
                />
              </div>

              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Dirección *</label>
                  <input
                    type="text"
                    required
                    value={form.direccion}
                    onChange={e => setForm({ ...form, direccion: e.target.value })}
                    placeholder="Calle y número"
                    style={styles.input}
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Ciudad *</label>
                  <input
                    type="text"
                    required
                    value={form.ciudad}
                    onChange={e => setForm({ ...form, ciudad: e.target.value })}
                    placeholder="Ciudad"
                    style={styles.input}
                  />
                </div>
              </div>

              <div style={styles.formActions}>
                <button type="button" onClick={handleCancel} style={styles.cancelButton}>
                  Cancelar
                </button>
                <button type="submit" style={styles.submitButton}>
                  {editingId ? "💾 Guardar Cambios" : "➕ Crear Destinatario"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Lista de destinatarios */}
        <div style={styles.listContainer}>
          <h2 style={styles.listTitle}>
            Lista de Destinatarios ({recipients.length})
          </h2>

          {loading && <p style={styles.loading}>⏳ Cargando...</p>}

          {!loading && recipients.length === 0 && (
            <p style={styles.empty}>
              No hay destinatarios registrados. Crea uno para comenzar.
            </p>
          )}

          {!loading && recipients.length > 0 && (
            <div style={styles.tableContainer}>
              <table style={styles.table}>
                <thead>
                  <tr style={styles.tableHeaderRow}>
                    <th style={styles.th}>Destinatario</th>
                    <th style={styles.th}>RUT</th>
                    <th style={styles.th}>Giro</th>
                    <th style={styles.th}>Dirección</th>
                    <th style={styles.th}>Ciudad</th>
                    <th style={styles.th}>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {recipients.map(recipient => (
                    <tr key={recipient._id} style={styles.tr}>
                      <td style={styles.td}>
                        <strong>{recipient.destinatario}</strong>
                      </td>
                      <td style={styles.td}>{recipient.rut}</td>
                      <td style={styles.td}>{recipient.giro}</td>
                      <td style={styles.td}>{recipient.direccion}</td>
                      <td style={styles.td}>{recipient.ciudad}</td>
                      <td style={styles.tdActions}>
                        <button
                          onClick={() => handleEdit(recipient)}
                          style={styles.editButton}
                          title="Editar"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => handleDelete(recipient._id, recipient.destinatario)}
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

// Estilos inline
const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    padding: "40px 20px",
    fontFamily: "system-ui, -apple-system, sans-serif",
  },
  card: {
    maxWidth: "1200px",
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
