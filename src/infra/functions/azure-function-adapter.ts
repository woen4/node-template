import type {
  HttpRequest as AzureRequest,
  InvocationContext,
  HttpResponseInit as AzureResponse,
  HttpResponseInit,
} from '@azure/functions'
import { Env, Schema, Hono } from 'hono'

export const azureFunctionAdapter = <
  E extends Env = Env,
  S extends Schema = NonNullable<unknown>,
  BasePath extends string = '/',
>(
  app: Hono<E, S, BasePath>,
) => {
  return async (
    request: AzureRequest,
    context: InvocationContext,
  ): Promise<HttpResponseInit> => {
    const req = await createRequest(request)

    const res = await app.fetch(req, {
      invocationContext: context,
    })

    const result = createResult(res)

    return result
  }
}

const createResult = async (res: Response): Promise<AzureResponse> => {
  const serializedResponse: AzureResponse = {
    status: res.status,
    headers: transformHeaders(res.headers),
  }

  const responseContent = await res.text()

  try {
    serializedResponse.jsonBody = JSON.parse(responseContent)
  } catch (e) {
    serializedResponse.jsonBody = responseContent
  }

  return serializedResponse
}

const createRequest = async (request: AzureRequest): Promise<Request> => {
  const requestInit: RequestInit = {
    headers: transformHeaders(request.headers),
    method: request.method,
  }

  if (request.body) {
    requestInit.body = await request.arrayBuffer()
  }

  return new Request(request.url, requestInit)
}

const transformHeaders = (
  rawHeaders: Response['headers'] | AzureRequest['headers'],
) => {
  return Object.entries(rawHeaders)
}
