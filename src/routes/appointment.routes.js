const express = require("express");
const router = express.Router();
const pool = require("../db/connection");

// Criar agendamento
router.post("/", async (req, res) => {
  try {
    const { cat_id, data_consulta, descricao } = req.body;

    if (!cat_id || !data_consulta) {
      return res.status(400).json({ error: "cat_id e data_consulta são obrigatórios" });
    }

    const dataAgendamento = new Date(data_consulta);
    const agora = new Date();

    if (dataAgendamento < agora) {
      return res.status(400).json({
        error: "Não é possível agendar uma consulta para uma data que já passou."
      });
    }

    const result = await pool.query(
      `INSERT INTO appointments (cat_id, data_consulta, descricao)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [cat_id, data_consulta, descricao]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("ERRO NO BANCO:", error.message);
    res.status(500).json({
      error: "Erro ao criar agendamento",
      details: error.message
    });
  }
});

// Listar agendamentos
router.get("/", async (req, res) => {
    try {
        const query = `
            SELECT 
                a.id, 
                c.nome AS nome_gato, 
                t.nome AS nome_tutor, 
                a.data_consulta, 
                a.descricao, 
                a.status
            FROM appointments a
            JOIN cats c ON a.cat_id = c.id
            JOIN tutors t ON c.tutor_id = t.id
            ORDER BY a.data_consulta DESC
        `;
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Atualizar agendamento
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { data_consulta, descricao, status } = req.body;

    const result = await pool.query(
      `UPDATE appointments 
       SET data_consulta = $1, descricao = $2, status = $3
       WHERE id = $4
       RETURNING *`,
      [data_consulta, descricao, status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Agendamento não encontrado" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Deletar agendamento
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM appointments WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Agendamento não encontrado" });
    }

    res.json({ message: "Agendamento removido com sucesso!" });
  } catch (error) {
    console.error("ERRO AO DELETAR:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// Buscar agendamentos de um gato específico
router.get("/search/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `SELECT a.*, c.nome as nome_gato 
       FROM appointments a
       JOIN cats c ON a.cat_id = c.id
       WHERE a.cat_id = $1`,
      [id]
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});
 // Buscar agendamentos de um tutor específico (para a visão do Tutor no app)
router.get("/tutor/:tutor_id", async (req, res) => {
  try {
    const { tutor_id } = req.params;

    const result = await pool.query(
      `SELECT a.id, c.nome AS nome_gato, a.data_consulta, a.descricao, a.status
       FROM appointments a
       JOIN cats c ON a.cat_id = c.id
       WHERE c.tutor_id = $1
       ORDER BY a.data_consulta DESC`,
      [tutor_id]
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}); 
module.exports = router;