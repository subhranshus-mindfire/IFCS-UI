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

  http.get('/api/v1/flights/:flightId', async ({ params }) => {
    console.log(params)
    return HttpResponse.json({
      "success": true,
      "message": "Flight details retrieved successfully",
      "data": []
    }, { status: 200 })
  }),

  http.get("/api/v1/loading-plans", () => {
    return HttpResponse.json({
      data: [
        {
          id: "lp-001",
          name: "Saudi Arabia HM",
          value: "SA_HM",
        },
        {
          id: "lp-002",
          name: "Standard Loading Plan",
          value: "STD_LP",
        },
        {
          id: "lp-003",
          name: "Express Loading Plan",
          value: "EXP_LP",
        },
      ],
    });
  }),

  // ================================
  // AIRLINES
  // ================================
  http.get('/api/v1/airlines', () => {
    return HttpResponse.json({
      data: [
        { id: 1, name: 'Air India', code: 'AI' },
        { id: 2, name: 'IndiGo', code: '6E' },
        { id: 3, name: 'Vistara', code: 'UK' },
      ],
    });
  }),

  // ================================
  // AIRPORTS
  // ================================
  http.get('/api/v1/airports', () => {
    return HttpResponse.json({
      data: [
        { id: 1, name: 'Indira Gandhi International Airport', code: 'DEL', city: 'Delhi' },
        { id: 2, name: 'Chhatrapati Shivaji Maharaj Intl Airport', code: 'BOM', city: 'Mumbai' },
        { id: 3, name: 'Kempegowda International Airport', code: 'BLR', city: 'Bangalore' },
      ],
    });
  }),

  // ================================
  // AIRCRAFTS
  // ================================
  http.get('/api/v1/aircrafts', () => {
    return HttpResponse.json({
      data: [
        { id: 1, name: 'Airbus A320', capacity: 180 },
        { id: 2, name: 'Boeing 737', capacity: 160 },
        { id: 3, name: 'ATR 72', capacity: 70 },
      ],
    });
  }),
]
