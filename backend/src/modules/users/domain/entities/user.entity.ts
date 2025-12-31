export class UserEntity {
  readonly id: string;
  readonly email: string;

  name: string;
  profilePicture?: string;

  isEmailVerified: boolean;
  lastLogin?: Date;
  is2FAEnabled: boolean;

  readonly createdAt: Date;
  readonly updatedAt: Date;

  constructor(props: {
    id: string;
    email: string;
    name: string;
    profilePicture?: string;
    isEmailVerified: boolean;
    lastLogin?: Date;
    is2FAEnabled: boolean;
    createdAt: Date;
    updatedAt: Date;
  }) {
    Object.assign(this, props);
  }

  verifyEmail() {
    if (this.isEmailVerified) return;
    this.isEmailVerified = true;
  }

  enable2FA() {
    if (!this.isEmailVerified) {
      throw new Error('Email must be verified before enabling 2FA');
    }
    this.is2FAEnabled = true;
  }

  recordLogin(date = new Date()) {
    this.lastLogin = date;
  }
}
