import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

/**
 * Formatea una fecha ISO a formato YYYY-MM-DD HH:mm
 */
const formatDate = (isoString) => {
  if (!isoString) return "N/A";
  const date = new Date(isoString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}`;
};

/**
 * Hook personalizado para debounce
 */
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default function DocumentsList() {
  // Estados para controles
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("-docNumber");
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  // Estados para datos
  const [documents, setDocuments] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  
  // Estados UI
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Debounce del query de búsqueda
  const debouncedSearchQuery = useDebounce(searchQuery, 400);

  // Fetch de documentos
  const fetchDocuments = async () => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        sort: sortOrder,
      });

      if (debouncedSearchQuery.trim()) {
        params.append("q", debouncedSearchQuery.trim());
      }

      const response = await fetch(`/api/documents?${params.toString()}`);

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();

      setDocuments(result.data || []);
      setTotal(result.total || 0);
      setTotalPages(result.totalPages || 0);
    } catch (err) {
      setError(err.message);
      setDocuments([]);
      setTotal(0);
      setTotalPages(0);
    } finally {
      setLoading(false);
    }
  };

  // Efecto para cargar documentos
  useEffect(() => {
    fetchDocuments();
  }, [page, limit, sortOrder, debouncedSearchQuery]);

  // Handlers para controles
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setPage(1); // Reiniciar a página 1 al buscar
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
    setPage(1);
  };

  const handleLimitChange = (e) => {
    setLimit(parseInt(e.target.value, 10));
    setPage(1);
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* Header */}
        <div style={styles.header}>
          <h1 style={styles.title}>📋 Listado de Documentos</h1>
          <Link to="/documents/new" style={styles.createButton}>
            ➕ Nuevo Documento
          </Link>
        </div>

        {/* Controles */}
        <div style={styles.controls}>
          {/* Búsqueda */}
          <div style={styles.controlGroup}>
            <label htmlFor="search" style={styles.label}>
              🔍 Buscar:
            </label>
            <input
              type="text"
              id="search"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Buscar por destinatario o RUT..."
              style={styles.input}
            />
          </div>

          {/* Ordenamiento */}
          <div style={styles.controlGroup}>
            <label htmlFor="sort" style={styles.label}>
              📊 Ordenar por:
            </label>
            <select
              id="sort"
              value={sortOrder}
              onChange={handleSortChange}
              style={styles.select}
            >
              <option value="-docNumber">N° Descendente (más reciente)</option>
              <option value="docNumber">N° Ascendente (más antiguo)</option>
              <option value="-createdAt">Fecha Descendente</option>
              <option value="createdAt">Fecha Ascendente</option>
            </select>
          </div>

          {/* Límite */}
          <div style={styles.controlGroup}>
            <label htmlFor="limit" style={styles.label}>
              📄 Mostrar:
            </label>
            <select
              id="limit"
              value={limit}
              onChange={handleLimitChange}
              style={styles.select}
            >
              <option value="5">5 por página</option>
              <option value="10">10 por página</option>
              <option value="20">20 por página</option>
            </select>
          </div>
        </div>

        {/* Estado de carga */}
        {loading && (
          <div style={styles.loading}>
            <p>⏳ Cargando documentos...</p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div style={styles.error}>
            <p>❌ Error: {error}</p>
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && documents.length === 0 && (
          <div style={styles.empty}>
            <p>📭 No hay documentos que mostrar</p>
            {searchQuery && <p>Intenta con otra búsqueda</p>}
          </div>
        )}

        {/* Tabla */}
        {!loading && !error && documents.length > 0 && (
          <>
            <div style={styles.tableContainer}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>N°</th>
                    <th style={styles.th}>Destinatario</th>
                    <th style={styles.th}>RUT</th>
                    <th style={styles.th}>Destino</th>
                    <th style={styles.th}>Ciudad Destino</th>
                    <th style={styles.th}>Referencias</th>
                    <th style={styles.th}>Ítems</th>
                    <th style={styles.th}>Total Cant.</th>
                    <th style={styles.th}>Creado</th>
                  </tr>
                </thead>
                <tbody>
                  {documents.map((doc) => {
                    // Contar referencias no vacías
                    const refCount = (doc.referencias || []).filter(ref => 
                      ref.documentoReferencia || ref.nroDocto || ref.fecha || ref.nroSAP
                    ).length;

                    // Contar ítems
                    const itemsCount = (doc.items || []).length;

                    return (
                      <tr key={doc._id} style={styles.tr}>
                        <td style={styles.td}>
                          <Link
                            to={`/documents/${doc._id}`}
                            style={styles.link}
                          >
                            {doc.docNumber}
                          </Link>
                        </td>
                        <td style={styles.td}>{doc.destinatario}</td>
                        <td style={styles.td}>{doc.rut}</td>
                        <td style={styles.td}>{doc.destino}</td>
                        <td style={styles.td}>{doc.ciudadDestino}</td>
                        <td style={styles.td}>
                          {refCount > 0 ? (
                            <span style={styles.badge}>{refCount}</span>
                          ) : (
                            <span style={styles.noBadge}>-</span>
                          )}
                        </td>
                        <td style={styles.td}>
                          {itemsCount > 0 ? (
                            <span style={styles.badgeSecondary}>{itemsCount}</span>
                          ) : (
                            <span style={styles.noBadge}>-</span>
                          )}
                        </td>
                        <td style={styles.td}>
                          <span style={styles.totalBadge}>{doc.totalCantidad || 0}</span>
                        </td>
                        <td style={styles.td}>{formatDate(doc.createdAt)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Paginación */}
            <div style={styles.pagination}>
              <button
                onClick={handlePreviousPage}
                disabled={page <= 1}
                style={{
                  ...styles.paginationButton,
                  opacity: page <= 1 ? 0.5 : 1,
                  cursor: page <= 1 ? "not-allowed" : "pointer",
                }}
                aria-label="Página anterior"
              >
                ← Anterior
              </button>

              <span style={styles.paginationInfo}>
                Página {page} de {totalPages} ({total} documentos)
              </span>

              <button
                onClick={handleNextPage}
                disabled={page >= totalPages}
                style={{
                  ...styles.paginationButton,
                  opacity: page >= totalPages ? 0.5 : 1,
                  cursor: page >= totalPages ? "not-allowed" : "pointer",
                }}
                aria-label="Página siguiente"
              >
                Siguiente →
              </button>
            </div>
          </>
        )}
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
  createButton: {
    padding: "12px 24px",
    backgroundColor: "#667eea",
    color: "white",
    textDecoration: "none",
    borderRadius: "8px",
    fontWeight: "600",
    transition: "background-color 0.3s",
  },
  controls: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
    marginBottom: "30px",
    padding: "20px",
    backgroundColor: "#f8f9fa",
    borderRadius: "8px",
  },
  controlGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  label: {
    fontSize: "0.9rem",
    fontWeight: "600",
    color: "#555",
  },
  input: {
    padding: "10px 12px",
    fontSize: "1rem",
    border: "2px solid #ddd",
    borderRadius: "6px",
    outline: "none",
    transition: "border-color 0.3s",
  },
  select: {
    padding: "10px 12px",
    fontSize: "1rem",
    border: "2px solid #ddd",
    borderRadius: "6px",
    outline: "none",
    backgroundColor: "white",
    cursor: "pointer",
  },
  loading: {
    textAlign: "center",
    padding: "40px",
    fontSize: "1.1rem",
    color: "#667eea",
  },
  error: {
    padding: "20px",
    backgroundColor: "#fee",
    color: "#c33",
    borderRadius: "8px",
    marginBottom: "20px",
  },
  empty: {
    textAlign: "center",
    padding: "60px 20px",
    fontSize: "1.1rem",
    color: "#888",
  },
  tableContainer: {
    overflowX: "auto",
    marginBottom: "30px",
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
    borderBottom: "2px solid #5568d3",
  },
  tr: {
    borderBottom: "1px solid #eee",
    transition: "background-color 0.2s",
  },
  td: {
    padding: "12px",
    color: "#333",
  },
  link: {
    color: "#667eea",
    textDecoration: "none",
    fontWeight: "600",
    transition: "color 0.2s",
  },
  pagination: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "15px",
    flexWrap: "wrap",
  },
  paginationButton: {
    padding: "10px 20px",
    fontSize: "1rem",
    backgroundColor: "#667eea",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontWeight: "600",
    transition: "background-color 0.3s",
  },
  paginationInfo: {
    fontSize: "0.95rem",
    color: "#666",
    fontWeight: "500",
  },
  badge: {
    display: "inline-block",
    backgroundColor: "#667eea",
    color: "white",
    padding: "4px 10px",
    borderRadius: "12px",
    fontSize: "0.85rem",
    fontWeight: "600",
  },
  badgeSecondary: {
    display: "inline-block",
    backgroundColor: "#6c757d",
    color: "white",
    padding: "4px 10px",
    borderRadius: "12px",
    fontSize: "0.85rem",
    fontWeight: "600",
  },
  totalBadge: {
    display: "inline-block",
    backgroundColor: "#28a745",
    color: "white",
    padding: "4px 10px",
    borderRadius: "12px",
    fontSize: "0.85rem",
    fontWeight: "600",
  },
  noBadge: {
    color: "#ccc",
    fontSize: "0.9rem",
  },
};
