import knexJs from 'knex';
import bookshelfJs from 'bookshelf';
import securePassword from 'bookshelf-secure-password';

import knexConfig from './knexfile';

/**
 * Database connection.
 */
const knex = knexJs(knexConfig);
const bookshelf = bookshelfJs(knex);

bookshelf.plugin(['bookshelf-virtuals-plugin', securePassword]);

export default bookshelf;
