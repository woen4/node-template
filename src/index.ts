import { getApp } from '@infra/http'

/*  */

getApp().then((app) => {
  app.listen({ port: 3333 })
})
