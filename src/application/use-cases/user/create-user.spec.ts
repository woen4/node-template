import { expect, test } from 'vitest'
import { createUserUseCase } from './create-user'

test('Test user creation', () => {
  const result = createUserUseCase.handle({ name: 'Woen', age: 22 })

  expect(result.value.message).not.toBeNull()
})
