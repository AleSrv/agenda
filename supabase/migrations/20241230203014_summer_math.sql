/*
  # Configuración de políticas de seguridad para la tabla personas

  1. Cambios
    - Habilitar RLS en la tabla personas
    - Crear políticas para permitir operaciones CRUD a usuarios anónimos
    
  2. Seguridad
    - Permitir acceso anónimo para demostración
    - En producción, se recomienda restringir a usuarios autenticados
*/

-- Habilitar RLS
ALTER TABLE personas ENABLE ROW LEVEL SECURITY;

-- Políticas para usuarios anónimos (demo)
CREATE POLICY "Permitir SELECT para usuarios anónimos" ON personas
  FOR SELECT TO anon USING (true);

CREATE POLICY "Permitir INSERT para usuarios anónimos" ON personas
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Permitir UPDATE para usuarios anónimos" ON personas
  FOR UPDATE TO anon USING (true);

CREATE POLICY "Permitir DELETE para usuarios anónimos" ON personas
  FOR DELETE TO anon USING (true);