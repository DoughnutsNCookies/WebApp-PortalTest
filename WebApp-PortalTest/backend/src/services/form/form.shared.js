export const formPath = 'form'

export const formMethods = ['find', 'get', 'create', 'patch', 'remove']

export const formClient = (client) => {
  const connection = client.get('connection')

  client.use(formPath, connection.service(formPath), {
    methods: formMethods
  })
}
