# narcisista-web

Página web estática (HTML + JavaScript) servida con nginx. Consume la API `narcisista-api` para
verificar y listar números narcisistas.

## Comandos

```
ENTORNO=dev PUERTO=9090 docker compose -p narcisista-web-dev up -d --build
```

| Entorno | Rama       | Puerto web | API que usa |
|---------|------------|------------|-------------|
| dev     | feature/** | 9090       | 8090        |
| prod    | release/** | 9091       | 8091        |

## Acceso a Jenkins y SonarQube (laboratorio local)

| Herramienta | URL                   | Usuario | Clave               |
|-------------|-----------------------|---------|---------------------|
| Jenkins     | http://localhost:8082 | admin   | `Taller.Devops2026` |
| SonarQube   | http://localhost:9000 | admin   | `Taller.Devops2026` |
