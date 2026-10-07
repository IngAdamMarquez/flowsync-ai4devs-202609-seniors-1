# Trazabilidad · «Lo que cada tarea muestra de su responsable»

> Requisito de `openspec/specs/tasks/spec.md`.
> Tests escritos en `backend/tests/functional/tasks/assignee.spec.ts`.

## Matriz de trazabilidad

**Scenarios en el requisito: 3 · Cubiertos: 0**

*(Cubiertos = cubiertos por la suite **antes** de tocar nada. Los tests que escribí van después.)*

| Scenario | Test que lo cubre | Estado | Qué me faltó |
|---|---|---|---|
| El `assignee` de una tarea trae el nombre y las iniciales de su responsable | — | **No cubierto** | No hay ni un test de tareas: `backend/tests/functional/` solo tiene `auth/` |
| El `assignee` no incluye el email ni otro dato de la cuenta, ni suelta ni en la lista | — | **No cubierto** | Igual que el anterior: no existe la carpeta `tasks/` |
| Un responsable registrado sin nombre llega con nombre nulo y con sus iniciales | `Auth \| iniciales / sin nombre, las iniciales salen del email` | **No lo sé** | Ese test comprueba las iniciales **en la respuesta del login**, no en el `assignee` de una tarea. Es la misma propiedad calculada por el mismo getter, pero por otra superficie: si la cobertura se traza por comportamiento observable no cuenta, y si se traza por camino de código sí |

### Los tests que faltaban

| Test escrito | Resultado |
|---|:-:|
| `el responsable llega con nombre e iniciales en las tres superficies` | 🟢 |
| `el responsable no trae el email ni ningun otro dato de la cuenta` | 🔴 |
| `un responsable sin nombre llega con nombre nulo y sus iniciales` | 🟢 |

**La suite queda 22 verdes y 1 rojo. El rojo se entrega en rojo.**

### Qué dice el rojo

El requisito prohíbe exponer datos de la cuenta junto a la tarea, «en particular su email».
Esto es lo que sale hoy por cada superficie:

| Superficie | Campos del `assignee` |
|---|---|
| `POST /api/v1/tasks` (alta) | `createdAt, email, fullName, id, initials, updatedAt` 🔴 |
| `GET /api/v1/tasks` (lista) | `createdAt, email, fullName, id, initials, updatedAt` 🔴 |
| `GET /api/v1/tasks/:id` (detalle) | `fullName, id, initials` 🟢 |

**La pieza correcta existe y no se usa en dos de los tres sitios.** Hay un transformer del
responsable que devuelve exactamente los tres campos buenos, y su comentario dice, literal, que
*deliberadamente no se reutiliza* el transformer de usuario «que incluye el email y las fechas de la
cuenta». El detalle lo usa. La lista y el alta usan el otro.

**Y la suite estaba en verde.** 20 de 20, antes de que yo escribiera nada.

## Las tres líneas

1. **Creía cubiertos 1 de 3. Lo estaban 0.** El 1 era el scenario del responsable sin nombre: había
   un `initials.spec.ts` y di por hecho que cubría las iniciales. Cubre las de la cuenta en el
   login, no las del responsable de una tarea.

2. **No supe si faltaba un test o faltaba la regla en «La tarea no filtra datos de cuenta»:** el
   requisito prohíbe «ningún otro dato de esa cuenta» y el scenario prohíbe «el email ni ningún otro
   dato de acceso»; la lista filtra además `createdAt` y `updatedAt`, que son dato de la cuenta pero
   no dato de acceso — así que según cuál de las dos frases mande, eso es un defecto o es algo que
   nadie escribió.

3. **El scenario no dice que el `assignee` deba traer `id`, y mi test lo exige:** afirmo el conjunto
   exacto `{id, fullName, initials}`, así que si alguien quitara el `id` mi test se pondría rojo sin
   que ningún scenario lo pida — me inventé esa parte del contrato al elegir comprobar la forma
   entera en vez de solo la ausencia del email.

> **Una cuarta, que no se pide pero es la que más me llevo:** el scenario dice «suelta o dentro de
> la lista» y yo añadí **la respuesta del alta** como tercera superficie. Nadie me lo pidió, y es
> donde saltó primero el rojo. Si me hubiera ceñido a las dos superficies nombradas, el defecto
> también habría salido — pero por la lista, no por el alta, y el alta habría quedado sin comprobar
> para siempre.
