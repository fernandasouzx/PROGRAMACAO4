-- 1. Criação da Tabela (DDL)
CREATE TABLE Pessoa (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    idade INT
);

-- 2. Duas inserções dentro da tabela (DML)
INSERT INTO Pessoa (nome, idade) VALUES ('Ana', 22);
INSERT INTO Pessoa (nome, idade) VALUES ('Carlos', 28);

-- 3. Seleção de todas as entidades registradas (DML)
SELECT * FROM Pessoa;