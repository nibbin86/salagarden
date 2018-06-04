<?php
/**
 * Template part for displaying page content in page.php.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package everrichinfinity
 */

?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	<?php //the_title( '<h1 class="entry-title">', '</h1>' ); ?>
	
	<div class="entry-content container wrapper">
		<?php
			the_content();
		?>
	</div><!-- .entry-content -->

	
</article><!-- #post-## -->
