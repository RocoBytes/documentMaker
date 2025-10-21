import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DocumentMaker from "./pages/DocumentMaker";
import DocumentsList from "./pages/DocumentsList";
import DocumentDetail from "./pages/DocumentDetail";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta raíz redirige a /documents */}
        <Route path="/" element={<Navigate to="/documents" replace />} />
        
        {/* Lista de documentos */}
        <Route path="/documents" element={<DocumentsList />} />
        
        {/* Crear nuevo documento */}
        <Route path="/documents/new" element={<DocumentMaker />} />
        
        {/* Ver detalle de un documento */}
        <Route path="/documents/:id" element={<DocumentDetail />} />
        
        {/* Ruta 404 - redirige a /documents */}
        <Route path="*" element={<Navigate to="/documents" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
