export default function App() {
  return (
    <main style={{ 
      maxWidth: "720px", 
      margin: "40px auto", 
      padding: "20px",
      fontFamily: "system-ui, -apple-system, sans-serif" 
    }}>
      <h1 style={{ 
        fontSize: "2.5rem", 
        fontWeight: "bold", 
        marginBottom: "1rem",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent"
      }}>
        🚀 MERN Starter
      </h1>
      
      <p style={{ 
        fontSize: "1.1rem", 
        lineHeight: "1.6", 
        color: "#555",
        marginBottom: "2rem" 
      }}>
        Proyecto base MERN listo para usar. Puedes empezar a crear tus propios 
        <strong> modelos</strong>, <strong>rutas</strong> y <strong>vistas</strong>.
      </p>

      <div style={{
        padding: "20px",
        backgroundColor: "#f5f5f5",
        borderRadius: "8px",
        borderLeft: "4px solid #667eea"
      }}>
        <h3 style={{ marginTop: 0 }}>✅ Configuración completada:</h3>
        <ul style={{ lineHeight: "1.8" }}>
          <li>✓ Backend: Express + MongoDB (puerto 4000)</li>
          <li>✓ Frontend: React + Vite (puerto 5173)</li>
          <li>✓ CORS configurado</li>
          <li>✓ Proxy API funcionando</li>
          <li>✓ ES Modules habilitado</li>
        </ul>
      </div>

      <p style={{ 
        marginTop: "2rem", 
        fontSize: "0.95rem", 
        color: "#888" 
      }}>
        Verifica el health check: <code>/api/health</code>
      </p>
    </main>
  );
}
