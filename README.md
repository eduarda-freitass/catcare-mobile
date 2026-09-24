# CatCare Mobile

API + projeto de app mobile pra gestão de petshop felino. Trabalho de Programação para Dispositivos Móveis (Etapa 1).

**Equipe:** 
GUILHERME CARDOSO PESSOA LUNA: 565951;
JARDEL MAGALHÂES: ;
MARIA CLARA ZACARIAS MARQUES: 571601;
MARIA EDUARDA CARNEIRO DE FREITAS: 570351;

## O que é

Uma API REST pra cadastrar gatos, tutores e agendamentos de consultas/exames. O app (React Native) vai consumir essa API.

- Público-alvo: clínicas e petshops de gatos / tutores
- Problema que resolve: Petshops e clínicas veterinárias que atendem gatos costumam controlar agendamentos, cadastro de tutores e histórico dos animais em cadernos, planilhas soltas ou grupos de WhatsApp, o que causa esquecimentos, agendamentos duplicados e falta de histórico organizado de cada gato. O CatCare centraliza esses dados numa única API, permitindo que a equipe gerencie tutores, gatos e consultas de forma organizada — e que, futuramente, os próprios tutores acompanhem os agendamentos dos seus pets pelo app.

O app terá duas visões: **Funcionário** (gestão completa: gatos, tutores, agendamentos) e **Tutor** (visão limitada aos próprios gatos e agendamentos).

## Tecnologias

Node.js, Express, PostgreSQL, Docker

## Como rodar

```bash
git clone https://github.com/eduarda-freitass/catcare-mobile.git
cd catcare-mobile
docker compose up --build
```

A API sobe em `http://localhost:3000`.

## Documentação

- [Rotas da API](docs/api.md)
- [Projeto do app (telas, fluxo e endpoints)](docs/app-mobile.md)

## Branches

- `main`: versão estável
- `develop`: integração do que tá em desenvolvimento
- `feature/...`: cada funcionalidade em uma branch própria