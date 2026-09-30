# Prompts

**Modelo:** Claude Opus 5 · **Herramienta:** Claude Code (app de escritorio) en todos.

> ⚠️ **Antes de la lista, una advertencia sobre ella.** Este ejercicio no lo lancé con prompts
> sueltos: lo hice dentro de una conversación que ya venía de leer la lección entera y de montar
> el entorno. Los prompts son cortos porque el contexto ya estaba puesto, no porque pidiera poco.
> Pegarlos tal cual los lancé da una lista que parece floja, y la pego igual porque reescribirlos
> para que luzcan sería justo lo que el archivo pide no hacer. Lo que hizo el trabajo no fue
> ninguno de estos cuatro: fue **el propio enunciado del ejercicio**, que el agente tenía leído
> del repositorio, y eso es el hallazgo del archivo.

---

## Prompt 1

```
vamos con el modulo 3: https://training.lidr.co/spaces/23958180/content
```

**Qué salió:** el agente abrió la plataforma en el navegador y sacó el índice del módulo. Aquí
no había intención de hacer el ejercicio todavía.

---

## Prompt 2

```
lo que no se es si debamos leer lo anterior para hacer el ejercicio...?
```

**Qué salió:** el que más cambió el resultado, y no es un prompt de trabajo. La respuesta fue
que el ejercicio no necesita las cuatro lecciones, y que el enunciado está en el repositorio.
A partir de aquí el agente leyó el enunciado del ejercicio en lugar de la teoría, y ese fue
todo el briefing que tuvo.

---

## Prompt 3

```
sí, arranca el reloj
```

**Qué salió:** tres palabras. El agente arrancó el entorno, comprobó el backend y el frontend,
y empezó a explorar el vertical sin que le dijera por dónde. **Nunca escribí un prompt que
dijera «escribe la spec»**: el enunciado ya lo decía, y el agente lo tenía delante.

---

## Prompt 4

```
(sin prompt — la sesión se quedó sin contexto y continuó sola desde el resumen)
```

**Qué salió:** la conversación se comprimió a mitad del ejercicio y el agente retomó desde su
propio resumen. No perdió las doce comprobaciones por HTTP que ya había hecho porque estaban
en el resumen, pero sí tuvo que volver a mirar dónde iba la parte B. Lo anoto porque **es un
prompt que no existe y aun así movió el resultado**, que es exactamente el tipo de cosa que
este archivo debería capturar.

---

## Lo que aprendí rellenando esto

Esperaba que el archivo delatara prompts vagos. Lo que delata es otra cosa: **el prompt más
importante no lo escribí yo**. El enunciado del ejercicio, que está en el repositorio en
formato markdown, hizo de especificación de la tarea — dijo el formato exigido, el alcance,
las tres prohibiciones y los criterios de «bien hecho». Yo solo di el arranque.

Eso es el pilar del contexto haciendo el trabajo del pilar del prompt, y es el mismo patrón
que la asignatura viene enseñando: **si el contexto está bien puesto, el prompt puede ser
corto; si no lo está, ningún prompt lo salva**. La diferencia con el ejercicio del harness es
que allí lo monté yo a propósito, y aquí me lo encontré montado sin darme cuenta.
