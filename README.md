# 🚂 RailBlaze - Railway Management System

A comprehensive railway management system built with Node.js, Express.js, and plain HTML/CSS/JS.

## Features

- **Train Management**: Track trains (express, local, freight) with real-time status and location
- **Route Management**: Define railway routes with intermediate stops
- **Schedule Management**: Create and manage train schedules with delay/cancellation support
- **Booking System**: Book tickets, choose class (first/second/sleeper), cancel bookings
- **Dashboard**: Live stats, train status table, today's schedules, route search
- **REST API**: Full CRUD API for all resources

## Tech Stack

- **Backend**: Node.js + Express.js
- **Data**: In-memory store with realistic seed data
- **Frontend**: Plain HTML5, CSS3, vanilla JavaScript
- **Testing**: Jest + Supertest

## Getting Started

### Install dependencies
```bash
npm install
```

### Start the server
```bash
npm start
```

Visit http://localhost:3000

### Development mode (auto-restart)
```bash
npm run dev
```

### Run tests
```bash
npm test
```

## API Endpoints

### Trains `/api/trains`
| Method | Path | Description |
|--------|------|-------------|
| GET | /api/trains | List all trains (filter: ?status=running\|delayed\|scheduled) |
| GET | /api/trains/:id | Get train details |
| POST | /api/trains | Create train |
| PUT | /api/trains/:id | Update train |
| DELETE | /api/trains/:id | Remove train |
| GET | /api/trains/:id/location | Get train location |

### Routes `/api/routes`
| Method | Path | Description |
|--------|------|-------------|
| GET | /api/routes | List all routes |
| GET | /api/routes/:id | Get route details |
| POST | /api/routes | Create route |
| GET | /api/routes/search?from=X&to=Y | Search routes |

### Schedules `/api/schedules`
| Method | Path | Description |
|--------|------|-------------|
| GET | /api/schedules | List all schedules |
| GET | /api/schedules/today | Today's schedules |
| GET | /api/schedules/train/:trainId | Schedules for a train |
| GET | /api/schedules/:id | Get schedule details |
| POST | /api/schedules | Create schedule |
| PUT | /api/schedules/:id | Update schedule |

### Bookings `/api/bookings`
| Method | Path | Description |
|--------|------|-------------|
| GET | /api/bookings | List all bookings |
| GET | /api/bookings/:id | Get booking |
| POST | /api/bookings | Create booking |
| PUT | /api/bookings/:id/cancel | Cancel booking |
| GET | /api/bookings/user/:userId | Bookings for a user |

### Insights `/api/insights`
| Method | Path | Description |
|--------|------|-------------|
| GET | /api/insights | System statistics |
| GET | /api/insights/delays | Delay statistics |

## Data Models

- **Train**: id, name, number, type, capacity, status, currentLocation
- **Route**: id, name, source, destination, distance, duration, stops[]
- **Schedule**: id, trainId, routeId, departureTime, arrivalTime, date, status, delayMinutes, availableSeats
- **Booking**: id, scheduleId, userId, passengerName, seatNumber, class, price, status, bookedAt
