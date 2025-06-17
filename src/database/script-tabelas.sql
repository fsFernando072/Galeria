-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

/*
comandos para mysql server
*/

CREATE DATABASE monitorarte;

USE monitorarte;

CREATE TABLE galeria (
	id INT PRIMARY KEY AUTO_INCREMENT,
	nome varchar(20),
	cnpj CHAR(14),
	codigo char(8)
);

insert into galeria (cnpj, codigo, nome)
values		(81927839182938, COD12345, 'São paulo');

CREATE TABLE usuario (
	id INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(50),
	email VARCHAR(50),
	senha VARCHAR(50),
	fk_galeria INT,
	FOREIGN KEY (fk_galeria) REFERENCES galeria(id)
);

create table obra (
/* em nossa regra de negócio, um aquario tem apenas um sensor */
	id INT PRIMARY KEY AUTO_INCREMENT,
	descricao VARCHAR(300),
	fk_galeria INT,
	FOREIGN KEY (fk_galeria) REFERENCES galeria(id)
);

/* esta tabela deve estar de acordo com o que está em INSERT de sua API do arduino - dat-acqu-ino */

create table telemetria (
	id INT PRIMARY KEY AUTO_INCREMENT,
	luminosidade DECIMAL,
	lm35_temperatura DECIMAL,
	momento DATETIME,
	fk_obra INT,
	FOREIGN KEY (fk_obra) REFERENCES obra(id)
);



