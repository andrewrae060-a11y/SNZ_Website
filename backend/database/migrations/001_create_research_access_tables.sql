CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE research_access_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  full_name VARCHAR(150) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  organisation VARCHAR(255),
  role VARCHAR(150),

  status VARCHAR(20) NOT NULL DEFAULT 'PENDING'
    CHECK (
      status IN (
        'PENDING',
        'APPROVED',
        'REJECTED',
        'REVOKED',
        'EXPIRED'
      )
    ),

  pin_hash TEXT,
  pin_expires_at TIMESTAMPTZ,

  failed_login_attempts INTEGER NOT NULL DEFAULT 0,
  locked_until TIMESTAMPTZ,

  approved_at TIMESTAMPTZ,
  approved_by UUID,

  rejected_at TIMESTAMPTZ,
  rejected_by UUID,

  revoked_at TIMESTAMPTZ,
  revoked_by UUID,

  last_login_at TIMESTAMPTZ,

  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX research_access_users_status_index
  ON research_access_users(status);

CREATE INDEX research_access_users_created_at_index
  ON research_access_users(created_at);


CREATE TABLE admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,

  role VARCHAR(50) NOT NULL DEFAULT 'RESEARCH_ADMIN',

  is_active BOOLEAN NOT NULL DEFAULT TRUE,

  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE research_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  document_key VARCHAR(150) NOT NULL UNIQUE,
  title VARCHAR(255) NOT NULL,
  storage_key TEXT NOT NULL,

  is_published BOOLEAN NOT NULL DEFAULT FALSE,

  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE research_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  user_id UUID NOT NULL
    REFERENCES research_access_users(id)
    ON DELETE CASCADE,

  session_token_hash TEXT NOT NULL UNIQUE,

  expires_at TIMESTAMPTZ NOT NULL,
  revoked_at TIMESTAMPTZ,

  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX research_sessions_user_id_index
  ON research_sessions(user_id);

CREATE INDEX research_sessions_expires_at_index
  ON research_sessions(expires_at);


CREATE TABLE research_access_audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  actor_type VARCHAR(30) NOT NULL,
  actor_id UUID,

  target_user_id UUID
    REFERENCES research_access_users(id)
    ON DELETE SET NULL,

  document_id UUID
    REFERENCES research_documents(id)
    ON DELETE SET NULL,

  action VARCHAR(100) NOT NULL,
  details JSONB,

  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX research_access_audit_action_index
  ON research_access_audit_log(action);

CREATE INDEX research_access_audit_created_at_index
  ON research_access_audit_log(created_at);