import { http, HttpResponse } from 'msw'

export const handlers = [
  http.get('/api/user', () => {
    return HttpResponse.json({
      id: 1,
      username: 'mocked_user',
      email: 'mock@example.com',
    })
  }),

  http.post('/api/login', async ({ request }) => {
    const { username, password } = await request.json() as { username: string; password: string }

    if (username === 'admin' && password === 'password') {
      return HttpResponse.json({ token: 'mock-token-123' })
    }

    return HttpResponse.json({ message: 'Invalid credentials' }, { status: 401 })
  }),
]
