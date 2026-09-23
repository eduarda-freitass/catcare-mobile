const express = require("express");
const router = express.Router();
const pool = require("../db/connection");

// criar gato
router.post("/", async (req, res) => {
  try {
    const { nome, raca, idade, tutor_id } = req.body;

    if (!nome || !tutor_id) {
      return res.status(400).json({ error: "Nome e tutor_id são obrigatórios" });
    }

    const result = await pool.query(
      `INSERT INTO cats (nome, raca, idade, tutor_id)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [nome, raca, idade, tutor_id]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar gato" });
  }
});

// buscar gato por id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "SELECT * FROM cats WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Gato não encontrado" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar gato" });
  }
});

// listar todos os gatos trazendo dados do tutor
router.get("/", async (req, res) => {
  try {
    const query = `
      SELECT 
        c.id, c.nome, c.raca, c.idade,
        t.nome AS tutor_nome, 
        t.telefone AS tutor_telefone
      FROM cats c
      INNER JOIN tutors t ON c.tutor_id = t.id
    `;
    
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error("ERRO AO LISTAR GATOS COM TUTOR:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// atualizar gato
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, idade, raca, tutor_id } = req.body;

    const result = await pool.query(
      `UPDATE cats 
       SET nome = $1, idade = $2, raca = $3, tutor_id = COALESCE($4, tutor_id)
       WHERE id = $5
       RETURNING *`,
      [nome, idade, raca, tutor_id, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Gato não encontrado" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("ERRO AO ATUALIZAR GATO:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// deletar gato
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM cats WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Gato não encontrado" });
    }

    res.json({ message: "Gato removido com sucesso" });
  } catch (error) {
    console.error("ERRO AO DELETAR GATO:", error.message); 
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;