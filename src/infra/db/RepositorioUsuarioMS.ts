import Usuario from "../../core/usuario/entitie/Usuario";
import RepositorioUsuario from "../../core/usuario/repository/RepositorioUsuario";
import pool from "./mysql";

export default class RepositorioUsuarioMS implements RepositorioUsuario {
    async inserir(usuario: Usuario) {
        await pool.query(
            "INSERT INTO tb_clientes (nome_usuario, email_usuario, sennha_usuario) VALUES (?, ?, ?)",
            [usuario.nome, usuario.email, usuario.senha]
        );
    }

    async buscarPorEmail(email: string): Promise<Usuario | null> {
        const [rows] = await pool.query("SELECT * FROM tb_clientes WHERE email_usuario = ?", [email]);

        return {
            id: "1",
            nome: "nome do usuario",
            email: "email do usuario",
            senha: "senha"
        }
    }
}