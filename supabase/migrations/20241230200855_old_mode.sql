/*
  # Create personas table

  1. New Tables
    - `personas`
      - `id` (uuid, primary key)
      - `nombre` (text, not null)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `personas` table
    - Add policies for CRUD operations
*/

CREATE TABLE IF NOT EXISTS personas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE personas ENABLE ROW LEVEL SECURITY;

-- Policies for authenticated users
CREATE POLICY "Allow select for authenticated users" ON personas
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow insert for authenticated users" ON personas
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Allow update for authenticated users" ON personas
  FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Allow delete for authenticated users" ON personas
  FOR DELETE TO authenticated USING (true);