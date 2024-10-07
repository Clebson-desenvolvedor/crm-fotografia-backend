-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           5.7.36 - MySQL Community Server (GPL)
-- OS do Servidor:               Win64
-- HeidiSQL Versão:              12.6.0.6765
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Copiando estrutura do banco de dados para fotografia-crm
CREATE DATABASE IF NOT EXISTS `fotografia-crm` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `fotografia-crm`;

-- Copiando estrutura para tabela fotografia-crm.tb_clientes
CREATE TABLE IF NOT EXISTS `tb_clientes` (
  `id_cliente` int(11) NOT NULL AUTO_INCREMENT,
  `nome_cliente` varchar(45) NOT NULL DEFAULT '',
  `dtcad_cliente` date DEFAULT NULL,
  `email_cliente` varchar(45) DEFAULT '',
  `whatsapp_cliente` varchar(15) NOT NULL DEFAULT '',
  `cpf_cliente` char(14) NOT NULL DEFAULT '',
  `foto_cliente` longtext,
  `origem_cliente` enum('Facebook','Status do WhatsApp','Instagram','Indicação','Site') DEFAULT 'Indicação',
  `cep_cliente` char(9) DEFAULT NULL,
  `endereco_logradouro_cliente` varchar(128) DEFAULT NULL,
  `endereco_numero_cliente` varchar(6) DEFAULT NULL,
  `endereco_bairro_cliente` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`id_cliente`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Copiando estrutura para tabela fotografia-crm.tb_configuracoes_cores
CREATE TABLE IF NOT EXISTS `tb_configuracoes_cores` (
  `id_cor` int(11) NOT NULL AUTO_INCREMENT,
  `cor_primaria` varchar(10) DEFAULT '#c9cfe8',
  `cor_secundaria` varchar(10) DEFAULT '#f1f5f9',
  PRIMARY KEY (`id_cor`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- Copiando dados para a tabela fotografia-crm.tb_configuracoes_cores: 1 rows
/*!40000 ALTER TABLE `tb_configuracoes_cores` DISABLE KEYS */;
INSERT INTO `tb_configuracoes_cores` (`id_cor`, `cor_primaria`, `cor_secundaria`) VALUES
	(1, 'black', '#ffffff');
/*!40000 ALTER TABLE `tb_configuracoes_cores` ENABLE KEYS */;

-- Copiando estrutura para tabela fotografia-crm.tb_endereco
CREATE TABLE IF NOT EXISTS `tb_endereco` (
  `endereco_id` int(11) NOT NULL AUTO_INCREMENT,
  `endereco_logradouro` varchar(150) DEFAULT '',
  `endereco_numero` varchar(8) DEFAULT '',
  `endereco_bairro` varchar(100) DEFAULT '',
  `endereco_tipo` enum('evento','recepcao','dia_noiva') DEFAULT 'evento',
  `endereco_id_servico` int(11) NOT NULL,
  PRIMARY KEY (`endereco_id`),
  KEY `FK_endereco_servico` (`endereco_id_servico`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- Copiando dados para a tabela fotografia-crm.tb_endereco: 0 rows
/*!40000 ALTER TABLE `tb_endereco` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_endereco` ENABLE KEYS */;

-- Copiando estrutura para tabela fotografia-crm.tb_endereco_tipo
CREATE TABLE IF NOT EXISTS `tb_endereco_tipo` (
  `tb_endereco_tipo_id` int(11) NOT NULL,
  `tb_endereco_tipo_valor` varchar(50) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- Copiando dados para a tabela fotografia-crm.tb_endereco_tipo: 3 rows
/*!40000 ALTER TABLE `tb_endereco_tipo` DISABLE KEYS */;
INSERT INTO `tb_endereco_tipo` (`tb_endereco_tipo_id`, `tb_endereco_tipo_valor`) VALUES
	(1, 'evento'),
	(2, 'recepcao'),
	(3, 'dia_noiva');
/*!40000 ALTER TABLE `tb_endereco_tipo` ENABLE KEYS */;

-- Copiando estrutura para tabela fotografia-crm.tb_historico_pagamento
CREATE TABLE IF NOT EXISTS `tb_historico_pagamento` (
  `historico_preco_id` int(11) NOT NULL AUTO_INCREMENT,
  `valor_original` float(6,2) DEFAULT NULL,
  `valor_sinal` float(6,2) DEFAULT NULL,
  `data_transacao` date DEFAULT NULL,
  `historico_id_servico` int(11) NOT NULL,
  PRIMARY KEY (`historico_preco_id`),
  KEY `FK_historico_servico` (`historico_id_servico`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- Copiando dados para a tabela fotografia-crm.tb_historico_pagamento: 0 rows
/*!40000 ALTER TABLE `tb_historico_pagamento` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_historico_pagamento` ENABLE KEYS */;

-- Copiando estrutura para tabela fotografia-crm.tb_leads
CREATE TABLE IF NOT EXISTS `tb_leads` (
  `id_lead` int(11) NOT NULL AUTO_INCREMENT,
  `nome_lead` varchar(50) DEFAULT '',
  `whatsapp_lead` varchar(13) DEFAULT '',
  `dtcad_lead` date DEFAULT NULL,
  `email_lead` varchar(100) DEFAULT '',
  `foto_lead` varchar(100) DEFAULT 'semfoto',
  `origem_lead` enum('Facebook','Status do WhatsApp','Instagram','Indicação','Site') DEFAULT 'Indicação',
  `ainda_lead` tinyint(4) DEFAULT '0',
  PRIMARY KEY (`id_lead`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- Copiando dados para a tabela fotografia-crm.tb_leads: 0 rows
/*!40000 ALTER TABLE `tb_leads` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_leads` ENABLE KEYS */;

-- Copiando estrutura para tabela fotografia-crm.tb_servicos
CREATE TABLE IF NOT EXISTS `tb_servicos` (
  `id_servico` int(11) NOT NULL AUTO_INCREMENT,
  `servico_tipo` int(11) NOT NULL DEFAULT '1',
  `ambiente_servico` enum('fora','estúdio') NOT NULL,
  `dt_servico` date NOT NULL,
  `status_servico` enum('cancelado','aguardando pagamento','aguardando resposta','em andamento','finalizado') NOT NULL,
  `nome_bebe` varchar(50) DEFAULT NULL,
  `dt_nasc_bebe` date DEFAULT NULL,
  `sexo_bebe` enum('M','F') DEFAULT NULL,
  `cenario` varchar(100) DEFAULT '',
  `nome_noivos` varchar(100) DEFAULT '',
  `nome_crianca` varchar(50) DEFAULT '',
  `dt_nasc_crianca` date DEFAULT NULL,
  `profissao` varchar(50) DEFAULT '',
  `servico_id_cliente` int(11) NOT NULL,
  PRIMARY KEY (`id_servico`),
  KEY `FK_tb_servicos_tb_clientes` (`servico_id_cliente`),
  CONSTRAINT `FK_tb_servicos_tb_clientes` FOREIGN KEY (`servico_id_cliente`) REFERENCES `tb_clientes` (`id_cliente`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela fotografia-crm.tb_servicos: ~0 rows (aproximadamente)

-- Copiando estrutura para tabela fotografia-crm.tb_servicos_tipo
CREATE TABLE IF NOT EXISTS `tb_servicos_tipo` (
  `tb_servico_tipo_id` int(11) NOT NULL,
  `servico_tipo_nome` varchar(50) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- Copiando dados para a tabela fotografia-crm.tb_servicos_tipo: 12 rows
/*!40000 ALTER TABLE `tb_servicos_tipo` DISABLE KEYS */;
INSERT INTO `tb_servicos_tipo` (`tb_servico_tipo_id`, `servico_tipo_nome`) VALUES
	(1, 'Acompanhamento'),
	(2, 'Casamento Civil'),
	(3, 'Casamento Igreja'),
	(4, 'Ensaio Gestante'),
	(5, 'Ensaio Infantil'),
	(6, 'Newborn'),
	(7, 'Prewedding'),
	(8, 'Festa Infantil'),
	(9, 'Smash The Cake'),
	(10, 'Corporativo'),
	(11, 'Ensaio Feminino'),
	(12, 'Ensaio Família');
/*!40000 ALTER TABLE `tb_servicos_tipo` ENABLE KEYS */;

-- Copiando estrutura para tabela fotografia-crm.tb_usuarios
CREATE TABLE IF NOT EXISTS `tb_usuarios` (
  `id_usuario` int(11) NOT NULL AUTO_INCREMENT,
  `email_usuario` varchar(45) NOT NULL,
  `senha_usuario` varchar(100) NOT NULL,
  `token_auth_usuario` varchar(200) DEFAULT NULL,
  `duracao_token_usuario` datetime DEFAULT NULL,
  `nome_usuario` varchar(50) NOT NULL,
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `email_usuario_UNIQUE` (`email_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela fotografia-crm.tb_usuarios: ~2 rows (aproximadamente)
INSERT INTO `tb_usuarios` (`id_usuario`, `email_usuario`, `senha_usuario`, `token_auth_usuario`, `duracao_token_usuario`, `nome_usuario`) VALUES
	(1, 'administrador@byemotion.com.br', '$2a$12$tAUxVwInEZMsZOjxN.99CO4lie/nX8DT7qpVHLN4HTAWp3JsXQ0dK', NULL, NULL, 'Clebson Araújo'),
	(2, 'jornalista.aliceandrade@gmail.com', '$2a$12$LL6Ad/j9bGrBk3HrOi8Ygu9kCQHN23G7PrMNGaB9aV9.KjB7D1EZC', NULL, NULL, 'Alice Andrade');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
