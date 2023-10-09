import { isDevelopment } from '@infra/config'
import { getApp } from '@infra/http'
import { serve } from '@hono/node-server'

const app = getApp()

if (isDevelopment()) {
  serve(app).listen(3333)
  console.info('[ Started server ]')
  app.showRoutes()
}
