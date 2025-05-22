import Usuario from "../../core/usuario/entitie/Usuario";
import RepositorioUsuario from "../../core/usuario/repository/RepositorioUsuario";
import pool from "./mysql";

export default class RepositorioUsuarioMS implements RepositorioUsuario {
    async inserir(usuario: Usuario) {
        await pool.query(
            "INSERT INTO tb_clientes (nome_usuario, email_usuario, senha_usuario) VALUES (?, ?, ?)",
            [usuario.nome, usuario.email, usuario.senha]
        );
    }

    async buscarPorEmail(email: string): Promise<Usuario|null> {
        try {
            const [rows]: any = await pool.query("SELECT * FROM tb_usuarios WHERE email_usuario = ?", [email]);

            if (rows.length === 0) return null;

            const row = rows[0];

            return {
                id: row.id_cliente,
                nome: row.nome_usuario,
                email: row.email_usuario,
                senha: row.senha_usuario,
            }
        } catch (error) {
            console.error("Erro ao buscar usuário por email:", error);
            return null;
        }
    }
}