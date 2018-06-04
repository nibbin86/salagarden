<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'salagd_db');

/** MySQL database username */
define('DB_USER', 'salagd_salagdu');

/** MySQL database password */
define('DB_PASSWORD', 'r6KnZEQrWA');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8mb4');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');


/** CUSTOM */
define ('WPCF7_AUTOP', false );
/** END CUSTOM */

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'V-+(9`J&lcxG[@wmX.fy?1~Ip|-5)`-_ :cdSU:|6ZeEOL.LQ_;d)A$R*cUP$X4m');
define('SECURE_AUTH_KEY',  '2JBz/hj9W#-0A>ywcGD-RsLn?^UjK[<nyOKaw=2HTtl4f8Sv];rw)z_E X:}<xZ:');
define('LOGGED_IN_KEY',    'V/*%8F@Klv%_d/;]}b}{+b`z 8?/#2Gq%EEKB6N$421xU<q06.$/EM; m;IU9Mw-');
define('NONCE_KEY',        ':8wc=8{mpa3y%vS_2U}JeK-j%tS+*C[(f4:$vaP!e`:UZSc`I=U;j;jb(XmFYlc9');
define('AUTH_SALT',        'K2^]V7y+IcODlh8J.w)1gr-1aBAd9?4L?`[u[KRA1#t;|f%@GSB%)gB=-N]5kbPu');
define('SECURE_AUTH_SALT', 'R-8sTmTzl[P*RiA/|&lj9:9:rwg9Lbk*%.#kDNk:3:flpU_?mv3V@:Vc=Xgc :my');
define('LOGGED_IN_SALT',   'R-3p.E9BNe5HBg2gi1lJC|e~ymoA4{tBQB}bzj<`.!a*4)Gf]2nKiRO>uA|JNCtU');
define('NONCE_SALT',       'UY1z:=t]t<pKytV0%WNMWk+wE.p9ulU(WDP|t:p(57@?%2*@8M|2XHi]1AEn-g|D');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'salagd_';   

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
