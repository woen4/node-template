import { app as azureApp } from '@azure/functions'
import { azureFunctionAdapter } from './azure-function-adapter'
import { getApp } from '@infra/http'

const app = getApp()

export const handler = azureFunctionAdapter(app)

azureApp.http('http', {
  methods: ['GET', 'POST'],
  authLevel: 'anonymous',
  handler,
})
