DROP DATABASE iara_db;

CREATE DATABASE iara_db;

USE iara_db;

CREATE TABLE usuario(
    id int(11) primary key auto_increment,
    nome varchar(250) not null,
    usuario varchar(250) not null,
    senha varchar(512) not null,
    email varchar(200) not null,
    cidade varchar(250) not null,
    estado char(2) not null, 
    pais varchar(200) not null
);

INSERT INTO usuario VALUES(DEFAULT, 'Administrador', 'admin', sha2('admin', 512), 'admin@email.com', 'Indaiatuba', 'SP', 'Brasil');

CREATE TABLE propriedade(
    id int(11) primary key auto_increment,
    nome varchar(250) not null,
    unidade_medida varchar(250)
);

INSERT INTO propriedade VALUES(DEFAULT, 'Potencial Hidrogeniônico', 'pH');
INSERT INTO propriedade VALUES(DEFAULT, 'Nível da água', 'metros');
INSERT INTO propriedade VALUES(DEFAULT, 'Temperatura', 'ºCelcius');
INSERT INTO propriedade VALUES(DEFAULT, 'Turbidez', 'NTU');
INSERT INTO propriedade VALUES(DEFAULT, 'Condutividade', 'uS/cm');

CREATE TABLE usuario_propriedade_config(
    usuarioID int(11) not null,
    propriedadeID int(11) not null,
    valor_maximo DECIMAL(10,3) not null,
    valor_minimo DECIMAL(10,3) not null,
    FOREIGN KEY(usuarioID) references usuario(id),
    FOREIGN KEY(propriedadeID) references propriedade(id)
);

CREATE TABLE analise(
    id int(11) primary key auto_increment,
    data_analise DATETIME not null,
    usuarioID int(11) not null,
    FOREIGN KEY(usuarioID) references usuario(id)
);

CREATE TABLE analise_aux(
    analiseID int(11) not null,
    propriedadeID int(11) not null,
    valor_analise DECIMAL(10,3) not null,
    resultado int(1) not null,
    FOREIGN KEY(analiseID) references analise(id),
    FOREIGN KEY(propriedadeID) references propriedade(id)
);

SELECT 
            analise_aux.valor_analise as valor
            FROM analise_aux
            inner join propriedade on analise_aux.propriedadeID = propriedade.id
            inner join analise on analise_aux.analiseID = analise.id
            WHERE propriedade.id = 4
            ORDER BY analise.data_analise ASC
            LIMIT 5;



 SELECT 
                avg(
                    analise_aux.valor_analise
                ) as media,
                max(analise_aux.valor_analise) as maximo,
                min(analise_aux.valor_analise) as minimo
                FROM (
                    SELECT analise_aux.valor_analise
                    FROM analise_aux
                    inner join propriedade on analise_aux.propriedadeID = propriedade.id
                    inner join analise on analise_aux.analiseID = analise.id
                    WHERE propriedade.id = 4
                    ORDER BY analise.data_analise DESC
                    LIMIT 5
                ) analise_aux;
                
                 