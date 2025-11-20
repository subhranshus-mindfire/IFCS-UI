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

  http.get('/flights/:flightId', async ({ params }) => {
    console.log(params)
    return HttpResponse.json({
      "success": true,
      "message": "Flight details retrieved successfully",
      "data": [
        {
          "id": "4d2f6f04-2b60-4772-8130-7dd5751600c2",
          "fmId": "FM0027",
          "isCancelled": false,
          "isPrepared": false,
          "loadingPlanId": null,
          "menuId": "348400d1-b659-41d4-b0fb-0fdfe1969a88",
          "parentId": "4d2f6f04-2b60-4772-8130-7dd5751600c2",
          "aircraftConfigId": "94c280e1-55a5-4863-840e-9a5e1bfcedeb",
          "aircraftId": "b2f84d04-ee01-44f4-8655-e23810d36143",
          "airlineId": "e7facd9d-c3e1-431a-a8d8-f4e98bcb626d",
          "flightNumber": "WY249",
          "flightNumberSuffix": null,
          "direction": "Outbound",
          "departureDestination": "LHR",
          "departureGate": "A8",
          "scheduledDeparture": "2025-12-18T13:29:00.000Z",
          "estimatedDeparture": "2025-12-18T13:38:13.495Z",
          "actualDeparture": null,
          "arrivalDestination": "SIN",
          "arrivalGate": "B20",
          "scheduledArrival": "2025-12-19T00:29:00.000Z",
          "estimatedArrival": "2025-12-19T00:16:15.564Z",
          "actualArrival": null,
          "flightType": "Commercial",
          "flightTypeIataCode": "J",
          "status": "Boarding",
          "pairPosition": 1,
          "pairRoute": "LHR-SIN",
          "pairType": "International",
          "cutoffTime": "2025-12-18T11:29:00.000Z",
          "isAutoPairDisabled": false,
          "isAutoSyncDisabled": false,
          "isLoadingPlanRulesDisabled": false,
          "isMealPlanRulesDisabled": false,
          "isPricingRulesDisabled": false,
          "rulesProperties": null,
          "syncKeyWithoutDestination": "EK388-LHR",
          "syncKeyWithDestination": "EK388-LHR-SIN",
          "ifcsClient": "Oman Air",
          "createdAt": "2025-11-20T10:24:53.839Z",
          "updatedAt": "2025-11-20T10:24:53.839Z",
          "updatedBy": null,
          "scheduledDepartureUtc": "2025-12-18T13:29:00.000Z",
          "estimatedDepartureUtc": "2025-12-18T13:38:13.495Z",
          "actualDepartureUtc": null,
          "scheduledArrivalUtc": "2025-12-19T00:29:00.000Z",
          "estimatedArrivalUtc": "2025-12-19T00:16:15.564Z",
          "actualArrivalUtc": null,
          "aircraft": {
            "id": "b2f84d04-ee01-44f4-8655-e23810d36143",
            "type": "B737-800",
            "registration": "A4O-AB",
            "aircraftGroup": null,
            "designator": "B738"
          },
          "aircraftConfig": {
            "id": "94c280e1-55a5-4863-840e-9a5e1bfcedeb",
            "fmId": null,
            "lopa": "B737-800",
            "name": "B737-800 Standard"
          },
          "airline": {
            "id": "e7facd9d-c3e1-431a-a8d8-f4e98bcb626d",
            "fmId": null,
            "code": "EK",
            "name": "Emirates",
            "logo": null,
            "designator": "UAE"
          },
          "loadingPlan": null,
          "mealPlan": {
            "id": "348400d1-b659-41d4-b0fb-0fdfe1969a88",
            "fmId": "MP0006",
            "name": "Diabetic Meal Plan"
          },
          "passengers": {
            "id": "bea74e6e-2461-4bc6-8923-18e93207c771",
            "fmId": "PAX0027",
            "totalCount": 184,
            "businessStudioCount": 14,
            "businessCount": 30,
            "economyCount": 140,
            "crewCount": 10
          },
          "selectedFlight": true
        },
        {
          "id": "3ff309d2-2e9e-4ba1-8120-0e63423d2327",
          "fmId": "FM0028",
          "isCancelled": false,
          "isPrepared": true,
          "loadingPlanId": "6b8649a8-b81f-423b-bc9c-5a6b6822d395",
          "menuId": "348400d1-b659-41d4-b0fb-0fdfe1969a88",
          "parentId": "4d2f6f04-2b60-4772-8130-7dd5751600c2",
          "aircraftConfigId": "40f8d32f-aec6-45f7-a7f5-578f2df0834c",
          "aircraftId": "5bb021a5-9ce0-4460-9f0f-e979bca3aa7e",
          "airlineId": "e7facd9d-c3e1-431a-a8d8-f4e98bcb626d",
          "flightNumber": "WY248",
          "flightNumberSuffix": null,
          "direction": "Inbound",
          "departureDestination": "SIN",
          "departureGate": "B20",
          "scheduledDeparture": "2025-12-19T02:29:00.000Z",
          "estimatedDeparture": "2025-12-19T02:26:19.375Z",
          "actualDeparture": null,
          "arrivalDestination": "LHR",
          "arrivalGate": "A16",
          "scheduledArrival": "2025-12-19T14:29:00.000Z",
          "estimatedArrival": "2025-12-19T14:34:22.243Z",
          "actualArrival": null,
          "flightType": "Commercial",
          "flightTypeIataCode": "J",
          "status": "Boarding",
          "pairPosition": 2,
          "pairRoute": "SIN-LHR",
          "pairType": "International",
          "cutoffTime": "2025-12-19T00:29:00.000Z",
          "isAutoPairDisabled": false,
          "isAutoSyncDisabled": false,
          "isLoadingPlanRulesDisabled": false,
          "isMealPlanRulesDisabled": false,
          "isPricingRulesDisabled": false,
          "rulesProperties": null,
          "syncKeyWithoutDestination": "EK389-SIN",
          "syncKeyWithDestination": "EK389-SIN-LHR",
          "ifcsClient": "Oman Air",
          "createdAt": "2025-11-20T10:24:53.839Z",
          "updatedAt": "2025-11-20T10:24:53.839Z",
          "updatedBy": null,
          "scheduledDepartureUtc": "2025-12-19T02:29:00.000Z",
          "estimatedDepartureUtc": "2025-12-19T02:26:19.375Z",
          "actualDepartureUtc": null,
          "scheduledArrivalUtc": "2025-12-19T14:29:00.000Z",
          "estimatedArrivalUtc": "2025-12-19T14:34:22.243Z",
          "actualArrivalUtc": null,
          "aircraft": {
            "id": "5bb021a5-9ce0-4460-9f0f-e979bca3aa7e",
            "type": "A320",
            "registration": "A6-ABC",
            "aircraftGroup": null,
            "designator": "A320"
          },
          "aircraftConfig": {
            "id": "40f8d32f-aec6-45f7-a7f5-578f2df0834c",
            "fmId": null,
            "lopa": "A320",
            "name": "A320 Standard"
          },
          "airline": {
            "id": "e7facd9d-c3e1-431a-a8d8-f4e98bcb626d",
            "fmId": null,
            "code": "EK",
            "name": "Emirates",
            "logo": null,
            "designator": "UAE"
          },
          "loadingPlan": {
            "id": "6b8649a8-b81f-423b-bc9c-5a6b6822d395",
            "fmId": "LP0009",
            "value": "LP-VALUE-009",
            "name": "Standard Loading Plan",
            "isSetupRecord": false
          },
          "mealPlan": {
            "id": "348400d1-b659-41d4-b0fb-0fdfe1969a88",
            "fmId": "MP0006",
            "name": "Diabetic Meal Plan"
          },
          "passengers": {
            "id": "86221872-358c-4ffa-b2e5-23dfe1f321ed",
            "fmId": "PAX0028",
            "totalCount": 282,
            "businessStudioCount": 40,
            "businessCount": 39,
            "economyCount": 203,
            "crewCount": 14
          },
          "selectedFlight": false
        }
      ]
    }, { status: 200 })
  }),
]
