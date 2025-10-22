import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DocumentMaker from "./pages/DocumentMaker";
import DocumentsList from "./pages/DocumentsList";
import DocumentDetail from "./pages/DocumentDetail";
import DocumentPrint from "./pages/DocumentPrint";
import LogoUpload from "./pages/LogoUpload";

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
        
        {/* Vista de impresión especializada */}
        <Route path="/documents/:id/print" element={<DocumentPrint />} />
        
        {/* Administrador de logo */}
        <Route path="/admin/logo" element={<LogoUpload />} />
        
        {/* Ruta 404 - redirige a /documents */}
        <Route path="*" element={<Navigate to="/documents" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
