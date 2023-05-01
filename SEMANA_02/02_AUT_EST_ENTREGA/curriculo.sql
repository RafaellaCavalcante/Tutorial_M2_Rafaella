BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "formacao" (
	"curso"	TEXT NOT NULL,
	"ano_fim"	TEXT,
	"descricao_curso"	TEXT NOT NULL,
	"id_formacao"	INTEGER NOT NULL UNIQUE,
	"ano_inicio"	TEXT NOT NULL,
	"id_sobre_mim"	INTEGER NOT NULL,
	FOREIGN KEY("id_sobre_mim") REFERENCES "sobre_mim"("id"),
	PRIMARY KEY("id_formacao" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "sobre_mim" (
	"id"	INTEGER NOT NULL UNIQUE,
	"descricao_sobre_mim"	TEXT NOT NULL,
	"nome"	TEXT NOT NULL,
	"numero"	NUMERIC NOT NULL,
	"email"	TEXT NOT NULL,
	"cargo_desejado"	TEXT NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "experiencia" (
	"id_experiencia"	INTEGER NOT NULL UNIQUE,
	"nome_experiencia"	TEXT NOT NULL,
	"data_inicio"	TEXT NOT NULL,
	"data_fim"	TEXT,
	"descricao_experiencia"	TEXT NOT NULL,
	"id_sobre_mim"	INTEGER NOT NULL,
	FOREIGN KEY("id_sobre_mim") REFERENCES "sobre_mim"("id"),
	PRIMARY KEY("id_experiencia" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "habilidades" (
	"id_habilidades"	INTEGER NOT NULL UNIQUE,
	"id_sobre_mim"	INTEGER NOT NULL,
	"nome_programa"	TEXT NOT NULL,
	"descricao_experiencia_"	TEXT,
	FOREIGN KEY("id_sobre_mim") REFERENCES "sobre_mim"("id"),
	PRIMARY KEY("id_habilidades" AUTOINCREMENT)
);
COMMIT;
