-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           5.7.36 - MySQL Community Server (GPL)
-- OS do Servidor:               Win64
-- HeidiSQL Versão:              12.5.0.6677
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
  `whatsapp_cliente` varchar(12) DEFAULT '',
  `cpf_cliente` char(11) DEFAULT '',
  `foto_cliente` varchar(100) DEFAULT 'semfoto',
  `origem_cliente` enum('Facebook','Status do WhatsApp','Instagram','Indicação','Site') DEFAULT 'Indicação',
  PRIMARY KEY (`id_cliente`)
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela fotografia-crm.tb_clientes: ~2 rows (aproximadamente)
INSERT INTO `tb_clientes` (`id_cliente`, `nome_cliente`, `dtcad_cliente`, `email_cliente`, `whatsapp_cliente`, `cpf_cliente`, `foto_cliente`, `origem_cliente`) VALUES
	(52, 'Clebson Araújo', '2023-04-10', 'clebson.araujo.25@gmail.com', '119348975086', '38079871850', 'no-photo.jpg', 'Indicação'),
	(55, 'Alice Andrade', '1991-03-02', 'jornalista.aliceandrade@gmail.com', '11948585379', '41661969879', 'no-photo.jpg', 'Indicação'),
	(56, 'rs', '2024-04-06', 'clebson.araujo@email.com', '123', '222222', 'no-photo.jpg', 'Indicação'),
	(57, 'Alex', '2023-01-01', 'alex_tenhoumatriplex@gmail.com', '119222222222', '22222222222', 'no-photo.jpg', 'Indicação');

-- Copiando estrutura para tabela fotografia-crm.tb_configuracoes_cores
CREATE TABLE IF NOT EXISTS `tb_configuracoes_cores` (
  `id_cor` int(11) NOT NULL AUTO_INCREMENT,
  `cor_painel_lateral` varchar(10) DEFAULT '#c9cfe8',
  `cor_texto_painel_lateral` varchar(10) DEFAULT '#f1f5f9',
  `cor_icone_painel_lateral` varchar(10) DEFAULT '#000000',
  `cor_texto_painel_principal` varchar(10) DEFAULT '#000000',
  PRIMARY KEY (`id_cor`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- Copiando dados para a tabela fotografia-crm.tb_configuracoes_cores: 1 rows
/*!40000 ALTER TABLE `tb_configuracoes_cores` DISABLE KEYS */;
INSERT INTO `tb_configuracoes_cores` (`id_cor`, `cor_painel_lateral`, `cor_texto_painel_lateral`, `cor_icone_painel_lateral`, `cor_texto_painel_principal`) VALUES
	(1, '#B0C4DE', '#111', '#eeffee', '#3236a9');
/*!40000 ALTER TABLE `tb_configuracoes_cores` ENABLE KEYS */;

-- Copiando estrutura para tabela fotografia-crm.tb_endereco
CREATE TABLE IF NOT EXISTS `tb_endereco` (
  `endereco_id` int(11) NOT NULL AUTO_INCREMENT,
  `endereco_cliente_id` int(11) NOT NULL,
  `endereco_logradouro` varchar(150) DEFAULT '',
  `endereco_numero` varchar(8) DEFAULT '',
  `endereco_bairro` varchar(100) DEFAULT '',
  `endereco_tipo` enum('cliente','evento','recepcao','dia_noiva') DEFAULT 'cliente',
  PRIMARY KEY (`endereco_id`),
  KEY `endereco_cliente_id` (`endereco_cliente_id`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

-- Copiando dados para a tabela fotografia-crm.tb_endereco: 2 rows
/*!40000 ALTER TABLE `tb_endereco` DISABLE KEYS */;
INSERT INTO `tb_endereco` (`endereco_id`, `endereco_cliente_id`, `endereco_logradouro`, `endereco_numero`, `endereco_bairro`, `endereco_tipo`) VALUES
	(2, 52, 'Valdomiro Gonzaga Silva', '429', 'jd das Oliveiras', 'cliente'),
	(5, 55, 'rua dos estúdios', '20', 'Itaim Paulista', 'cliente'),
	(6, 56, 'rua tal', '', '', 'cliente'),
	(7, 57, 'rua Valdomiro Gozaga Silva', '431', 'Jd das Oliveirass', 'cliente');
/*!40000 ALTER TABLE `tb_endereco` ENABLE KEYS */;

-- Copiando estrutura para tabela fotografia-crm.tb_endereco_tipo
CREATE TABLE IF NOT EXISTS `tb_endereco_tipo` (
  `tb_endereco_tipo_id` int(11) NOT NULL,
  `tb_endereco_tipo_valor` varchar(50) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- Copiando dados para a tabela fotografia-crm.tb_endereco_tipo: 4 rows
/*!40000 ALTER TABLE `tb_endereco_tipo` DISABLE KEYS */;
INSERT INTO `tb_endereco_tipo` (`tb_endereco_tipo_id`, `tb_endereco_tipo_valor`) VALUES
	(1, 'endereco_cliente'),
	(2, 'endereco_evento'),
	(3, 'endereco_recepcao'),
	(4, 'endereco_dia_noiva');
/*!40000 ALTER TABLE `tb_endereco_tipo` ENABLE KEYS */;

-- Copiando estrutura para tabela fotografia-crm.tb_leads
CREATE TABLE IF NOT EXISTS `tb_leads` (
  `id_lead` int(11) NOT NULL AUTO_INCREMENT,
  `nome_lead` varchar(50) DEFAULT '',
  `whatsapp_lead` varchar(13) DEFAULT '',
  `dtcad_lead` date DEFAULT NULL,
  `email_lead` varchar(100) DEFAULT '',
  `foto_lead` varchar(100) DEFAULT 'semfoto',
  `origem_lead` enum('Facebook','Status do WhatsApp','Instagram','Indicação','Site') DEFAULT 'Indicação',
  PRIMARY KEY (`id_lead`)
) ENGINE=MyISAM AUTO_INCREMENT=22 DEFAULT CHARSET=latin1;

-- Copiando dados para a tabela fotografia-crm.tb_leads: 2 rows
/*!40000 ALTER TABLE `tb_leads` DISABLE KEYS */;
INSERT INTO `tb_leads` (`id_lead`, `nome_lead`, `whatsapp_lead`, `dtcad_lead`, `email_lead`, `foto_lead`, `origem_lead`) VALUES
	(19, 'Novo Leads', '119333333334', '2024-03-27', 'emailleads@gmail.com', 'no-photo.jpg', 'Site'),
	(21, 'Toredo', '119444444444', '2015-01-01', 'toreto@velozes.com', 'no-photo.jpg', 'Indicação');
/*!40000 ALTER TABLE `tb_leads` ENABLE KEYS */;

-- Copiando estrutura para tabela fotografia-crm.tb_servicos
CREATE TABLE IF NOT EXISTS `tb_servicos` (
  `id_servico` int(11) NOT NULL AUTO_INCREMENT,
  `servico_tipo` int(11) NOT NULL DEFAULT '1',
  `ambiente_servico` enum('fora','estúdio') NOT NULL,
  `dt_servico` date NOT NULL,
  `status_servico` enum('cancelado','aguardando pagamento','aguardando resposta','em andamento','finalizado') NOT NULL,
  `tb_servicos_id_cliente` int(11) NOT NULL,
  `nome_bebe` varchar(50) DEFAULT NULL,
  `dt_nasc_bebe` date DEFAULT NULL,
  `sexo_bebe` enum('M','F') DEFAULT NULL,
  `cenario` varchar(100) DEFAULT '',
  `nome_noivos` varchar(100) DEFAULT '',
  `nome_crianca` varchar(50) DEFAULT '',
  `dt_nasc_crianca` date DEFAULT NULL,
  `profissao` varchar(50) DEFAULT '',
  PRIMARY KEY (`id_servico`),
  KEY `fk_tb_servicos_tb_clientes1_idx` (`tb_servicos_id_cliente`),
  CONSTRAINT `fk_tb_servicos_tb_clientes1` FOREIGN KEY (`tb_servicos_id_cliente`) REFERENCES `tb_clientes` (`id_cliente`) ON DELETE NO ACTION ON UPDATE NO ACTION
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
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `email_usuario_UNIQUE` (`email_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela fotografia-crm.tb_usuarios: ~1 rows (aproximadamente)
INSERT INTO `tb_usuarios` (`id_usuario`, `email_usuario`, `senha_usuario`, `token_auth_usuario`, `duracao_token_usuario`) VALUES
	(2, 'alice_teste@gmail.com', '$2b$10$t282k1LXUGvtdxq.lbXrrOA5ILTVKPhWz4al.2o2v9IttTJySr8tK', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjk4Njg5MzMwLCJleHAiOjE2OTg2OTI5MzB9.zRQmbg4Ddxozyq_lb9ZWV0zElhGUK6qdEJbkZQrfQA0', '2023-05-20 00:00:00');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
