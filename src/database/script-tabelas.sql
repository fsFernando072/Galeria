drop database if exists monitorarte;

CREATE DATABASE monitorarte;

USE monitorarte;

CREATE TABLE galeria (
	id INT PRIMARY KEY AUTO_INCREMENT,
	nome varchar(20),
	cnpj CHAR(14),
	codigo char(8)
);

insert into galeria (cnpj, codigo, nome)
values		('81927839182938', 'COD12345', 'São paulo'),
			('63827833529278', 'COD23456', 'Rio de Janeiro'),
			('72916283917291', 'COD67808', 'Las Vegas');

CREATE TABLE usuario (
	id INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(50),
	email VARCHAR(50),
	senha VARCHAR(50),
	fk_galeria INT,
	FOREIGN KEY (fk_galeria) REFERENCES galeria(id)
);

create table obra (
	id INT PRIMARY KEY AUTO_INCREMENT,
	descricao VARCHAR(300),
	fk_galeria INT,
	FOREIGN KEY (fk_galeria) REFERENCES galeria(id)
);

create table telemetria (
	id INT PRIMARY KEY AUTO_INCREMENT,
	luminosidade DECIMAL,
	lm35_temperatura DECIMAL,
	momento DATETIME,
	fk_obra INT,
	FOREIGN KEY (fk_obra) REFERENCES obra(id)
);



