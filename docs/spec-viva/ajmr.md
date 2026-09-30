# Cuentas y acceso

## Purpose

Permitir que una persona cree una cuenta en FlowSync, entre con ella y salga cuando quiera,
de forma que el resto de la aplicación sepa siempre quién está delante y pueda negar el acceso
a quien no lo esté.

## Requirements

### Requirement: Alta de cuenta

El sistema SHALL permitir crear una cuenta con un correo y una contraseña, y SHALL dejar a la
persona con la sesión ya iniciada, sin pedirle que entre otra vez a continuación.

#### Scenario: Alta con datos válidos

- **WHEN** alguien se da de alta con un correo no registrado, una contraseña válida y su
  confirmación coincidente
- **THEN** la cuenta queda creada
- **AND** la respuesta incluye un token de sesión utilizable de inmediato
- **AND** la respuesta incluye los datos públicos de la cuenta: identificador, nombre completo,
  correo, iniciales y las fechas de creación y última modificación
- **AND** la respuesta NO incluye la contraseña en ninguna forma

#### Scenario: El correo ya está registrado

- **WHEN** alguien se da de alta con un correo que ya pertenece a otra cuenta
- **THEN** el alta se rechaza indicando que el correo ya está en uso
- **AND** no se crea una segunda cuenta con ese correo

#### Scenario: La confirmación no coincide

- **WHEN** alguien se da de alta y la confirmación de contraseña no es idéntica a la contraseña
- **THEN** el alta se rechaza indicando qué campo falla
- **AND** no se crea ninguna cuenta

#### Scenario: Falta la confirmación de contraseña

- **WHEN** alguien se da de alta sin enviar el campo de confirmación
- **THEN** el alta se rechaza indicando que ese campo debe venir

### Requirement: Reglas de la contraseña

El sistema SHALL exigir que la contraseña tenga al menos 8 caracteres y como mucho 32, y SHALL
rechazar el alta sin crear la cuenta cuando no se cumpla.

#### Scenario: Contraseña demasiado corta

- **WHEN** alguien se da de alta con una contraseña de menos de 8 caracteres
- **THEN** el alta se rechaza señalando el campo de contraseña

#### Scenario: Contraseña demasiado larga

- **WHEN** alguien se da de alta con una contraseña de más de 32 caracteres
- **THEN** el alta se rechaza señalando el campo de contraseña

### Requirement: Reglas del correo

El sistema SHALL exigir que el correo tenga forma de dirección de correo y no supere los 254
caracteres, y SHALL tratar el correo como el identificador único de la cuenta.

#### Scenario: Correo mal formado

- **WHEN** alguien se da de alta con un texto que no es una dirección de correo
- **THEN** el alta se rechaza señalando el campo de correo

### Requirement: Nombre completo

El sistema SHALL aceptar cuentas sin nombre completo, pero SHALL exigir que quien se da de alta
se pronuncie sobre él: enviarlo con un valor o enviarlo explícitamente vacío.

#### Scenario: Alta sin nombre completo

- **WHEN** alguien se da de alta enviando el nombre completo explícitamente vacío
- **THEN** la cuenta se crea igualmente
- **AND** la cuenta queda sin nombre completo

#### Scenario: Alta omitiendo el campo del nombre

- **WHEN** alguien se da de alta sin incluir el campo del nombre completo
- **THEN** el alta se rechaza indicando que ese campo debe venir

### Requirement: Iniciales de la cuenta

El sistema SHALL calcular unas iniciales de dos letras mayúsculas para cada cuenta, sin
almacenarlas, de modo que la interfaz siempre tenga algo con lo que representar a la persona
aunque no haya dado su nombre.

#### Scenario: Nombre con nombre y apellido

- **WHEN** la cuenta tiene un nombre completo de dos o más palabras
- **THEN** las iniciales son la primera letra de la primera palabra y la primera letra de la
  segunda, en mayúsculas

#### Scenario: Nombre de una sola palabra

- **WHEN** la cuenta tiene un nombre completo de una sola palabra
- **THEN** las iniciales son las dos primeras letras de esa palabra, en mayúsculas

#### Scenario: Cuenta sin nombre completo

- **WHEN** la cuenta no tiene nombre completo
- **THEN** las iniciales se derivan del correo
- **AND** siguen siendo dos letras mayúsculas

### Requirement: Inicio de sesión

El sistema SHALL permitir iniciar sesión con el correo y la contraseña de una cuenta existente,
y SHALL entregar un token de sesión válido cuando las credenciales sean correctas.

#### Scenario: Credenciales correctas

- **WHEN** alguien entra con el correo y la contraseña de una cuenta existente
- **THEN** recibe un token de sesión utilizable de inmediato
- **AND** recibe los datos públicos de su cuenta

#### Scenario: Contraseña incorrecta

- **WHEN** alguien entra con un correo existente y una contraseña que no es la suya
- **THEN** el acceso se deniega
- **AND** no se entrega ningún token

### Requirement: No revelar qué correos existen

El sistema SHALL responder con el mismo mensaje y el mismo resultado tanto si el correo no
existe como si existe pero la contraseña es incorrecta, de forma que nadie pueda averiguar
qué correos están registrados probando el formulario de acceso.

#### Scenario: Correo no registrado

- **WHEN** alguien entra con un correo que no pertenece a ninguna cuenta
- **THEN** el acceso se deniega con el mismo mensaje que si la contraseña fuera incorrecta
- **AND** el mensaje no menciona si el problema está en el correo o en la contraseña

### Requirement: Acceso a los datos de la propia cuenta

El sistema SHALL permitir a quien tiene una sesión iniciada consultar los datos públicos de su
propia cuenta, y SHALL denegar esa consulta a quien no la tenga.

#### Scenario: Consulta con sesión iniciada

- **WHEN** alguien con un token de sesión válido consulta su cuenta
- **THEN** recibe los datos públicos de la cuenta a la que pertenece ese token

#### Scenario: Consulta sin sesión

- **WHEN** alguien consulta los datos de cuenta sin presentar ningún token
- **THEN** la consulta se deniega por falta de autenticación

#### Scenario: Consulta con un token que no vale

- **WHEN** alguien consulta los datos de cuenta presentando un token inexistente o ya revocado
- **THEN** la consulta se deniega por falta de autenticación

### Requirement: Cierre de sesión

El sistema SHALL permitir cerrar la sesión, y SHALL invalidar el token en el servidor, no solo
en el dispositivo, de modo que una copia de ese token tampoco sirva después.

#### Scenario: Cierre de sesión con sesión activa

- **WHEN** alguien con un token válido cierra su sesión
- **THEN** la operación se confirma

#### Scenario: El token deja de servir

- **WHEN** se intenta usar un token después de haber cerrado la sesión con él
- **THEN** la petición se deniega por falta de autenticación

### Requirement: Continuidad de la sesión entre visitas

El sistema SHALL conservar la sesión en el navegador entre recargas y cierres de pestaña, y
SHALL comprobarla contra el servidor al volver, de modo que una sesión ya revocada no aparente
seguir viva.

#### Scenario: Recarga con sesión guardada y válida

- **WHEN** la persona recarga la aplicación y hay una sesión guardada que el servidor sigue
  aceptando
- **THEN** vuelve a estar dentro sin escribir sus credenciales
- **AND** ve sus datos de cuenta actualizados con lo que responde el servidor

#### Scenario: Recarga con sesión guardada ya revocada

- **WHEN** la persona recarga la aplicación y la sesión guardada ya no la acepta el servidor
- **THEN** la aplicación la trata como no autenticada
- **AND** la lleva al acceso

#### Scenario: Mientras se comprueba la sesión

- **WHEN** la aplicación arranca y todavía no sabe si la sesión guardada vale
- **THEN** no muestra ni la zona privada ni el formulario de acceso
- **AND** no redirige a ningún sitio hasta saberlo

### Requirement: Separación entre la zona privada y la de acceso

El sistema SHALL impedir que alguien sin sesión llegue a la zona privada, y SHALL impedir que
alguien con sesión se quede en las pantallas de acceso y alta.

#### Scenario: Zona privada sin sesión

- **WHEN** alguien sin sesión abre una dirección de la zona privada
- **THEN** se le lleva a la pantalla de acceso

#### Scenario: Pantalla de acceso con sesión

- **WHEN** alguien con sesión iniciada abre la pantalla de acceso o la de alta
- **THEN** se le lleva a la zona privada

#### Scenario: Dirección que no existe

- **WHEN** alguien abre una dirección que la aplicación no reconoce
- **THEN** se le lleva a la zona privada, y desde ahí las dos reglas anteriores deciden si se
  queda o va al acceso

### Requirement: El cierre de sesión nunca deja a la persona atrapada

El sistema SHALL cerrar la sesión en el dispositivo aunque la llamada al servidor falle, porque
el objetivo de quien pulsa «salir» es dejar de estar dentro.

#### Scenario: El servidor no responde al cerrar sesión

- **WHEN** la persona cierra su sesión y la llamada al servidor falla
- **THEN** queda igualmente fuera en su dispositivo
- **AND** no se le muestra un error que le impida continuar

---

# Parte B · Las tres listas

## 1. Requisitos escritos frente a requisitos comprobados

**Escritos: 12 requisitos, 27 escenarios.**
**Comprobados ejecutando el sistema: 6 requisitos completos y 1 a medias, 15 escenarios.**

Separo dos cosas que el enunciado podría dejar juntas, porque no valen lo mismo:

- **Ejecutado** — lancé la petición contra el sistema levantado y vi la respuesta real.
- **Leído** — abrí el código que lo implementa y dice eso, pero nunca lo vi ocurrir.

Cuento como comprobado solo lo ejecutado. Lo leído está un escalón por encima de
*«suena razonable»*, pero sigue siendo el código contándome lo que hace, no el sistema
enseñándomelo.

| # | Requisito | Escenarios | Ejecutados | Leídos |
|:-:|---|:-:|:-:|:-:|
| 1 | Alta de cuenta | 4 | 2 | 2 |
| 2 | Reglas de la contraseña | 2 | 0 | 2 |
| 3 | Reglas del correo | 1 | 0 | 1 |
| 4 | Nombre completo | 2 | **2** | 0 |
| 5 | Iniciales de la cuenta | 3 | **3** | 0 |
| 6 | Inicio de sesión | 2 | **2** | 0 |
| 7 | No revelar qué correos existen | 1 | **1** | 0 |
| 8 | Acceso a los datos de la propia cuenta | 3 | **3** | 0 |
| 9 | Cierre de sesión | 2 | **2** | 0 |
| 10 | Continuidad de la sesión entre visitas | 3 | 0 | 3 |
| 11 | Separación entre zona privada y acceso | 3 | 0 | 3 |
| 12 | El cierre de sesión nunca deja atrapado | 1 | 0 | 1 |
| | **Total** | **27** | **15** | **12** |

**Los doce escenarios sin ejecutar caen en dos grupos, y no es casualidad.**

Los de la capa de navegador (requisitos 10, 11 y 12: nueve escenarios, un tercio del total)
no los ejecuté porque comprobarlos pide abrir el navegador, recargar, revocar un token por
detrás y volver, y tirar el servidor a mitad de un cierre de sesión. Cada uno cuesta lo que
cuestan quince peticiones a la API. Los tres de reglas de validación (requisitos 2 y 3) los
dejé porque leer la regla en el validador se parece tanto a comprobarla que casi cuela —
y precisamente por eso los separo.

**La spec cubre las dos capas. Lo comprobado es prácticamente solo una.** Escribir la capa
de navegador costó cinco minutos; comprobarla habría costado más que todo lo demás junto.

## 2. Incoherencias que aparecieron al escribirla

1. **Cuatro operaciones de la misma vertical devuelven la respuesta con tres formas
   distintas.** Alta y acceso envuelven token y usuario dentro de un contenedor; consultar la
   cuenta devuelve el usuario directamente en ese contenedor, sin el nivel intermedio; cerrar
   sesión devuelve solo un mensaje, sin contenedor ninguno. **Dónde se ve:** poniendo las
   cuatro respuestas de la API una al lado de otra.
2. **El alta crea una cuenta y responde 200, no 201.** **Dónde se ve:** en la respuesta del
   alta, comparada con lo que la propia operación hace.
3. **Hay dos formas de decir «no te identifico».** Credenciales incorrectas responde 400;
   entrar sin token responde 401. **Dónde se ve:** comparando la respuesta del acceso fallido
   con la de la consulta de cuenta sin token.
4. **El nombre completo acepta estar vacío pero no acepta faltar.** Omitir el campo no da
   «cuenta creada sin nombre»: da un rechazo que dice que el campo debe estar definido, que es
   un mensaje sobre la forma de la petición y no sobre el nombre. **Dónde se ve:** en el
   validador del alta, donde el campo es *nullable* pero no *optional*.
5. **El comentario que explica el cierre de sesión dice lo contrario que el código que
   acompaña.** El texto habla de conservar el token; las líneas siguientes lo ponen a nulo y
   vacían la sesión. **Dónde se ve:** en el proveedor de autenticación del frontend, en el
   bloque de rehidratación.
6. **El token no caduca nunca, pero cerrar sesión sí lo revoca.** La sesión dura
   indefinidamente salvo que alguien pulse el botón. **Dónde se ve:** en la configuración del
   guard de tokens, donde no hay caducidad declarada, contra el comportamiento verificado de
   que el token deja de valer tras cerrar sesión.
7. **La contraseña tiene un máximo de 32 caracteres.** Un máximo así es un límite de campo de
   formulario, no de un dato que se va a hashear y que después ocupa siempre lo mismo.
   **Dónde se ve:** en el validador compartido por alta y acceso.

## 3. Lo que no supe decidir si era un bug o el contrato

1. **Las iniciales cuando la cuenta no tiene nombre.** *Lectura A:* es deliberado — siempre
   dos letras, para que el hueco del avatar nunca quede vacío ni a medias. *Lectura B:* es un
   descuido — el código parte el correo por la arroba y trata el dominio como si fuera un
   apellido, así que en una dirección de correo personal la segunda letra es la inicial del
   proveedor y no identifica a nadie. **Las dos lecturas producen exactamente el mismo
   código**, y no hay nada escrito que las separe.
2. **El 400 del acceso con credenciales incorrectas.** *Lectura A:* deliberado, forma parte de
   no filtrar qué correos existen: no distinguir «no autenticado» de «petición inválida» es
   una decisión de seguridad. *Lectura B:* descuido, porque el proyecto sí usa 401 cuando
   falta el token, así que conoce el 401 y aquí no lo usó.
3. **El 200 del alta en lugar de 201.** *Lectura A:* convención del proyecto, no usa 201 en
   ningún sitio. *Lectura B:* se le escapó. **No hay ninguna otra operación que cree recursos
   con la que comparar**, así que la convención no se puede confirmar ni desmentir.
4. **El máximo de 32 caracteres en la contraseña.** *Lectura A:* requisito real — un sistema
   externo al que hay que sincronizar, o una política de empresa. *Lectura B:* herencia de una
   plantilla que nadie revisó. Nada en el repositorio dice de dónde sale ese número.
5. **El token sin caducidad.** *Lectura A:* decisión de MVP consciente — en una aplicación que
   todavía no guarda nada sensible, obligar a volver a entrar es fricción sin ganancia.
   *Lectura B:* simplemente no se configuró. **Una opción de configuración ausente no dice si
   estuvo y se quitó o si nunca estuvo.**
6. **El nombre obligatorio-pero-vacío.** *Lectura A:* el contrato quiere que el cliente se
   pronuncie, y omitir el campo es ambiguo a propósito. *Lectura B:* alguien escribió «acepta
   nulo» queriendo decir «es opcional» y nadie probó a omitirlo, porque el formulario de la
   propia aplicación siempre lo manda y el fallo solo aparece con un cliente que no sea la
   web.

---

> **Lo que me llevo.** La tercera lista salió más larga que la segunda, y esperaba lo
> contrario. Las incoherencias se ven y se arreglan; lo de la tercera lista se ve igual de
> bien **y aun así no se puede resolver leyendo**, porque la pregunta no es qué hace el código
> sino si alguien lo decidió. Eso solo lo contesta una persona, y por eso la spec tiene que
> poder decir «aquí no sé» sin dejar de ser útil.
