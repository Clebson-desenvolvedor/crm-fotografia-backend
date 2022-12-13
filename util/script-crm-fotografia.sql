-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           5.7.36 - MySQL Community Server (GPL)
-- OS do Servidor:               Win64
-- HeidiSQL Versão:              12.3.0.6589
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
  `nome_cliente` varchar(45) NOT NULL,
  `dtcad_cliente` date DEFAULT NULL,
  `email_cliente` varchar(45) DEFAULT NULL,
  `whatsapp_cliente` varchar(12) DEFAULT NULL,
  `cpf_cliente` char(11) DEFAULT NULL,
  `foto_cliente` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_cliente`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8;

-- Exportação de dados foi desmarcado.

-- Copiando estrutura para tabela fotografia-crm.tb_configuracoes_cores
CREATE TABLE IF NOT EXISTS `tb_configuracoes_cores` (
  `cor-primaria` varchar(10) DEFAULT '#c9cfe8',
  `cor-secundaria` varchar(10) DEFAULT '#f1f5f9',
  `cor-texto` varchar(10) DEFAULT '#000000'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- Exportação de dados foi desmarcado.

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

-- Exportação de dados foi desmarcado.

-- Copiando estrutura para tabela fotografia-crm.tb_endereco_servico
CREATE TABLE IF NOT EXISTS `tb_endereco_servico` (
  `ee_logradouro` varchar(200) DEFAULT NULL,
  `ee_numero` varchar(8) DEFAULT NULL,
  `ee_bairro` char(8) DEFAULT NULL,
  `tb_endereco_evento_id_servico` int(11) NOT NULL,
  KEY `fk_tb_endereco_evento_tb_servicos1_idx` (`tb_endereco_evento_id_servico`),
  CONSTRAINT `fk_tb_endereco_evento_tb_servicos1` FOREIGN KEY (`tb_endereco_evento_id_servico`) REFERENCES `tb_servicos` (`id_servico`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Exportação de dados foi desmarcado.

-- Copiando estrutura para tabela fotografia-crm.tb_leads
CREATE TABLE IF NOT EXISTS `tb_leads` (
  `id_lead` int(11) NOT NULL AUTO_INCREMENT,
  `nome_lead` varchar(50) DEFAULT '',
  `whatsapp_lead` varchar(11) DEFAULT '',
  `dtcad_lead` date DEFAULT NULL,
  `email_lead` varchar(100) DEFAULT '',
  `foto_lead` varchar(100) DEFAULT '0',
  `origem_lead` enum('Facebook','Status do WhatsApp','Instagram','Indicação','Site') DEFAULT 'Indicação',
  PRIMARY KEY (`id_lead`)
) ENGINE=MyISAM AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;

-- Exportação de dados foi desmarcado.

-- Copiando estrutura para tabela fotografia-crm.tb_servicos
CREATE TABLE IF NOT EXISTS `tb_servicos` (
  `id_servico` int(11) NOT NULL AUTO_INCREMENT,
  `servico_tipo` varchar(50) DEFAULT NULL,
  `ambiente_servico` enum('fora','em casa') NOT NULL,
  `dt_servico` date NOT NULL,
  `preco_total` decimal(6,2) DEFAULT '0.00',
  `preco_restante` decimal(6,2) DEFAULT '0.00',
  `status_servico` enum('cancelado','aguardando pagamento','aguardando resposta','em andamento','finalizado') NOT NULL,
  `tb_servicos_id_cliente` int(11) NOT NULL,
  `nome_bebe` varchar(50) DEFAULT NULL,
  `dt_nasc_bebe` date DEFAULT NULL,
  `sexo_bebe` enum('M','F') DEFAULT NULL,
  `cenario` varchar(100) DEFAULT NULL,
  `nome_noivos` varchar(100) DEFAULT NULL,
  `nome_crianca` varchar(50) DEFAULT NULL,
  `dt_nasc_crianca` date DEFAULT NULL,
  PRIMARY KEY (`id_servico`),
  KEY `fk_tb_servicos_tb_clientes1_idx` (`tb_servicos_id_cliente`),
  CONSTRAINT `fk_tb_servicos_tb_clientes1` FOREIGN KEY (`tb_servicos_id_cliente`) REFERENCES `tb_clientes` (`id_cliente`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Exportação de dados foi desmarcado.

-- Copiando estrutura para tabela fotografia-crm.tb_servicos_tipo
CREATE TABLE IF NOT EXISTS `tb_servicos_tipo` (
  `tb_servico_tipo_id` int(11) NOT NULL,
  `servico_tipo_nome` varchar(50) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- Exportação de dados foi desmarcado.

-- Copiando estrutura para tabela fotografia-crm.tb_usuarios
CREATE TABLE IF NOT EXISTS `tb_usuarios` (
  `id_usuario` int(11) NOT NULL AUTO_INCREMENT,
  `email_usuario` varchar(45) NOT NULL,
  `senha_usuario` varchar(100) NOT NULL,
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `email_usuario_UNIQUE` (`email_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Exportação de dados foi desmarcado.

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
