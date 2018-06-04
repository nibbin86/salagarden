<?php
/**
 * everrichinfinity functions and definitions.
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package everrichinfinity
 */

if ( ! function_exists( 'everrichinfinity_setup' ) ) :
/**
 * Sets up theme defaults and registers support for various WordPress features.
 *
 * Note that this function is hooked into the after_setup_theme hook, which
 * runs before the init hook. The init hook is too late for some features, such
 * as indicating support for post thumbnails.
 */
function everrichinfinity_setup() {
	/*
	 * Make theme available for translation.
	 * Translations can be filed in the /languages/ directory.
	 * If you're building a theme based on everrichinfinity, use a find and replace
	 * to change 'everrichinfinity' to the name of your theme in all the template files.
	 */
	load_theme_textdomain( 'everrichinfinity', get_template_directory() . '/languages' );

	// Add default posts and comments RSS feed links to head.
	add_theme_support( 'automatic-feed-links' );

	/*
	 * Let WordPress manage the document title.
	 * By adding theme support, we declare that this theme does not use a
	 * hard-coded <title> tag in the document head, and expect WordPress to
	 * provide it for us.
	 */
	add_theme_support( 'title-tag' );

	/*
	 * Enable support for Post Thumbnails on posts and pages.
	 *
	 * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
	 */
	add_theme_support( 'post-thumbnails' );

	// This theme uses wp_nav_menu() in one location.
	register_nav_menus( array(
		'primary' => esc_html__( 'Primary', 'everrichinfinity' ),
	) );

	/*
	 * Switch default core markup for search form, comment form, and comments
	 * to output valid HTML5.
	 */
	add_theme_support( 'html5', array(
		'search-form',
		'comment-form',
		'comment-list',
		'gallery',
		'caption',
	) );

	// Set up the WordPress core custom background feature.
	add_theme_support( 'custom-background', apply_filters( 'everrichinfinity_custom_background_args', array(
		'default-color' => 'ffffff',
		'default-image' => '',
	) ) );
}
endif;
add_action( 'after_setup_theme', 'everrichinfinity_setup' );

/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 *
 * Priority 0 to make it available to lower priority callbacks.
 *
 * @global int $content_width
 */
function everrichinfinity_content_width() {
	$GLOBALS['content_width'] = apply_filters( 'everrichinfinity_content_width', 640 );
}
add_action( 'after_setup_theme', 'everrichinfinity_content_width', 0 );

/**
 * Register widget area.
 *
 * @link https://developer.wordpress.org/themes/functionality/sidebars/#registering-a-sidebar
 */
function everrichinfinity_widgets_init() {
	register_sidebar( array(
		'name'          => esc_html__( 'Sidebar', 'everrichinfinity' ),
		'id'            => 'sidebar-1',
		'description'   => esc_html__( 'Add widgets here.', 'everrichinfinity' ),
		'before_widget' => '<section id="%1$s" class="widget %2$s">',
		'after_widget'  => '</section>',
		'before_title'  => '<h2 class="widget-title">',
		'after_title'   => '</h2>',
	) );
}
add_action( 'widgets_init', 'everrichinfinity_widgets_init' );

/**
 * Enqueue scripts and styles.
 */
function everrichinfinity_scripts() {
	wp_enqueue_style( 'everrichinfinity-style', get_stylesheet_uri() );

	wp_enqueue_script( 'everrichinfinity-navigation', get_template_directory_uri() . '/js/navigation.js', array(), '20151215', true );

	wp_enqueue_script( 'everrichinfinity-skip-link-focus-fix', get_template_directory_uri() . '/js/skip-link-focus-fix.js', array(), '20151215', true );

	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}

	wp_enqueue_style( 'bootstrap-style', get_template_directory_uri() . '/css/bootstrap.min.css', array(), time());

	wp_enqueue_style( 'animation-style', get_template_directory_uri() . '/css/animate.css', array(), time());

	wp_enqueue_style( 'colorbox-style', get_template_directory_uri() . '/css/colorbox.css', array(), time());
	
	wp_enqueue_style( 'fancybox-style', get_template_directory_uri() . '/css/jquery.fancybox.css', array(), time());
	
	wp_enqueue_style( 'fancybox-thumb-style', get_template_directory_uri() . '/css/jquery.fancybox-thumbs.css', array(), time());
	
	wp_enqueue_style( 'swiper-style', get_template_directory_uri() . '/css/swiper.min.css', array(), time());

	wp_enqueue_style( 'main-style', get_template_directory_uri() . '/css/styles.css', array(), time());

	wp_enqueue_script( 'jquery-selectbox-js', get_template_directory_uri() . '/js/jquery-1.10.2.min.js', array(), time(), true );

	wp_enqueue_script( 'libararries-zjs', get_template_directory_uri() . '/zjs/z.min.js', array(), time(), true );

	wp_enqueue_script( 'jquery-bpopup-js', get_template_directory_uri() . '/js/jquery.bpopup.min.js', array(), time(), true );

	wp_enqueue_script( 'jquery-colorbox-js', get_template_directory_uri() . '/js/jquery.colorbox.js', array(), time(), true );
	
	wp_enqueue_script( 'jquery-fancybox-js', get_template_directory_uri() . '/js/jquery.fancybox.js', array(), time(), true );
	
	wp_enqueue_script( 'jquery-fancybox-thumb-js', get_template_directory_uri() . '/js/jquery.fancybox-thumbs.js', array(), time(), true );

	wp_enqueue_script( 'jquery-waypoints-js', get_template_directory_uri() . '/js/waypoints.min.js', array(), time(), true );

	wp_enqueue_script( 'jquery-counterup-js', get_template_directory_uri() . '/js/jquery.counterup.js', array(), time(), true );
	
	wp_enqueue_script( 'swiper-js', get_template_directory_uri() . '/js/swiper.min.js', array(), time(), true );

	wp_enqueue_script( 'main-js', get_template_directory_uri() . '/js/main.js', array(), time(), true );

	wp_localize_script( 'main-js', 'main_ajax', array( 'ajaxurl' => admin_url( 'admin-ajax.php' ) ) );


}
add_action( 'wp_enqueue_scripts', 'everrichinfinity_scripts' );

/**
 * Implement the Custom Header feature.
 */
require get_template_directory() . '/inc/custom-header.php';

/**
 * Custom template tags for this theme.
 */
require get_template_directory() . '/inc/template-tags.php';

/**
 * Custom functions that act independently of the theme templates.
 */
require get_template_directory() . '/inc/extras.php';

/**
 * Customizer additions.
 */
require get_template_directory() . '/inc/customizer.php';

/**
 * Load Jetpack compatibility file.
 */
require get_template_directory() . '/inc/jetpack.php';

show_admin_bar(false);

add_action("wp_ajax_nopriv_load_post_content", "load_post_content");
add_action("wp_ajax_load_post_content", "load_post_content");
function load_post_content(){
	$post_id = strip_tags(addslashes($_POST['post_id']));
	if(empty($post_id)) return;

	$news = get_post($post_id);

	preg_match('/\[gallery.*ids=.(.*).\]/', $news->post_content, $ids);
	$images_id = explode(",", $ids[1]);

	$output = '';
	if( $count = count($images_id) ){

		$output .= '<div class="zslider" data-option="theme:\'linear\',
													transition:\'fade\',
													transitionTime:1600,
													border: false,
													preload: false,
													autoplay: false,
													autoplayTime: 6000,
													navButton: true,
													showInfo: false,
													navThumb: false,
													navDot: true,
													navDot: false,
													fullWidth: true">';
		$output .= '<ul>';
		foreach($images_id as $image_id){
			$output .= '<li>';
				$output .= wp_get_attachment_image( $image_id, 'full' );
			$output .= '</li>';
		}
		$output .= '</ul>';
		$output .= '</div>';
	}


	wp_send_json_success(array('message' => 'Successful', 'html' => $output));
}


/* add gallery */
function gallery_zslider_shortcode($val, $attr){
	$post = get_post();

	static $instance = 0;
	$instance++;

	extract(shortcode_atts(array(
		'order'      => 'ASC',
		'orderby'    => 'menu_order ID',
		'id'         => $post->ID,
		'itemtag'    => 'dl',
		'icontag'    => 'dt',
		'captiontag' => 'dd',
		'columns'    => 3,
		'size'       => 'thumbnail',
		'include'    => '',
		'exclude'    => '',
	), $attr));

	$_attachments = get_posts(array('include' => $include, 'post_status' => 'inherit', 'post_type' => 'attachment', 'post_mime_type' => 'image', 'order' => $order, 'orderby' => $orderby) );
	$attachments = array();
	foreach ( $_attachments as $key => $val ) {
		$attachments[$val->ID] = $_attachments[$key];
	}
	if ( empty($attachments) )
		return '';

	if ( is_feed() ) {
		$output = "\n";
		foreach ( $attachments as $att_id => $attachment )
			$output .= wp_get_attachment_link($att_id, $size, true) . "\n";
		return $output;
	}

	$output = '';
	if( $count = count($attachments) ){
		$i = 0 ;
		$output .= '<div class="gallery gallery_slider clearfix">';
			foreach($attachments as $attachment){
				$i++;

				$output .= '<div class="item item-'.$i.'">';
					$output .= '<a class="btn-popup-zslider" href="#">'.wp_get_attachment_image( $attachment->ID ).'</a>';
				$output .= '</div>';
			}
		$output .= '</div>';
		$output .= '<div class="zpopup zpopup_slider zui-popup-hide" data-option="center:true, clickout:true">';
			$output .= '<div class="zpopup_content" style="width:800px;">';
			$output .= '<div class="zslider" data-option="theme:\'linear\',
														transition:\'fade\',
														transitionTime:1600,
														border: false,
														preload: false,
														autoplay: false,
														autoplayTime: 6000,
														navButton: true,
														showInfo: false,
														navThumb: true,
														navDot: false,
														fullWidth: true">';
			$output .= '<ul>';
			foreach($attachments as $attachment){
				$output .= '<li>';
					$output .= wp_get_attachment_image( $attachment->ID, 'full' );
				$output .= '</li>';
			}
			$output .= '</ul>';
			$output .= '</div>';
			$output .= '</div>';
		$output .= '</div>';
	}
	return $output;
}
add_filter('post_gallery', 'gallery_zslider_shortcode', 10, 3);