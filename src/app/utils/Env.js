export default class Env {
  static isDarwin = () => process.platform === 'darwin';

  static isProd = () => process.env.NODE_ENV === 'production';
}
