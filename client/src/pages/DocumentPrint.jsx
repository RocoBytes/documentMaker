import { useState, useEffect, useRef } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import "../styles/print.css";

/**
 * API_ORIGIN: Define el origen del backend para construir URLs absolutas
 * Configurable via VITE_API_ORIGIN en .env (ej: VITE_API_ORIGIN=https://tu-api.com)
 * Por defecto usa http://localhost:4000
 */
const API_ORIGIN = import.meta.env.VITE_API_ORIGIN || "http://localhost:4000";

/**
 * Formatea fecha ISO a DD-MM-YYYY
 */
const formatDate = (isoString) => {
  if (!isoString) return "";
  const date = new Date(isoString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${day}-${month}-${year}`;
};

/**
 * Formatea número ()
 */
const fmt = (n) => {
  return Number(n) || 0;
};

export default function DocumentPrint() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const imgRef = useRef(null);
  
  const [document, setDocument] = useState(null);
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [logoLoaded, setLogoLoaded] = useState(false);
  
  const auto = searchParams.get("auto") === "1";

  /**
   * Logo con URL absoluta y cache-busting
   * El archivo debe existir en: server/uploads/logo.png
   * Servido estáticamente en: http://localhost:4000/uploads/logo.png
   */
  const logoSrc = `${API_ORIGIN}/uploads/logo.png?v=${Date.now()}`;

  // Fetch documento
  useEffect(() => {
    const fetchDocument = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`${API_ORIGIN}/api/documents/${id}`);

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

  // Fetch información de la empresa
  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const response = await fetch(`${API_ORIGIN}/api/settings/company`);
        const data = await response.ok ? await response.json() : null;
        
        setCompany(data || {
          name: "Cablex Latam SPA",
          rut: "77.967.372-3",
          address: "Av. Lo Espejo 01565, Oficina 1222, Calle 12 Sur",
          city: "Santiago",
          activity: "Ingeniería, Fabric. e Integración de Tableros Eléc. y Servicios para Telecom.",
          email: "intercambio.cablexlatam@docele.cl"
        });
      } catch (error) {
        // Fallback si falla el fetch
        setCompany({
          name: "Cablex Latam SPA",
          rut: "77.967.372-3",
          address: "Av. Lo Espejo 01565, Oficina 1222, Calle 12 Sur",
          city: "Santiago",
          activity: "Ingeniería, Fabric. e Integración de Tableros Eléc. y Servicios para Telecom.",
          email: "intercambio.cablexlatam@docele.cl"
        });
      }
    };

    fetchCompany();
  }, []);

  // Auto-print cuando auto=1, documento cargado, company disponible y logo listo
  useEffect(() => {
    // Esperar a que todo esté listo: documento, empresa, y no estar en loading
    if (!auto || !document || !company || loading) return;
    
    let timeout;
    const tryPrint = () => {
      timeout = setTimeout(() => {
        window.print();
      }, 200); // Delay de 200ms para asegurar que todo se haya renderizado
    };

    const img = imgRef.current;
    if (img) {
      if (img.complete) {
        // Imagen ya cargada
        setLogoLoaded(true);
        tryPrint();
      } else {
        // Esperar a que cargue la imagen
        img.onload = () => {
          setLogoLoaded(true);
          tryPrint();
        };
        img.onerror = () => {
          // Si falla, imprimir de todos modos
          setLogoLoaded(true);
          tryPrint();
        };
      }
    } else {
      // No hay imagen, imprimir directamente
      setLogoLoaded(true);
      tryPrint();
    }

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [auto, document, company, loading]);

  const handlePrint = () => {
    window.print();
  };

  const handleBack = () => {
    navigate("/documents");
  };

  if (loading) {
    return (
      <div className="print-loading">
        <p>⏳ Cargando documento...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="print-error">
        <h2>❌ Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (!document) {
    return null;
  }

  // Asegurar que referencias tenga 3 elementos
  const referencias = document.referencias || [];
  while (referencias.length < 3) {
    referencias.push({
      documentoReferencia: "",
      nroDocto: "",
      fecha: "",
      nroSAP: ""
    });
  }

  return (
    <div className="print-root">
      <div className="print-page">
        {/* Botones de acción - no se imprimen */}
        <button onClick={handleBack} className="no-print back-btn">
          ← Volver
        </button>
        <button onClick={handlePrint} className="no-print print-btn">
          🖨️ Imprimir / Guardar PDF
        </button>

        {/* Contenedor principal */}
        <div className="print-container">
          {/* Header: Logo + Información de Empresa + Badge */}
          <header className="print-header">
            <div className="brand">
              <img 
                ref={imgRef}
                src={logoSrc} 
                alt="Logo empresa" 
                className="company-logo"
                style={{ 
                  maxHeight: 64, 
                  width: "auto",
                  display: "block"
                }}
                onLoad={() => {
                  console.log("✅ Logo cargado exitosamente desde:", logoSrc);
                  setLogoLoaded(true);
                }}
                onError={(e) => { 
                  console.error("❌ Error al cargar logo desde:", logoSrc);
                  console.error("Verifica que el archivo exista en el servidor");
                  // Solo ocultar si realmente falló, no prematuramente
                  setTimeout(() => {
                    e.currentTarget.style.visibility = "hidden";
                    e.currentTarget.style.width = "0";
                    e.currentTarget.style.height = "0";
                  }, 100);
                }}
              />
              {company && (
                <div className="company-lines">
                  <div className="company-name">{company.name}</div>
                  <div className="company-sub">
                    R.U.T.: {company.rut} · Servicios / Telecomunicaciones
                  </div>
                  <div className="company-sub">
                    Av. Lo Espejo 1221 · Santiago
                  </div>
                </div>
              )}
            </div>

            <aside className="doc-badge">
              <div className="rut">R.U.T.: {company?.rut || "---"}</div>
              <div className="title">GUÍA DE DESPACHO</div>
              <div className="subtitle">Traslado Interno</div>
              <div className="doc-number">N° {document.docNumber || "---"}</div>
            </aside>
          </header>

          {/* Fecha de emisión */}
          <div className="emission-date">
            Fecha emisión: <strong>{formatDate(document.createdAt)}</strong>
          </div>

        {/* Contenedor de dos secciones lado a lado */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginBottom: "15px" }}>
          
          {/* Sección: Información destinatario */}
          <div className="section" style={{ marginBottom: 0 }}>
            <div className="section-title">Información destinatario</div>
            <div className="info-grid" style={{ gridTemplateColumns: "1fr", gap: "4px" }}>
              <div className="info-col">
                <div className="info-row" style={{ fontSize: "10px", lineHeight: "0.8" }}>
                  <span className="info-label">Señor:</span>
                  <span className="info-value">{document.destinatario || ""}</span>
                </div>
                <div className="info-row" style={{ fontSize: "10px", lineHeight: "0.8" }}>
                  <span className="info-label">RUT:</span>
                  <span className="info-value">{document.rut || ""}</span>
                </div>
                <div className="info-row" style={{ fontSize: "10px", lineHeight: "0.8" }}>
                  <span className="info-label">Dirección:</span>
                  <span className="info-value">{document.direccion || ""}</span>
                </div>
                <div className="info-row" style={{ fontSize: "10px", lineHeight: "0.8" }}>
                  <span className="info-label">Ciudad:</span>
                  <span className="info-value">{document.ciudadDestinatario || ""}</span>
                </div>
                <div className="info-row" style={{ fontSize: "10px", lineHeight: "0.8" }}>
                  <span className="info-label">Giro:</span>
                  <span className="info-value">{document.giro || ""}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sección: Información de traslado */}
          <div className="section" style={{ marginBottom: 0 }}>
            <div className="section-title">Información de traslado</div>
            <div className="info-grid" style={{ gridTemplateColumns: "1fr", gap: "4px" }}>
              <div className="info-col">
                <div className="info-row" style={{ fontSize: "10px", lineHeight: "1.0" }}>
                  <span className="info-label">Chofer:</span>
                  <span className="info-value">{document.chofer || ""}</span>
                </div>
                <div className="info-row" style={{ fontSize: "10px", lineHeight: "0.8" }}>
                  <span className="info-label">RUT:</span>
                  <span className="info-value">{document.rutChofer || ""}</span>
                </div>
                <div className="info-row" style={{ fontSize: "10px", lineHeight: "0.8" }}>
                  <span className="info-label">Destino:</span>
                  <span className="info-value">{document.destino || ""}</span>
                </div>
                <div className="info-row" style={{ fontSize: "10px", lineHeight: "0.8" }}>
                  <span className="info-label">Ciudad:</span>
                  <span className="info-value">{document.ciudadDestino || ""}</span>
                </div>
                <div className="info-row" style={{ fontSize: "10px", lineHeight: "0.8" }}>
                  <span className="info-label">Centro de Negocio:</span>
                  <span className="info-value">{document.centroDeNegocios || ""}</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Tabla: Documentos de referencia */}
        <div className="section">
          <div className="section-title">Documentos de referencia</div>
          <div className="table-referencias" style={{ lineHeight: "0.8" }}>
            <div className="table-header-referencias">
              <div>Documento de referencia</div>
              <div>N° Documento</div>
              <div>Fecha</div>
              <div>Nro. SAP</div>
            </div>
            {referencias.slice(0, 3).map((ref, idx) => (
              <div key={idx} className="table-row-referencias">
                <div>{ref.documentoReferencia || ""}</div>
                <div>{ref.nroDocto || ""}</div>
                <div>{ref.fecha || ""}</div>
                <div>{ref.nroSAP || ""}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Tabla: Detalle (items) */}
        <div className="section" style={{ marginBottom: "0" }}>
          <div className="section-title">Detalle</div>
          <div className="table-items">
            <div className="table-header-items">
              <div>Código ITEM</div>
              <div>Detalle</div>
              <div>Cantidad</div>
            </div>
            {(document.items || []).map((item, idx) => (
              <div key={idx} className="table-row-items">
                <div>{item.codigoItem || ""}</div>
                <div className="item-detalle">{item.detalle || ""}</div>
                <div>{fmt(item.cantidad)}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Totales */}
        <div className="totales-section" style={{ lineHeight: "0.8", margin: "0" }}>
          <div className="totales-label">Cantidad total despachada</div>
          <div className="totales-value">{fmt(document.totalCantidad)}</div>
        </div>

        {/* Observaciones */}
        {document.observaciones && (
          <div className="section" style={{ marginBottom: "10px", marginTop: "0" }}>
            <div className="section-title">Observaciones</div>
            <div className="observaciones-box">
              {document.observaciones}
            </div>
          </div>
        )}

        {/* Bloque de firmas */}
        <section className="signatures">
          
          {/* Recibido por (quien recibe) */}
          <div className="sign-box sign-box-large">
            <div className="sign-title">Recibido por</div>

            <div className="line-row">
              <div>Nombre:</div>
              <div className="line" />
              <div>RUT:</div>
              <div className="line" />
            </div>

            <div className="line-row" style={{ gridTemplateColumns: "auto 1fr" }}>
              <div>Recinto:</div>
              <div className="line" />
            </div>

            <div className="line-row">
              <div>Fecha:</div>
              <div className="line" />
              <div>Firma:</div>
              <div className="line" />
            </div>

            <div className="legal-note">
              El acuse de recibo que se declara en este acto, de acuerdo a lo dispuesto en la letra b) del Art. 4º y la letra c) del Art. 5º de la Ley 19.983, acredita que la entrega de las mercaderias o servicio(s) prestado(s) ha(n) sido recibidos(s).
            </div>
          </div>

          {/* Firmado por (emisor/supervisor) - Espacio en blanco para firma */}
          <div className="sign-box sign-box-small">
            <div className="sign-title">Firma</div>
          </div>
        </section>
      </div>
      </div>
    </div>
  );
}
