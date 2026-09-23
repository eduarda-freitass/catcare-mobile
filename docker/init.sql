CREATE TABLE tutors (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    telefone VARCHAR(20)
);

CREATE TABLE cats (
    id SERIAL PRIMARY KEY,
    tutor_id INTEGER REFERENCES tutors(id),
    nome VARCHAR(100) NOT NULL,
    raca VARCHAR(50),
    idade INTEGER
);

CREATE TABLE appointments (
    id SERIAL PRIMARY KEY,
    cat_id INTEGER REFERENCES cats(id),
    data_consulta TIMESTAMP NOT NULL,
    descricao TEXT,
    status VARCHAR(20) DEFAULT 'agendado'
);