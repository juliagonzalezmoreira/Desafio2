create database desafio3; #criar banco

drop database desafio3; #excluir banco

use desafio3; #usar banco

#criar tabela
create table contato(
	id int auto_increment primary key,
	email varchar(60),
    assunto varchar(60),
    descricao varchar(200)
); 

drop table contatos; #excluir tabelas

select * from contato;

truncate contato; #exluir dados tabela