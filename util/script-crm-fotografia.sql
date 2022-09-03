-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           5.7.36 - MySQL Community Server (GPL)
-- OS do Servidor:               Win64
-- HeidiSQL Versão:              11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Copiando estrutura para tabela fotografia-crm.newborn
CREATE TABLE IF NOT EXISTS `newborn` (
  `nb_id` int(11) NOT NULL AUTO_INCREMENT,
  `nome_bebe` varchar(45) DEFAULT NULL,
  `nb_dtnasc_bebe` date DEFAULT NULL,
  `nb_sexo_bebe` enum('m','f') NOT NULL,
  `nb_cenario` varchar(45) DEFAULT NULL,
  `newborn_id_servico` int(11) NOT NULL,
  PRIMARY KEY (`nb_id`),
  KEY `fk_newborn_tb_servicos1_idx` (`newborn_id_servico`),
  CONSTRAINT `fk_newborn_tb_servicos1` FOREIGN KEY (`newborn_id_servico`) REFERENCES `tb_servicos` (`id_servico`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela fotografia-crm.newborn: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `newborn` DISABLE KEYS */;
/*!40000 ALTER TABLE `newborn` ENABLE KEYS */;

-- Copiando estrutura para tabela fotografia-crm.tb_acompanhamento
CREATE TABLE IF NOT EXISTS `tb_acompanhamento` (
  `a_id` int(11) NOT NULL AUTO_INCREMENT,
  `a_dtnasc_bebe` date DEFAULT NULL,
  `a_sexo_bebe` enum('m','f') NOT NULL,
  `a_cenario` varchar(45) DEFAULT NULL,
  `tb_acompanhamento_id_servico` int(11) NOT NULL,
  PRIMARY KEY (`a_id`),
  KEY `fk_tb_acompanhamento_tb_servicos1_idx` (`tb_acompanhamento_id_servico`),
  CONSTRAINT `fk_tb_acompanhamento_tb_servicos1` FOREIGN KEY (`tb_acompanhamento_id_servico`) REFERENCES `tb_servicos` (`id_servico`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela fotografia-crm.tb_acompanhamento: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `tb_acompanhamento` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_acompanhamento` ENABLE KEYS */;

-- Copiando estrutura para tabela fotografia-crm.tb_casamento_civil
CREATE TABLE IF NOT EXISTS `tb_casamento_civil` (
  `cc_id` int(11) NOT NULL AUTO_INCREMENT,
  `cc_noivos` varchar(45) DEFAULT NULL,
  `tb_casamento_civil_id_servico` int(11) NOT NULL,
  PRIMARY KEY (`cc_id`),
  KEY `fk_tb_casamento_civil_tb_servicos1_idx` (`tb_casamento_civil_id_servico`),
  CONSTRAINT `fk_tb_casamento_civil_tb_servicos1` FOREIGN KEY (`tb_casamento_civil_id_servico`) REFERENCES `tb_servicos` (`id_servico`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela fotografia-crm.tb_casamento_civil: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `tb_casamento_civil` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_casamento_civil` ENABLE KEYS */;

-- Copiando estrutura para tabela fotografia-crm.tb_casamento_igreja
CREATE TABLE IF NOT EXISTS `tb_casamento_igreja` (
  `ci_id` int(11) NOT NULL AUTO_INCREMENT,
  `ci_noivos` varchar(45) DEFAULT NULL,
  `tb_casamento_igreja_id_servico` int(11) NOT NULL,
  PRIMARY KEY (`ci_id`),
  KEY `fk_tb_casamento_igreja_tb_servicos1_idx` (`tb_casamento_igreja_id_servico`),
  CONSTRAINT `fk_tb_casamento_igreja_tb_servicos1` FOREIGN KEY (`tb_casamento_igreja_id_servico`) REFERENCES `tb_servicos` (`id_servico`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela fotografia-crm.tb_casamento_igreja: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `tb_casamento_igreja` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_casamento_igreja` ENABLE KEYS */;

-- Copiando estrutura para tabela fotografia-crm.tb_clientes
CREATE TABLE IF NOT EXISTS `tb_clientes` (
  `id_cliente` int(11) NOT NULL AUTO_INCREMENT,
  `nome_cliente` varchar(45) NOT NULL,
  `dtcad_cliente` date DEFAULT NULL,
  `email_cliente` varchar(45) DEFAULT NULL,
  `whatsapp_cliente` varchar(12) DEFAULT NULL,
  `rg_cliente` varchar(12) DEFAULT NULL,
  `cpf_cliente` char(11) DEFAULT NULL,
  PRIMARY KEY (`id_cliente`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela fotografia-crm.tb_clientes: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `tb_clientes` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_clientes` ENABLE KEYS */;

-- Copiando estrutura para tabela fotografia-crm.tb_endereco_cliente
CREATE TABLE IF NOT EXISTS `tb_endereco_cliente` (
  `ec_logradouro` varchar(200) DEFAULT NULL,
  `ec_numero` varchar(8) DEFAULT NULL,
  `ec_bairro` varchar(45) DEFAULT NULL,
  `ec_cep` char(8) DEFAULT NULL,
  `tb_endereco_cliente_id_cliente` int(11) DEFAULT NULL,
  KEY `fk_tb_endereco_cliente_tb_clientes_idx` (`tb_endereco_cliente_id_cliente`),
  CONSTRAINT `fk_tb_endereco_cliente_tb_clientes` FOREIGN KEY (`tb_endereco_cliente_id_cliente`) REFERENCES `tb_clientes` (`id_cliente`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela fotografia-crm.tb_endereco_cliente: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `tb_endereco_cliente` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_endereco_cliente` ENABLE KEYS */;

-- Copiando estrutura para tabela fotografia-crm.tb_endereco_evento
CREATE TABLE IF NOT EXISTS `tb_endereco_evento` (
  `ee_logradouro` varchar(200) DEFAULT NULL,
  `ee_numero` varchar(8) DEFAULT NULL,
  `ee_bairro` char(8) DEFAULT NULL,
  `tb_endereco_evento_id_servico` int(11) NOT NULL,
  KEY `fk_tb_endereco_evento_tb_servicos1_idx` (`tb_endereco_evento_id_servico`),
  CONSTRAINT `fk_tb_endereco_evento_tb_servicos1` FOREIGN KEY (`tb_endereco_evento_id_servico`) REFERENCES `tb_servicos` (`id_servico`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela fotografia-crm.tb_endereco_evento: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `tb_endereco_evento` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_endereco_evento` ENABLE KEYS */;

-- Copiando estrutura para tabela fotografia-crm.tb_ensaio_gestante
CREATE TABLE IF NOT EXISTS `tb_ensaio_gestante` (
  `eg_id` int(11) NOT NULL AUTO_INCREMENT,
  `eg_cenario` varchar(45) DEFAULT NULL,
  `tb_ensaio_gestante_id_servico` int(11) NOT NULL,
  PRIMARY KEY (`eg_id`),
  KEY `fk_tb_ensaio_gestante_tb_servicos1_idx` (`tb_ensaio_gestante_id_servico`),
  CONSTRAINT `fk_tb_ensaio_gestante_tb_servicos1` FOREIGN KEY (`tb_ensaio_gestante_id_servico`) REFERENCES `tb_servicos` (`id_servico`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela fotografia-crm.tb_ensaio_gestante: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `tb_ensaio_gestante` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_ensaio_gestante` ENABLE KEYS */;

-- Copiando estrutura para tabela fotografia-crm.tb_ensaio_infantil
CREATE TABLE IF NOT EXISTS `tb_ensaio_infantil` (
  `ei_id` int(11) NOT NULL AUTO_INCREMENT,
  `ei_nome_crianca` varchar(45) DEFAULT NULL,
  `ei_dtnasc_crianca` date DEFAULT NULL,
  `ei_cenario` varchar(45) DEFAULT NULL,
  `tb_ensaio_infantil_id_servico` int(11) NOT NULL,
  PRIMARY KEY (`ei_id`),
  KEY `fk_tb_ensaio_infantil_tb_servicos1_idx` (`tb_ensaio_infantil_id_servico`),
  CONSTRAINT `fk_tb_ensaio_infantil_tb_servicos1` FOREIGN KEY (`tb_ensaio_infantil_id_servico`) REFERENCES `tb_servicos` (`id_servico`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela fotografia-crm.tb_ensaio_infantil: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `tb_ensaio_infantil` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_ensaio_infantil` ENABLE KEYS */;

-- Copiando estrutura para tabela fotografia-crm.tb_prewedding
CREATE TABLE IF NOT EXISTS `tb_prewedding` (
  `pw_id` int(11) NOT NULL AUTO_INCREMENT,
  `pw_noivos` varchar(45) DEFAULT NULL,
  `tb_prewedding_id_servico` int(11) NOT NULL,
  PRIMARY KEY (`pw_id`),
  KEY `fk_tb_prewedding_tb_servicos1_idx` (`tb_prewedding_id_servico`),
  CONSTRAINT `fk_tb_prewedding_tb_servicos1` FOREIGN KEY (`tb_prewedding_id_servico`) REFERENCES `tb_servicos` (`id_servico`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela fotografia-crm.tb_prewedding: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `tb_prewedding` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_prewedding` ENABLE KEYS */;

-- Copiando estrutura para tabela fotografia-crm.tb_servicos
CREATE TABLE IF NOT EXISTS `tb_servicos` (
  `id_servico` int(11) NOT NULL AUTO_INCREMENT,
  `ambiente_servico` enum('fora','em casa') NOT NULL,
  `dt_evento` date NOT NULL,
  `preco_total` decimal(6,2) DEFAULT '0.00',
  `preco_restante` decimal(6,2) DEFAULT '0.00',
  `status_servico` enum('cancelado','aguardando pagamento','aguardando resposta','em andamento','finalizado') NOT NULL,
  `tb_servicos_id_cliente` int(11) NOT NULL,
  PRIMARY KEY (`id_servico`),
  KEY `fk_tb_servicos_tb_clientes1_idx` (`tb_servicos_id_cliente`),
  CONSTRAINT `fk_tb_servicos_tb_clientes1` FOREIGN KEY (`tb_servicos_id_cliente`) REFERENCES `tb_clientes` (`id_cliente`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela fotografia-crm.tb_servicos: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `tb_servicos` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_servicos` ENABLE KEYS */;

-- Copiando estrutura para tabela fotografia-crm.tb_usuarios
CREATE TABLE IF NOT EXISTS `tb_usuarios` (
  `id_usuario` int(11) NOT NULL AUTO_INCREMENT,
  `email_usuario` varchar(45) NOT NULL,
  `senha_usuario` varchar(100) NOT NULL,
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `email_usuario_UNIQUE` (`email_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela fotografia-crm.tb_usuarios: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `tb_usuarios` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_usuarios` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
