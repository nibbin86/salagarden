<?php
/**
 * The header for our theme.
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package everrichinfinity
 */

?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="profile" href="http://gmpg.org/xfn/11">
<link href="https://fonts.googleapis.com/css?family=Open+Sans+Condensed:300,300i,700&subset=vietnamese" rel="stylesheet">
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.13/css/all.css" integrity="sha384-DNOHZ68U8hZfKXOrtjWvjxusGo9WQnrNx2sqG0tfsghAvtVlRW3tvkXWZh58N9jp" crossorigin="anonymous">

<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-WSRB5H4');</script>
<!-- End Google Tag Manager -->

<?php wp_head(); ?>
</head>

<body <?php body_class('zparallax'); ?> data-preload-domready-method="scrollbar.ready"
		data-option="

					// OPTION FOR PARALLAX MODULE
					indicator: false,
					autoscaleusecss: false,

					// OPTION FOR SCROLL
					scrolltime: 1000,
					transition: 2,

					// OPTION FOR SCROLLBAR MODULE
					usecss: true,
					scrollline: 200,
					scrolllinetouchpad: 80,
					alwayshide: false,
					shadow: false,
					snapElements: '.zparallax-section',
					looseSnap: true,

					customUsedefaultCssClass: 'ismobile',
					autoUseDefaultWhenWidthLessThan: 600,

					debug: false
					">
					
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WSRB5H4"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->

<div class="sidebuttons">
	<div class="btn-item btn-register">
		<div class="zparallax-navigation" rel="#contact" data-name="contact"><img src="<?php echo get_template_directory_uri(); ?>/images/icons/regis-btn.png" alt="" /></div>
	</div>
	<div class="btn-item btn-gotop">
		<div class="zparallax-navigation" rel="#banner" data-name="banner"><img src="<?php echo get_template_directory_uri(); ?>/images/icons/gotop-btn.png" alt="" /></div>
	</div>
</div>
<div class="MainContainer">
		<header class="zfreezepanel">
			<div class="wrapper row container">
					<div class="logo col-md-2">
					 	<a href="<?php echo site_url(); ?>"><img src="<?php echo get_template_directory_uri(); ?>/images/logo/logo.png"></a>
					</div>
				<div class="Menu col-md-10">
					<div class="mobile-menu">
						<span class="bar-1"></span>
						<span class="bar-2"></span>
						<span class="bar-3"></span>
					</div>
					<ul>
						<li><a id="overal_li" rel="#ProjectSize" class="zparallax-navigation menu-item" data-name="banner">TRANG CHỦ</a></li>
						<li><a id="Locations_li" rel="#Location" class="zparallax-navigation menu-item" data-name="location">VỊ TRÍ</a></li>
						<li><a id="Featured_li" rel="#Featured" class="zparallax-navigation menu-item" data-name="featured">TIỆN ÍCH</a></li>
						<li><a id="Services_li" rel="#Services" class="zparallax-navigation menu-item" data-name="services">DỊCH VỤ</a></li>
						<li><a id="Products_li" rel="#Products" class="zparallax-navigation menu-item" data-name="products">SẢN PHẨM</a></li>
						<li><a href="tel: 0937709696" class="phone-number"><i class="fas fa-phone-volume animated infinite tada"></i>  093 770 9696</a></li>
						<?php /* ?><li><a   class="noLineRight contact zparallax-navigation" id="contactUs" rel="#contact" data-name="contact">LIÊN HỆ</a></li><?php */ ?>
					</ul>
				</div>
			</div>
		</header>
