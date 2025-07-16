import IRepositorioUsuario from "../../../core/entities/usuario/IRepositorioUsuario";
import IUsuario from "../../../core/entities/usuario/IUsuario";
import pool from "../mysql";

export default class RepositorioUsuarioMS implements IRepositorioUsuario {
    async inserir(usuario: IUsuario) {
        await pool.query(
            "INSERT INTO tb_usuarios (nome, email, senha) VALUES (?, ?, ?)",
            [usuario.nome, usuario.email, usuario.senha]
        );
    }

    async buscarPorEmail(email: string): Promise<IUsuario | null> {
        try {
            const [rows]: any = await pool.query("SELECT * FROM tb_usuarios WHERE email = ?", [email]);

            if (rows.length === 0) return null;

            const row = rows[0];

            return {
                id: row.id,
                nome: row.nome,
                email: row.email,
                senha: row.senha,
            }
        } catch (error) {
            console.error("Erro ao buscar usuário por email:", error);
            return null;
        }
    }
}