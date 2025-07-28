import { gql } from 'graphql-tag';

export const typeDefs = gql`
  # ========================================
  # ENUMS
  # ========================================

  enum UserRole {
    ADMIN
    EMPLOYEE
    CLIENT
    VALET
    MANAGER
  }

  enum ParkingStatus {
    AVAILABLE
    OCCUPIED
    RESERVED
    MAINTENANCE
    DISABLED
  }

  enum ReservationStatus {
    PENDING
    CONFIRMED
    CANCELLED
    COMPLETED
    EXPIRED
  }

  enum EventType {
    ENTRY
    EXIT
    RESERVATION_CREATED
    RESERVATION_CANCELLED
    PAYMENT_RECEIVED
    EVIDENCE_ADDED
  }

  enum PaymentStatus {
    PENDING
    PAID
    FAILED
    REFUNDED
  }

  enum PaymentMethod {
    CASH
    CREDIT_CARD
    DEBIT_CARD
    MOBILE_PAYMENT
    BANK_TRANSFER
  }

  # ========================================
  # TYPES
  # ========================================

  type Company {
    id: ID!
    name: String!
    description: String
    address: String!
    phone: String
    email: String
    website: String
    logo: String
    taxId: String
    isActive: Boolean!
    createdAt: String!
    updatedAt: String!
    users: [User!]!
    parkings: [Parking!]!
    reservations: [Reservation!]!
    events: [Event!]!
    payments: [Payment!]!
  }

  type User {
    id: ID!
    email: String!
    firstName: String!
    lastName: String!
    phone: String
    avatar: String
    role: UserRole!
    isActive: Boolean!
    companyId: String
    company: Company
    createdAt: String!
    updatedAt: String!
    reservations: [Reservation!]!
    events: [Event!]!
    payments: [Payment!]!
    vehicles: [Vehicle!]!
    notifications: [Notification!]!
  }

  type Vehicle {
    id: ID!
    licensePlate: String!
    brand: String!
    model: String!
    year: Int
    color: String
    vin: String
    isActive: Boolean!
    userId: String!
    user: User!
    createdAt: String!
    updatedAt: String!
    reservations: [Reservation!]!
    events: [Event!]!
  }

  type Parking {
    id: ID!
    name: String!
    description: String
    location: String!
    floor: String
    section: String
    spotNumber: String!
    isActive: Boolean!
    status: ParkingStatus!
    hourlyRate: Float!
    dailyRate: Float!
    companyId: String!
    company: Company!
    createdAt: String!
    updatedAt: String!
    reservations: [Reservation!]!
    events: [Event!]!
  }

  type Reservation {
    id: ID!
    startTime: String!
    endTime: String!
    status: ReservationStatus!
    notes: String
    userId: String!
    user: User!
    vehicleId: String!
    vehicle: Vehicle!
    parkingId: String!
    parking: Parking!
    companyId: String!
    company: Company!
    createdAt: String!
    updatedAt: String!
    events: [Event!]!
    payments: [Payment!]!
  }

  type Event {
    id: ID!
    type: EventType!
    description: String
    timestamp: String!
    metadata: JSON
    userId: String
    user: User
    vehicleId: String
    vehicle: Vehicle
    parkingId: String
    parking: Parking
    reservationId: String
    reservation: Reservation
    companyId: String!
    company: Company!
    createdAt: String!
    evidences: [Evidence!]!
  }

  type Evidence {
    id: ID!
    type: String!
    url: String!
    filename: String!
    mimeType: String!
    size: Int
    description: String
    eventId: String!
    event: Event!
    createdAt: String!
  }

  type Payment {
    id: ID!
    amount: Float!
    currency: String!
    status: PaymentStatus!
    method: PaymentMethod!
    transactionId: String
    description: String
    userId: String!
    user: User!
    reservationId: String
    reservation: Reservation
    companyId: String!
    company: Company!
    createdAt: String!
    updatedAt: String!
  }

  type QRCode {
    id: ID!
    code: String!
    type: String!
    referenceId: String!
    isActive: Boolean!
    expiresAt: String
    createdAt: String!
    updatedAt: String!
  }

  type Notification {
    id: ID!
    title: String!
    message: String!
    type: String!
    isRead: Boolean!
    metadata: JSON
    userId: String!
    user: User!
    createdAt: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type PaginatedResponse {
    data: [JSON!]!
    pagination: PaginationInfo!
  }

  type PaginationInfo {
    page: Int!
    limit: Int!
    total: Int!
    totalPages: Int!
  }

  scalar JSON

  # ========================================
  # INPUT TYPES
  # ========================================

  input CreateUserInput {
    email: String!
    password: String!
    firstName: String!
    lastName: String!
    phone: String
    role: UserRole!
    companyId: String
  }

  input UpdateUserInput {
    firstName: String
    lastName: String
    phone: String
    avatar: String
    role: UserRole
    isActive: Boolean
  }

  input CreateVehicleInput {
    licensePlate: String!
    brand: String!
    model: String!
    year: Int
    color: String
    vin: String
  }

  input UpdateVehicleInput {
    brand: String
    model: String
    year: Int
    color: String
    vin: String
    isActive: Boolean
  }

  input CreateParkingInput {
    name: String!
    description: String
    location: String!
    floor: String
    section: String
    spotNumber: String!
    hourlyRate: Float!
    dailyRate: Float!
  }

  input UpdateParkingInput {
    name: String
    description: String
    location: String
    floor: String
    section: String
    status: ParkingStatus
    hourlyRate: Float
    dailyRate: Float
    isActive: Boolean
  }

  input CreateReservationInput {
    startTime: String!
    endTime: String!
    notes: String
    vehicleId: String!
    parkingId: String!
  }

  input UpdateReservationInput {
    status: ReservationStatus
    notes: String
  }

  input CreateEventInput {
    type: EventType!
    description: String
    metadata: JSON
    vehicleId: String
    parkingId: String
    reservationId: String
  }

  input CreatePaymentInput {
    amount: Float!
    currency: String!
    method: PaymentMethod!
    description: String
    reservationId: String
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input PaginationInput {
    page: Int = 1
    limit: Int = 10
  }

  input ParkingFilterInput {
    status: ParkingStatus
    floor: String
    section: String
    isActive: Boolean
  }

  input ReservationFilterInput {
    status: ReservationStatus
    startDate: String
    endDate: String
    userId: String
    vehicleId: String
    parkingId: String
  }

  # ========================================
  # QUERIES
  # ========================================

  type Query {
    # Auth
    me: User

    # Companies
    companies(pagination: PaginationInput): PaginatedResponse!
    company(id: ID!): Company

    # Users
    users(pagination: PaginationInput): PaginatedResponse!
    user(id: ID!): User
    usersByCompany(companyId: ID!, pagination: PaginationInput): PaginatedResponse!

    # Vehicles
    vehicles(pagination: PaginationInput): PaginatedResponse!
    vehicle(id: ID!): Vehicle
    vehiclesByUser(userId: ID!): [Vehicle!]!

    # Parkings
    parkings(
      filter: ParkingFilterInput
      pagination: PaginationInput
    ): PaginatedResponse!
    parking(id: ID!): Parking
    parkingsByCompany(companyId: ID!, filter: ParkingFilterInput): [Parking!]!
    availableParkings(companyId: ID!): [Parking!]!

    # Reservations
    reservations(
      filter: ReservationFilterInput
      pagination: PaginationInput
    ): PaginatedResponse!
    reservation(id: ID!): Reservation
    reservationsByUser(userId: ID!): [Reservation!]!
    reservationsByParking(parkingId: ID!): [Reservation!]!

    # Events
    events(pagination: PaginationInput): PaginatedResponse!
    event(id: ID!): Event
    eventsByParking(parkingId: ID!): [Event!]!
    eventsByVehicle(vehicleId: ID!): [Event!]!

    # Payments
    payments(pagination: PaginationInput): PaginatedResponse!
    payment(id: ID!): Payment
    paymentsByUser(userId: ID!): [Payment!]!

    # QR Codes
    qrCode(code: String!): QRCode
    qrCodesByType(type: String!): [QRCode!]!

    # Notifications
    notifications(pagination: PaginationInput): PaginatedResponse!
    notification(id: ID!): Notification
    notificationsByUser(userId: ID!): [Notification!]!
    unreadNotifications(userId: ID!): [Notification!]!
  }

  # ========================================
  # MUTATIONS
  # ========================================

  type Mutation {
    # Auth
    login(input: LoginInput!): AuthPayload!
    register(input: CreateUserInput!): AuthPayload!
    changePassword(oldPassword: String!, newPassword: String!): Boolean!

    # Users
    createUser(input: CreateUserInput!): User!
    updateUser(id: ID!, input: UpdateUserInput!): User!
    deleteUser(id: ID!): Boolean!
    toggleUserStatus(id: ID!): User!

    # Vehicles
    createVehicle(input: CreateVehicleInput!): Vehicle!
    updateVehicle(id: ID!, input: UpdateVehicleInput!): Vehicle!
    deleteVehicle(id: ID!): Boolean!

    # Parkings
    createParking(input: CreateParkingInput!): Parking!
    updateParking(id: ID!, input: UpdateParkingInput!): Parking!
    deleteParking(id: ID!): Boolean!
    updateParkingStatus(id: ID!, status: ParkingStatus!): Parking!

    # Reservations
    createReservation(input: CreateReservationInput!): Reservation!
    updateReservation(id: ID!, input: UpdateReservationInput!): Reservation!
    deleteReservation(id: ID!): Boolean!
    cancelReservation(id: ID!): Reservation!
    confirmReservation(id: ID!): Reservation!

    # Events
    createEvent(input: CreateEventInput!): Event!
    recordEntry(parkingId: ID!, vehicleId: ID!): Event!
    recordExit(parkingId: ID!, vehicleId: ID!): Event!

    # Payments
    createPayment(input: CreatePaymentInput!): Payment!
    updatePaymentStatus(id: ID!, status: PaymentStatus!): Payment!

    # QR Codes
    generateQRCode(type: String!, referenceId: String!): QRCode!
    deactivateQRCode(id: ID!): Boolean!

    # Notifications
    markNotificationAsRead(id: ID!): Notification!
    markAllNotificationsAsRead(userId: ID!): Boolean!
    deleteNotification(id: ID!): Boolean!
  }

  # ========================================
  # SUBSCRIPTIONS
  # ========================================

  type Subscription {
    parkingStatusChanged(parkingId: ID!): Parking!
    reservationCreated(companyId: ID!): Reservation!
    reservationUpdated(id: ID!): Reservation!
    eventCreated(parkingId: ID!): Event!
    notificationCreated(userId: ID!): Notification!
  }
`; 