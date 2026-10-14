# Prompts

**Modelo:** Claude Opus 5 · **Herramienta:** Claude Code (app de escritorio) en todos.

> Como en las tres entregas anteriores, trabajo en una conversación continua, así que los prompts
> son cortos porque el contexto ya está puesto. Los pego tal cual.

---

## Prompt 1

```
vamos con el modulo 5
```

**Qué salió:** el agente fue **primero a la lección del ejercicio**, no a la teoría — hábito que
viene de haber llegado tarde al del M2. Encontró lo importante: **el plazo era ese mismo día**.

Y encontró un segundo problema que no esperaba ninguno de los dos: **el repositorio del curso había
dejado de resolver**. 404 por nombre, por ID, autenticado y sin autenticar.

---

## Prompt 2

```
primero lee los demas y luego el ejercicio
```

**Qué salió:** leyó las cuatro lecciones y escribió los apuntes.

---

## Prompt 3 — **el que corrigió al agente**

```
no los veo marcados como completados
```

**Qué salió:** el agente había leído las cuatro lecciones **sin marcarlas en la plataforma** y
**sin añadir el módulo a mi índice**. Dos cosas que venía haciendo en los módulos anteriores y que
aquí se saltó.

> 🔑 **Lo anoto porque es un prompt de cinco palabras que destapó un incumplimiento de proceso** —
> y el ejercicio de hoy va exactamente de eso. **La diferencia es que aquí había un humano mirando
> la pantalla.** Si nadie abre la plataforma, el estado habría quedado mal sin que saltara nada:
> el mismo fallo silencioso que la lección 1 describe.

---

## Prompt 4 — **cuatro palabras, y son el entregable**

```
sí, sí, no, ni idea
```

**Qué salió:** es mi expectativa sobre las cuatro reglas, anotada **antes de mirar el historial**,
como pide la parte B. El agente la congeló en el archivo y **después** arrancó el reloj.

> 🎯 **De todo lo que escribí hoy, estas cuatro palabras son lo único que el ejercicio no podía
> obtener sin mí.** La tabla la puede construir un agente con `git log`. **El «sí» equivocado de la
> regla 1 no: ese tenía que ponerlo alguien que creyera que lo sabía.**

---

## Lo que delató el archivo esta vez

En el M3 descubrí que **el prompt que hacía el trabajo era el enunciado**. En el M4, que **el orden
en que pedí las cosas valió más que lo que pedí**. Esta vez es más incómodo:

> ### Mi aportación al ejercicio fueron cuatro palabras, y una estaba mal.

Y eso **no es un problema del prompt: es el ejercicio funcionando**. La parte B pide precisamente
la distancia entre lo que creías y lo que hay. **Un prompt mejor habría producido la misma tabla y
habría destruido el dato**, porque el dato es mi error.

**El prompt 3 es el otro hallazgo**, y va en la dirección contraria: cinco palabras mías pillaron
al agente saltándose un paso que llevaba cuatro módulos cumpliendo. **La regla existía, se había
cumplido siempre, y falló en silencio.** Es la historia con la que abre la lección 1 del módulo,
ocurriéndome a mí mientras leía esa lección.
