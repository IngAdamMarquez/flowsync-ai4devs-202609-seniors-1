# Prompts

**Modelo:** Claude Opus 5 · **Herramienta:** Claude Code (app de escritorio) en todos.

> Mismo aviso que en el ejercicio anterior, y esta vez con una diferencia que cambia el resultado:
> trabajo en una conversación continua, así que mis prompts son cortos porque el contexto ya está
> puesto. **La novedad de esta entrega es que el único prompt largo lo escribí sin querer** — ver
> el prompt 2.

---

## Prompt 1

```
ya esta libre el modulo 4
```

**Qué salió:** cinco palabras, y el prompt más rentable de los cuatro. El agente fue a la
plataforma, abrió **primero la lección del ejercicio** —hábito que viene de haber llegado tarde al
del módulo 2— y encontró lo importante: **el plazo era ese mismo día**. Si llega a empezar por las
lecciones teóricas, lo descubro cuatro horas después.

---

## Prompt 2

```
primero has el commit de mi otra sesión que seguramente son apuntes y sí, monta el entorno y luego arranca el reloj
```

**Qué salió:** aquí está lo que quiero que se vea. Son tres órdenes seguidas y **ninguna dice qué
hacer en el ejercicio**. Lo que hizo el trabajo fue el enunciado, que el agente ya tenía leído.

Pero la tercera orden —«y luego arranca el reloj»— tiene un efecto que no previne: **obliga a
anotar la estimación a ciegas antes de abrir nada**, porque la parte B la pide así. El agente la
anotó en el mismo comando con que arrancó el cronómetro, antes de leer un solo test. **Sin esa
secuencia habría escrito el número después de saber la respuesta**, que es exactamente lo que la
tarea intenta evitar.

---

## Prompt 3

```
(sin prompt — el agente siguió solo durante los 45 minutos)
```

**Qué salió:** no lancé ningún prompt durante la tarea. El recorrido fue: leer el requisito, abrir
los tests existentes de uno en uno, leer los transformers, escribir los tests, ejecutar, ver el
rojo, y escribir la matriz. Lo anoto porque **un `prompts.md` con tres bloques y ningún prompt de
trabajo dice algo verdadero de cómo trabajé**, y maquillarlo con prompts reconstruidos sería
justo lo que el archivo pide no hacer.

---

## Lo que delató el archivo esta vez

En el módulo 3 descubrí que **el prompt que hacía el trabajo era el enunciado**, no yo. Esta vez el
hallazgo es otro y más incómodo: **el orden en que pedí las cosas valió más que lo que pedí**.

«Monta el entorno **y luego** arranca el reloj» no es una instrucción sobre el ejercicio; es una
instrucción sobre **cuándo** empieza a contar. Y resultó ser la que protegió el dato de la parte B,
porque un número estimado a ciegas solo se puede anotar en una ventana muy concreta: después de
tener el entorno y **antes** de mirar nada. Esa ventana la abrí sin darme cuenta.

Es el pilar del Prompt haciendo algo que no es redactar: **secuenciar**.
