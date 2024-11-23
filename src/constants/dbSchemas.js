// Schéma de la collection 'users'
const userSchema = {
  uid: 'string', // ID unique Firebase Auth
  email: 'string',
  name: 'string',
  phone: 'string',
  photoURL: 'string?', // Optional
  username: 'string?', // Optional
  bio: 'string?', // Optional
  createdAt: 'timestamp',
  updatedAt: 'timestamp',
  isOnline: 'boolean',
  lastSeen: 'timestamp',
  preferences: {
    notifications: 'boolean',
    language: 'string',
    theme: 'string'
  },
  following: ['string'], // UIDs des utilisateurs suivis
  followers: ['string'], // UIDs des followers
  eventsAttending: ['string'], // IDs des événements
  eventsCreated: ['string'], // IDs des événements créés
  socialLinks: {
    facebook: 'string?',
    instagram: 'string?',
    twitter: 'string?'
  }
}; 