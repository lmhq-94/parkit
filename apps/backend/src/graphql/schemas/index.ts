import { gql } from 'graphql-tag';

export const typeDefs = gql`
  # Tipos escalares
  scalar DateTime
  scalar JSON

  # Enums
  enum UserRole {
    ADMIN
    MANAGER
    VALET
    EMPLOYEE
    CLIENT
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

  enum PaymentStatus {
    PENDING
    PAID
    FAILED
    REFUNDED
    CANCELLED
  }

  enum PaymentMethod {
    CREDIT_CARD
    DEBIT_CARD
    CASH
    TRANSFER
    PAYPAL
    STRIPE
  }

  enum NotificationType {
    PARKING
    PAYMENT
    RESERVATION
    SYSTEM
    USER
  }

  enum NotificationPriority {
    LOW
    MEDIUM
    HIGH
    URGENT
  }

  enum EventType {
    ENTRY
    EXIT
    RESERVATION_START
    RESERVATION_END
  }

  # Tipos de entrada
  input LoginInput {
    email: String!
    password: String!
  }

  input RegisterInput {
    email: String!
    password: String!
    firstName: String!
    lastName: String!
    phone: String
    companyId: String
    roleId: String!
  }

  input CreateUserInput {
    email: String!
    firstName: String!
    lastName: String!
    phone: String
    roleId: String!
    companyId: String
  }

  input UpdateUserInput {
    firstName: String
    lastName: String
    phone: String
    roleId: String
    isActive: Boolean
  }

  input CreateParkingInput {
    name: String!
    description: String
    address: String!
    latitude: Float
    longitude: Float
    floor: Int
    section: String
    spot: String
    zone: String
    status: ParkingStatus
    capacity: Int
    price: Float!
    currency: String
    companyId: String!
  }

  input UpdateParkingInput {
    name: String
    description: String
    address: String
    latitude: Float
    longitude: Float
    floor: Int
    section: String
    spot: String
    zone: String
    status: ParkingStatus
    capacity: Int
    price: Float
    currency: String
  }

  input CreateReservationInput {
    startTime: DateTime!
    endTime: DateTime!
    notes: String
    userId: String!
    vehicleId: String!
    parkingId: String!
    companyId: String!
  }

  input UpdateReservationInput {
    startTime: DateTime
    endTime: DateTime
    status: ReservationStatus
    notes: String
  }

  input CreatePaymentInput {
    amount: Float!
    currency: String
    method: PaymentMethod!
    description: String
    userId: String!
    reservationId: String
  }

  input UpdatePaymentInput {
    amount: Float
    currency: String
    method: PaymentMethod
    status: PaymentStatus
    description: String
  }

  # Tipos de respuesta
  type AuthResponse {
    user: User!
    accessToken: String!
    refreshToken: String!
  }

  type PaginationInfo {
    page: Int!
    limit: Int!
    total: Int!
    pages: Int!
  }

  # Tipos principales
  type User {
    id: ID!
    email: String!
    firstName: String!
    lastName: String!
    phone: String
    avatar: String
    isActive: Boolean!
    isVerified: Boolean!
    lastLogin: DateTime
    role: Role!
    company: Company
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Role {
    id: ID!
    name: UserRole!
    description: String
    permissions: [String!]!
    isActive: Boolean!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Company {
    id: ID!
    name: String!
    description: String
    address: String
    phone: String
    email: String
    website: String
    logo: String
    isActive: Boolean!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Vehicle {
    id: ID!
    licensePlate: String!
    make: String!
    model: String!
    year: Int
    color: String
    vin: String
    isActive: Boolean!
    userId: String!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Parking {
    id: ID!
    name: String!
    description: String
    address: String!
    latitude: Float
    longitude: Float
    floor: Int
    section: String
    spot: String
    zone: String
    status: ParkingStatus!
    capacity: Int!
    price: Float!
    currency: String!
    isActive: Boolean!
    company: Company!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Reservation {
    id: ID!
    startTime: DateTime!
    endTime: DateTime!
    status: ReservationStatus!
    totalPrice: Float!
    notes: String
    user: User!
    vehicle: Vehicle!
    parking: Parking!
    company: Company!
    payments: [Payment!]
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Payment {
    id: ID!
    amount: Float!
    currency: String!
    method: PaymentMethod!
    status: PaymentStatus!
    transactionId: String
    description: String
    metadata: JSON
    user: User!
    reservation: Reservation
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Event {
    id: ID!
    type: EventType!
    timestamp: DateTime!
    metadata: JSON
    user: User!
    vehicle: Vehicle!
    parking: Parking!
    reservation: Reservation
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Notification {
    id: ID!
    title: String!
    message: String!
    type: NotificationType!
    priority: NotificationPriority!
    isRead: Boolean!
    metadata: JSON
    user: User!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type QRCode {
    id: ID!
    code: String!
    type: String!
    isActive: Boolean!
    expiresAt: DateTime
    user: User
    parking: Parking
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  # Tipos de respuesta paginada
  type UsersResponse {
    users: [User!]!
    pagination: PaginationInfo!
  }

  type ParkingsResponse {
    parkings: [Parking!]!
    pagination: PaginationInfo!
  }

  type ReservationsResponse {
    reservations: [Reservation!]!
    pagination: PaginationInfo!
  }

  type PaymentsResponse {
    payments: [Payment!]!
    pagination: PaginationInfo!
  }

  type NotificationsResponse {
    notifications: [Notification!]!
    pagination: PaginationInfo!
  }

  # Queries
  type Query {
    # Auth
    me: User

    # Users
    users(page: Int, limit: Int, companyId: String): UsersResponse!
    user(id: ID!): User!

    # Parkings
    parkings(page: Int, limit: Int, companyId: String): ParkingsResponse!
    parking(id: ID!): Parking!

    # Reservations
    reservations(page: Int, limit: Int, userId: String): ReservationsResponse!
    reservation(id: ID!): Reservation!

    # Payments
    payments(page: Int, limit: Int, userId: String): PaymentsResponse!
    payment(id: ID!): Payment!

    # Notifications
    notifications(page: Int, limit: Int): NotificationsResponse!
    notification(id: ID!): Notification!
    unreadNotificationsCount: Int!

    # Stats
    userStats(userId: ID!): JSON!
  }

  # Mutations
  type Mutation {
    # Auth
    login(input: LoginInput!): AuthResponse!
    register(input: RegisterInput!): AuthResponse!
    refreshToken(refreshToken: String!): AuthResponse!
    changePassword(currentPassword: String!, newPassword: String!): Boolean!
    forgotPassword(email: String!): Boolean!
    resetPassword(resetToken: String!, newPassword: String!): Boolean!

    # Users
    createUser(input: CreateUserInput!): User!
    updateUser(id: ID!, input: UpdateUserInput!): User!
    deleteUser(id: ID!): Boolean!

    # Parkings
    createParking(input: CreateParkingInput!): Parking!
    updateParking(id: ID!, input: UpdateParkingInput!): Parking!
    deleteParking(id: ID!): Boolean!

    # Reservations
    createReservation(input: CreateReservationInput!): Reservation!
    updateReservation(id: ID!, input: UpdateReservationInput!): Reservation!
    deleteReservation(id: ID!): Boolean!

    # Payments
    createPayment(input: CreatePaymentInput!): Payment!
    updatePayment(id: ID!, input: UpdatePaymentInput!): Payment!
    deletePayment(id: ID!): Boolean!

    # Notifications
    markNotificationAsRead(id: ID!): Notification!
    markAllNotificationsAsRead: Boolean!
    deleteNotification(id: ID!): Boolean!
  }

  # Subscriptions
  type Subscription {
    # Real-time updates
    parkingStatusChanged(parkingId: ID!): Parking!
    reservationUpdated(reservationId: ID!): Reservation!
    notificationCreated(userId: ID!): Notification!
  }
`; 