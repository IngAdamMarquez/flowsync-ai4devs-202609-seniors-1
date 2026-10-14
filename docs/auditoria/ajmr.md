# Auditoría de las reglas de proceso

> Reglas auditadas: la sección `## Reglas de proceso` de `CLAUDE.md` (líneas 129-133).
> `AGENTS.md` es un symlink que apunta ahí.

## Mi expectativa, anotada ANTES de mirar el historial

| # | Regla (resumida) | Lo que creía |
|:-:|---|:-:|
| 1 | Antes de tocar código, rama nueva `feat/<slug>`; nunca commitear directo en `main`/`s1/start` | **sí** |
| 2 | Al cerrar la tarea: skill `/commit`, luego `gh pr create` con descripción completa | **sí** |
| 3 | Después de abrir el PR: pasar el subagente `adversarial-reviewer` | **no** |
| 4 | No repetir el resumen en el chat; responder solo con la URL del PR | **ni idea** |

---

## La tabla

**Contrastado contra los últimos 15 commits de `s4/start`** (de `7bf25a9` a `368958d`) y el estado
actual de los archivos. **No se modificó ningún archivo del proyecto.**

> 📌 **La regla 2 son dos reglas.** El enunciado avisa: *"si necesitas varias frases, puede que
> estés mezclando más de una regla"*. Pedía dos cosas —usar `/commit` y abrir el PR— **con
> veredictos distintos**, así que va en dos filas.

| # | Qué pide la regla | Qué se revisó | Veredicto | Evidencia | Qué haría con ella |
|:-:|---|---|---|---|---|
| **1** | Trabajar en una rama `feat/<slug>` y no commitear directo en `main` ni en `s1/start` | `git log -15 --pretty=%h %p` · `git log --all --format=%s \| grep Merge` · `git branch -a` · `git log --format=%ae/%ce` | **No se puede comprobar** | **El historial está reescrito.** Autor ≠ committer en **11 de 15** (escribe `earhackerdem@gmail.com`, commitea `direccion.ai4devs@lidr.co`), **0 merges en todo el repo**, **0 ramas `feat/*`** y **0 subjects con `(#N)`**. Un rebase borra la rama de origen: **no queda forma de saber si existió** | **Reformularla.** Tal como está, cualquier rebase la vuelve inauditable. La versión comprobable habla del PR, no de la rama |
| **2a** | Al cerrar la tarea, usar la skill `/commit` *(que genera `tipo(scope): descripción`)* | `.claude/skills/commit/SKILL.md` para saber qué formato produce · `git log -15 --format=%s` contra ese patrón | **Se cumple** *(con matiz)* | **13 de 15** siguen `tipo(scope): desc`. Los 2 que no son `s2/end: criterios de aceptación…` y `s2/end: PRD del MVP…` — **llevan un nombre de rama donde va el tipo**. ⚠️ El formato **no prueba que la skill se usara**: se escribe igual a mano | **Convertirla en comprobación automática.** El formato sí es verificable con un hook o en CI; **lo que no se puede comprobar es si se usó la skill**, y tampoco importa |
| **2b** | Después, `gh pr create` con una descripción completa en el cuerpo del PR | `git log -15` buscando referencias a PR · intento de consultar los PRs del repo | **No se puede comprobar** | **Un PR no deja rastro en el repositorio local.** Vive en GitHub, y hoy `LIDR-academy/flowsync-ai4devs-202609-seniors-1` **devuelve 404** por nombre, por ID, autenticado y sin autenticar. Falta: acceso a la API de PRs | **Dejarla**, pero sabiendo que **solo la puede auditar quien tenga acceso a la API**, no el repo |
| **3** | Pasar el subagente `adversarial-reviewer` sobre el PR antes de darlo por terminado | `.claude/agents/adversarial-reviewer.md` · `git log -15` · `.claude/settings.json` | **No se puede comprobar** | **El subagente existe** y está definido, pero **ejecutarlo no escribe nada**: ni commit, ni fichero, ni entrada en `settings.json`. **No hay un solo artefacto que distinga "se pasó" de "no se pasó"** | **Convertirla en comprobación automática.** Si su paso dejara un comentario en el PR —como enseñó el M5— **la regla pasaría a ser auditable sin cambiar nada más** |
| **4** | No repetir el resumen en el chat; responder solo con la URL del PR | `git log -15` · todo el árbol de trabajo | **No se puede comprobar** | **Es una regla sobre la conversación, y la conversación no está en el repositorio.** Ningún archivo, commit ni configuración puede testificar sobre ella. Falta: el transcript de la sesión, que por diseño se pierde | **Borrarla** — ver la tercera línea |

> ✅ **Comprobado a mano, no por resumen del agente:** la fila 1. Corrí yo
> `git log -15 --pretty="%h | A:%ae | C:%ce"` y leí los quince pares. **Sin mirar esa columna, la
> fila 1 habría salido «no se cumple»** — que es exactamente la conclusión equivocada.

### El reparto

| Veredicto | Filas |
|---|:-:|
| Se cumple | **1** |
| No se cumple | **0** |
| **No se puede comprobar** | **4** |

---

## Las tres líneas

1. **La regla 1 es en la que más me equivoqué.** Dije **sí** con seguridad, y la respuesta real es
   **no se puede comprobar**: el historial está reescrito —autor distinto del committer en 11 de 15—
   y un rebase borra la rama de origen. **Me equivoqué dos veces: en el veredicto y en creer que
   había algo que mirar.**

2. **La regla 4 —no repetir el resumen en el chat— no se puede comprobar con nada, y no tiene
   arreglo dentro del repositorio:** habla de la conversación, y la conversación no se versiona. Lo
   único que la haría verificable es **cambiar lo que pide**: en vez de prohibir repetir el resumen,
   **exigir que el cuerpo del PR no esté vacío**, que sí deja evidencia.

3. **Eliminaría la segunda mitad de la regla 1 —«nunca commitear directo en `main`/`s1/start`»— por
   el caso de "ya lo garantiza otra herramienta":** la protección de ramas de GitHub lo impide de
   forma determinista y para todo el mundo, **sin depender de que un modelo lo recuerde**. Pedírselo
   por escrito a un agente es la versión débil de algo que la plataforma ya hace fuerte.

---

## 🧭 Lo que me llevo

**Cuatro de cinco filas salieron «no se puede comprobar», y no por falta de tiempo.** Tres de las
cuatro reglas **piden cosas que no dejan rastro**: pasar un subagente, abrir un PR con buen cuerpo,
y no repetir un resumen en un chat.

> La [lección 1](../../contenidos/modulo-05/01-de-la-regla-al-guardarrail.md) dice que las reglas se
> colocan **según cómo fallan**. Lo que esta auditoría añade: **antes de eso hay que preguntarse si
> fallar deja marca.** Una regla que no deja marca **no se puede colocar en ninguna capa**, porque
> no hay nada que la capa pueda mirar.

**Y la trampa que casi me come:** el historial parecía gritar «aquí nadie creó ramas» — lineal, sin
merges, sin `feat/*`. **La columna de committer es lo único que lo desmonta**, y no se ve en un
`git log` normal.
