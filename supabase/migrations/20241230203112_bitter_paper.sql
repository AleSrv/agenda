/*
  # Agregar campo dirección a la tabla personas

  1. Cambios
    - Agregar columna dirección a la tabla personas
    
  2. Notas
    - La columna es opcional (NULL permitido)
    - Se mantienen las políticas de seguridad existentes
*/

ALTER TABLE personas ADD COLUMN IF NOT EXISTS direccion text;