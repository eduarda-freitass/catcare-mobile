# Rotas da API

Base: `http://localhost:3000`. Tudo entra e sai em JSON.

## Tutores

| Método | Rota | O que faz |
|---|---|---|
| GET | `/tutors` | lista os tutores |
| GET | `/tutors/:id` | busca um tutor por id |
| POST | `/tutors` | cadastra um tutor |
| PUT | `/tutors/:id` | edita um tutor |
| DELETE | `/tutors/:id` | remove um tutor |

## Gatos

| Método | Rota | O que faz |
|---|---|---|
| GET | `/cats` | lista os gatos (com dados do tutor) |
| GET | `/cats/:id` | busca um gato por id |
| POST | `/cats` | cadastra um gato |
| PUT | `/cats/:id` | edita um gato |
| DELETE | `/cats/:id` | remove um gato |

## Agendamentos

| Método | Rota | O que faz |
|---|---|---|
| GET | `/appointments` | lista os agendamentos |
| GET | `/appointments/search/:id` | lista agendamentos de um gato específico |
| GET | `/appointments/tutor/:tutor_id` | lista agendamentos de um tutor específico |
| POST | `/appointments` | cria um agendamento |
| PUT | `/appointments/:id` | edita um agendamento |
| DELETE | `/appointments/:id` | remove um agendamento |

## Exemplos de corpo (POST)

**Tutor**
```json
{ "nome": "Maria Oliveira", "email": "maria@teste.com", "telefone": "88912345678" }
```

**Gato**
```json
{ "nome": "Katt", "raca": "Siamês", "idade": 2, "tutor_id": 1 }
```

**Agendamento**
```json
{ "cat_id": 1, "data_consulta": "2026-10-10T09:00:00", "descricao": "Consulta de rotina" }
```

> A data do agendamento não pode ser no passado — a API valida isso e devolve erro 400.

## Status HTTP

| Código | Quando |
|---|---|
| 200 | deu certo (GET, PUT, DELETE) |
| 201 | criado com sucesso (POST) |
| 400 | dados inválidos |
| 404 | não encontrado |
| 500 | erro no servidor |

## Relações entre as entidades

- Um tutor tem vários gatos
- Um gato tem vários agendamentos
- Não dá pra criar agendamento pra um gato que não existe (chave estrangeira no banco)