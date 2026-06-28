let storedPassword = process.env.ADMIN_PASSWORD || 'admin'

export function getPassword(): string {
  return storedPassword
}

export function setPassword(newPassword: string): void {
  storedPassword = newPassword
}
