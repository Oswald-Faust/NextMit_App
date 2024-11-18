export const handleAuthError = (error) => {
  switch (error.code) {
    case 'auth/email-already-in-use':
      return 'Cet email est déjà utilisé';
    case 'auth/invalid-email':
      return 'Email invalide';
    case 'auth/operation-not-allowed':
      return 'Opération non autorisée';
    case 'auth/weak-password':
      return 'Mot de passe trop faible';
    default:
      return 'Une erreur est survenue';
  }
}; 