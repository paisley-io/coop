
DROP TABLE IF EXISTS buy_permit CASCADE;
DROP TABLE IF EXISTS ident CASCADE;
DROP TABLE IF EXISTS monitor_debug CASCADE;
DROP TABLE IF EXISTS monitor CASCADE;

-- Monitor table

CREATE TABLE monitor
(
	 id  SERIAL        PRIMARY KEY
	,di  SMALLINT      DEFAULT 0 NOT NULL -- disposal - 0:none,1:disabled,2:purge
	,cr  TIMESTAMP(0)  NOT NULL
	,mo  TIMESTAMP(0)  NOT NULL

	,log  JSONB        DEFAULT NULL    -- JSON fields and values
);
CREATE INDEX ix_monitor__log__start_bi ON monitor( ((log->>'start')::bigint) );

CREATE TABLE monitor_debug
(
	 id  SERIAL        PRIMARY KEY
	,di  SMALLINT      DEFAULT 0 NOT NULL -- disposal - 0:none,1:disabled,2:purge
	,cr  TIMESTAMP(0)  NOT NULL
	,mo  TIMESTAMP(0)  NOT NULL

	,log  JSONB        DEFAULT NULL    -- JSON fields and values
);
CREATE INDEX ix_monitor_debug__uuid ON monitor_debug((log->>'uuid'));

-- Ident table

CREATE TABLE ident
(
	 id  SERIAL        PRIMARY KEY
	,di  SMALLINT      DEFAULT 0 NOT NULL -- disposal - 0:none,1:disabled,2:purge
	,cr  TIMESTAMP(0)  NOT NULL
	,mo  TIMESTAMP(0)  NOT NULL

	-- Identity
	,email   VARCHAR(128)  DEFAULT NULL
	,role    VARCHAR(128)  DEFAULT NULL

	-- Security
	,keycode                VARCHAR( 16)  DEFAULT NULL
	,keycode_expires        TIMESTAMP(0)  DEFAULT NULL
	,keycode_attempts       SMALLINT      DEFAULT 0
	,refresh_token          VARCHAR( 32)  DEFAULT NULL
	,refresh_token_expires  TIMESTAMP(0)  DEFAULT NULL

	-- Client info
	-- G	17ae6bf2bb28769d1f6ee33d527c0cc5	a0c859b33a...a1620adf6ba [156 chars]
	,encrypt_bip39        VARCHAR( 156)  DEFAULT NULL
	,convex_account_id    INT            DEFAULT NULL
	,ether_address        VARCHAR( 64)  DEFAULT NULL
);
CREATE UNIQUE INDEX ix_ident__email ON ident(email);

-- System principles
INSERT INTO ident (id, di, cr, mo, email) VALUES
  (99, 0, NOW(), NOW(), 'SYSTEM - TIMERS'),
  (98, 0, NOW(), NOW(), 'SYSTEM - API'),
  (97, 0, NOW(), NOW(), 'SYSTEM - TEST');

-- Buy table for USDC purchases via Permit

CREATE TABLE buy_permit
(
	 id  SERIAL        PRIMARY KEY
	,di  SMALLINT      DEFAULT 0 NOT NULL -- disposal - 0:none,1:disabled,2:purge
	,cr  TIMESTAMP(0)  NOT NULL
	,mo  TIMESTAMP(0)  NOT NULL

	-- Identity
	,ident_id        INTEGER  NOT NULL

	-- Start / fail info
	,monitor_uuid    VARCHAR( 64) NOT NULL
	,permit          JSONB        NOT NULL
	,last_error      JSONB        DEFAULT NULL
	,status          VARCHAR( 16) DEFAULT NULL -- i.e. 'failed'; use 'ignore' to avoid alarm
	,notes           VARCHAR(512) DEFAULT NULL -- Human notes if needed


	-- Auditable steps
	,permit_tx         JSONB    DEFAULT NULL
	,permit_tx_wait    JSONB    DEFAULT NULL
	,transfer_tx       JSONB    DEFAULT NULL
	,transfer_tx_wait  JSONB    DEFAULT NULL
	,convex_transfer   JSONB    DEFAULT NULL
	,archon_transfer   JSONB    DEFAULT NULL

);
ALTER TABLE buy_permit ADD CONSTRAINT fk_buy_permit__ident_id FOREIGN KEY (ident_id) REFERENCES ident(id);
