const request = require("supertest");
const app = require("./src/index");
const pool = require("./src/db/connection");

describe("Testes de Integração", () => {
  afterAll(async () => {
    await pool.end();
  });

  it("Deve criar um tutor seguindo o esquema do banco", async () => {
    const res = await request(app)
      .post("/tutors")
      .send({
        nome: "Maria Oliveira",
        email: `maria${Date.now()}@teste.com`,
        telefone: "88912345678"
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.nome).toBe("Maria Oliveira");
  });

  it("Deve falhar ao criar tutor sem nome", async () => {
    const res = await request(app)
      .post("/tutors")
      .send({ email: "semnome@teste.com" });

    expect(res.statusCode).toBe(400);
  });

  it("Deve falhar ao tentar criar um agendamento para um gato inexistente", async () => {
    const res = await request(app)
      .post("/appointments")
      .send({
        cat_id: 9999,
        data_consulta: new Date(Date.now() + 86400000), // amanhã
        descricao: "Consulta de rotina"
      });

    expect(res.statusCode).toBeGreaterThanOrEqual(400);
  });

  it("Deve falhar ao agendar consulta para data no passado", async () => {
    const res = await request(app)
      .post("/appointments")
      .send({
        cat_id: 1,
        data_consulta: "2020-01-01T09:00:00",
        descricao: "Consulta antiga"
      });

    expect(res.statusCode).toBe(400);
  });
});