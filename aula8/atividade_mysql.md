# Atividade: Banco de Dados com MySQL

## 1. Criar a Tabela
```sql
CREATE TABLE pessoa (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    idade INT NOT NULL
);

INSERT INTO pessoa (nome, idade) VALUES ('Fernanda', 21);
INSERT INTO pessoa (nome, idade) VALUES ('Sofia', 30);
SELECT * FROM pessoa;