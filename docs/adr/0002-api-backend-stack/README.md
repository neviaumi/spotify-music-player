# API backend stack

- Status: proposed
- Deciders: [davidNHK](https://github.com/davidNHK)
- Date: 2021-09-25

Technical Story: [Issues 1491](https://github.com/davidNHK/spotify-music-player/issues/1491)

## Context and Problem Statement

In [ADR 0001](docs/adr/0001-cache-recommendation-feed/README.md) I decide build my own backend.

So in this ADR would aim for select technical stacks like language, framework...etc.

[Architecture here](./puml/architecture.puml)

## Decision Drivers

- Easy to deployment
- Easily get started like one ~ two command to get project setup
- Popular enough
- Solution have skills grown on contributor
- To avoid so many languages within projects. General purpose language is preferred

## Considered Options

- Rust + [Rocket](https://rocket.rs/)
- Python + [FastAPI](https://fastapi.tiangolo.com/)
- NodeJS + [NestJS](https://docs.nestjs.com/)

## Decision Outcome

Chosen option: "[option 1]", because [justification. e.g., only option, which meets k.o. criterion decision driver | which resolves force force | … | comes out best (see below)].

## Pros and Cons of the Options

### Rust

Language liked by developer from 2016 ~ 2021 [stackoverflow](https://insights.stackoverflow.com/survey/2021#technology-most-loved-dreaded-and-wanted)

- Good, because it is fast growing and popular language that introduce in 21-century
- Good, because Rust can build webassembly natively
- Good, because language feature let developer think more
- Good, because best performance
- Bad, because [api server support is poor](https://macwright.com/2021/01/15/rust.html)
- Bad, because steep learning curve

### Python

Generic scripting language that support many purpose like CLI, API, Deployment, Load Test...etc.

- Good, because it is my seconds language
- Good, because performance in top 20 list
- Good, because it can refresh my knowledge after python have async support
- Good, because widely thing can support by python
- Bad, because feeling not much new stuff
- Bad, because missing the chance to get in touch with Language that introduce in 21-century

### NodeJS

JS in Backend

- Good, because it is my most family language as of now
- Good, because easily configure CI pipelines as whole project share same stack
- Bad, because no new thing can learn from, all things is already exist in mind
