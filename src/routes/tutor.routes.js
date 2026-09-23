const express = require("express");
const router = express.Router();
const pool = require("../db/connection");

// criar tutor
router.post("/", async (req, res) => {
    const { nome, email, telefone } = req.body;

    if (!nome || !email) {
      return res.status(400).json({ error: "Nome e email são obrigatórios" });
    }

    try {
        const query = "INSERT INTO tutors (nome, email, telefone) VALUES ($1, $2, $3) RETURNING *";
        const result = await pool.query(query, [nome, email, telefone]);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// listar tutores
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM tutors");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao listar tutores" });
  }
});

// buscar tutor por id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "SELECT * FROM tutors WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Tutor não encontrado" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar tutor" });
  }
});

// atualizar tutor
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, telefone } = req.body;

    if (!nome) {
      return res.status(400).json({ error: "Nome é obrigatório" });
    }

    const result = await pool.query(
      "UPDATE tutors SET nome = $1, telefone = $2 WHERE id = $3 RETURNING *",
      [nome, telefone, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Tutor não encontrado" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao atualizar tutor" });
  }
});

// deletar tutor
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM tutors WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Tutor não encontrado" });
    }

    res.json({ message: "Tutor removido com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao deletar tutor" });
  }
});

module.exports = router;