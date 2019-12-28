import bookshelf from '../db';

const TABLE_NAME = 'users';
const PASSWORD_FIELD = 'password_hash';

/**
 * User model.
 */
class User extends bookshelf.Model {
  /**
   * Get table name.
   */
  get tableName() {
    return TABLE_NAME;
  }

  /**
   * Get secure password field.
   */
  get hasSecurePassword() {
    return PASSWORD_FIELD;
  }

  /**
   * Table has timestamps.
   */
  get hasTimestamps() {
    return true;
  }
}

export default User;
