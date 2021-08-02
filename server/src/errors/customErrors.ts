export class AuthError extends Error {
  constructor() {
    super('로그인되지 않은 유저입니다.');
  }
}
