import Task from '#models/task'
import User from '#models/user'
import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'

/**
 * Lo que cada tarea muestra de su responsable. Cubre los tres scenarios del
 * requisito «Lo que cada tarea muestra de su responsable» de
 * `openspec/specs/tasks/spec.md`.
 *
 * El scenario del email dice «suelta o dentro de la lista», así que cada
 * comprobación recorre las tres superficies por las que sale una tarea: el
 * alta, la lista y el detalle.
 */
test.group('Tasks | responsable', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())

  async function sesion(client: any, fullName: string | null) {
    const user = await User.create({
      fullName,
      email: 'ada@example.com',
      password: 'secreto123',
    })

    const login = await client
      .post('/api/v1/auth/login')
      .json({ email: 'ada@example.com', password: 'secreto123' })

    const task = await Task.create({ title: 'Redactar el informe', assigneeId: user.id })

    return { token: login.body().data.token as string, taskId: task.id }
  }

  /** Las tres superficies por las que una tarea sale de la API. */
  async function responsablesDeCadaSuperficie(client: any, token: string, taskId: number) {
    const auth = { Authorization: `Bearer ${token}` }

    const alta = await client
      .post('/api/v1/tasks')
      .headers(auth)
      .json({ title: 'Preparar la demo' })
    const lista = await client.get('/api/v1/tasks').headers(auth)
    // El detalle es la única lectura que informa del vencimiento, y por eso
    // exige el día de quien mira. Sin él responde 422 y no se llega a ver nada.
    const detalle = await client
      .get(`/api/v1/tasks/${taskId}`)
      .qs({ today: '2026-10-07' })
      .headers(auth)

    lista.assertStatus(200)
    detalle.assertStatus(200)

    const enLista = lista.body().data.find((t: { id: number }) => t.id === taskId)

    return {
      alta: alta.body().data.assignee,
      lista: enLista.assignee,
      detalle: detalle.body().data.assignee,
    }
  }

  test('el responsable llega con nombre e iniciales en las tres superficies', async ({
    client,
    assert,
  }) => {
    const { token, taskId } = await sesion(client, 'Ada Lovelace')

    const responsables = await responsablesDeCadaSuperficie(client, token, taskId)

    for (const [superficie, assignee] of Object.entries(responsables)) {
      assert.equal(assignee.fullName, 'Ada Lovelace', `fullName en ${superficie}`)
      assert.equal(assignee.initials, 'AL', `initials en ${superficie}`)
    }
  })

  test('el responsable no trae el email ni ningun otro dato de la cuenta', async ({
    client,
    assert,
  }) => {
    const { token, taskId } = await sesion(client, 'Ada Lovelace')

    const responsables = await responsablesDeCadaSuperficie(client, token, taskId)

    for (const [superficie, assignee] of Object.entries(responsables)) {
      assert.notProperty(assignee, 'email', `el email se filtra en ${superficie}`)
      assert.deepEqual(
        Object.keys(assignee).sort(),
        ['fullName', 'id', 'initials'],
        `campos de mas en ${superficie}`
      )
    }
  })

  test('un responsable sin nombre llega con nombre nulo y sus iniciales', async ({
    client,
    assert,
  }) => {
    const { token, taskId } = await sesion(client, null)

    const responsables = await responsablesDeCadaSuperficie(client, token, taskId)

    for (const [superficie, assignee] of Object.entries(responsables)) {
      assert.isNull(assignee.fullName, `fullName en ${superficie}`)
      assert.equal(assignee.initials, 'AE', `initials en ${superficie}`)
    }
  })
})
