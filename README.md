# Formol
Note : _This is a school project._

**Formol** is a poll system generator built in NodeJS.

## Goal
The goal of this project is to:
 * Add the possibility to create/update/delete polls
 * Add the possibility to get stats about created polls
 * Host or give the possibility to the user to host itself his poll
 * Add the possibility to customize a poll

## Tech choices
We choosen for this project to create a mono-repository.

The backend is built arround:
 * NodeJS
 * [Fastify](https://www.fastify.io/) _as Web micro-framework_
 * [SequelizeJS](https://sequelize.org/v5/) _as Database ORM_
 * [PostgreSQL](https://www.postgresql.org/) _as relational database_
 * [Bull](https://github.com/OptimalBits/bull) _as Task/Message queuing_
 * [Redis](https://redis.io/) _as Task/Message queuing broker (and if needed as cache)_
 * [OpenAPI](https://github.com/fastify/fastify-swagger) _for documenting the REST API._

The frontend is built arround [NextJS](https://nextjs.org/) framework and uses the [MaterialUI](https://material-ui.com/) components library.

Note: _For now, authentication mechanisms are **not planned** for the dashboard. Of course, the technical stack can add new elements on the future of the project._

## Architecture diagram
![Formol Architecture Diagram](.github/wiki/images/formol-architecture-diagram.png)

## Installing
_WIP._

## Contributions guide
Before contributing to the project, please read the [contribution guidelines](CONTRIBUTION.md).
