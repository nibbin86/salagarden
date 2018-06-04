<?php
/*
 * Template Name: Hompage Template
 *
 */
	get_header();
?>
	<section id="banner">
		<?php
			$banners = get_field('banner');
		?>
		<div class="slide-banner zparallax-section" data-name="banner" data-autoscale="true">
			<div class="zslider" data-option="theme:'linear',
				transition:'horizontal',
				transitionTime:1400,
				border: false,
				preload: false,
				autoplay: true,
				autoplayTime: 3000,
				playButton: false,
				navButton: false,
				navThumb: false,
				navDot: true,
				link: true,
				fullscreenWidth: true,
				fullHeight:true,
				navThumbTemplate: '<a></a>',
				navDotTemplate: '<a>${index}</a>'">

				<ul>
					<?php foreach($banners as $_banner): ?>
						<?php $banner = $_banner['large'] ? $_banner['large']: $_banner['url']; ?>
						<li>
							<img src="<?php echo $banner; ?>" largesrc="<?php echo $banner; ?>" />
						</li>
					<?php endforeach; ?>
				</ul>
			</div>
		</div>
		<div class="form-leftside">
			<h2>An yên miền đất Phật</h2>
			<p>Nghĩa trang hoa viên sinh thái hiện đại<br />& chuyên nghiệp bậc nhất Việt Nam</p>
			<p><img src="<?php echo get_template_directory_uri(); ?>/images/home-promotion-img-t6.png" alt="" /></p>
			<div class="form-box">
				<h3>Đăng ký tư vấn</h3>
				<?php echo do_shortcode('[contact-form-7 id="7" title="Conact Form"]'); ?>
			</div>	
		</div>
		<div class="scrolldown">
			<a class="zparallax-navigation" rel="#location" data-name="location"><img class="animated infinite slideOutDown" src="<?php echo get_template_directory_uri(); ?>/images/icons/mousescroll-ico.png" alt="" /></a>
		</div>
	</section>
	<section id="Location" class="zparallax-section" data-name="location" data-autoscale="false" >
		<?php
			$location_galleries = get_field('location_image');
		?>
		<div class="slide-banner zparallax-section" data-name="banner" data-autoscale="true">
			<div class="zslider" data-option="theme:'linear',
				transition:'horizontal',
				transitionTime:1400,
				border: false,
				preload: false,
				autoplay: true,
				autoplayTime: 5000,
				playButton: false,
				navButton: false,
				navThumb: false,
				navDot: true,
				link: true,
				fullscreenWidth: true,
				fullHeight:true,
				navThumbTemplate: '<a></a>',
				navDotTemplate: '<a>${index}</a>'">

				<ul>
					<?php foreach($location_galleries as $_banner): ?>
						<?php $banner = $_banner['large'] ? $_banner['large']: $_banner['url']; ?>
						<li>
							<img src="<?php echo $banner; ?>" largesrc="<?php echo $banner; ?>" />
						</li>
					<?php endforeach; ?>
				</ul>
			</div>
		</div>
		<div class="places wow fadeInRight" data-wow-duration="1.5s">
			<?php echo get_field('location_description'); ?>
			<a class="moveout"><img src="<?php echo get_template_directory_uri(); ?>/images/icons/arrow-moveout" alt="" /></a>
		</div>
	</section>
	<section id="Featured" class="zparallax-section" data-name="featured" data-autoscale="false">
		<div class="title">
			<img src="<?php echo get_template_directory_uri(); ?>/images/title-section-03.png" alt="" />
			<h2>Hiện đại - Chuyên nghiệp - Vẹn tròn hiếu đạo</h2>
		</div>
		<div class="show-on-desktop">
			<div class="featured-list">
				<div class="featured-list-column">
					<div class="featured-item">
						<?php /* ?><a class="gallery cboxElement" href="<?php echo get_template_directory_uri(); ?>/images/gallery/img-nhadieuhanh-section-03.png"><img src="<?php echo get_template_directory_uri(); ?>/images/gallery/img-nhadieuhanh-section-03.png" alt="" /></a><?php */ ?>
						<a data-fancybox-group="thumb" class="fancybox-thumbs" href="<?php echo get_template_directory_uri(); ?>/images/gallery/nha-dieu-hanh-full.png"><img src="<?php echo get_template_directory_uri(); ?>/images/gallery/img-nhadieuhanh-section-03.png" alt="" /></a>
						<h3><span>Nhà điều hành</span></h3>
					</div>	
				</div>	
				<div class="featured-list-column has-row">
					<div class="has-row-inside">	
						<div class="featured-list-row">
							<div class="featured-item">
								<?php /* ?><a class="gallery cboxElement" href="<?php echo get_template_directory_uri(); ?>/images/gallery/img-nhatangle-section-03.png"><img src="<?php echo get_template_directory_uri(); ?>/images/gallery/img-nhatangle-section-03.png" alt="" /></a><?php */ ?>
								<a data-fancybox-group="thumb" class="fancybox-thumbs" href="<?php echo get_template_directory_uri(); ?>/images/gallery/nha-tang-le-full.png"><img src="<?php echo get_template_directory_uri(); ?>/images/gallery/img-nhatangle-section-03.png" alt="" /></a>
								<h3><span>Nhà tang lễ</span></h3>
							</div>
						</div>
						<div class="featured-list-row">
							<div class="featured-item">
								<?php /* ?><a class="gallery cboxElement" href="<?php echo get_template_directory_uri(); ?>/images/gallery/img-nhahoatang-section-03.png"><img src="<?php echo get_template_directory_uri(); ?>/images/gallery/img-nhahoatang-section-03.png" alt="" /></a><?php */ ?>
								<a data-fancybox-group="thumb" class="fancybox-thumbs" href="<?php echo get_template_directory_uri(); ?>/images/gallery/nha-hoa-tang-full.png"><img src="<?php echo get_template_directory_uri(); ?>/images/gallery/img-nhahoatang-section-03.png" alt="" /></a>
								<h3><span>Nhà hỏa táng</span></h3>
							</div>
						</div>
					</div>
				</div>	
				<div class="featured-list-column has-row">
					<div class="has-row-inside">	
						<div class="featured-list-row">
							<div class="featured-item">
								<?php /* ?><a class="gallery cboxElement" href="<?php echo get_template_directory_uri(); ?>/images/gallery/img-tuongdaluucot-section-03.png"><img src="<?php echo get_template_directory_uri(); ?>/images/gallery/img-tuongdaluucot-section-03.png" alt="" /></a><?php */ ?>
								<a data-fancybox-group="thumb" class="fancybox-thumbs" href="<?php echo get_template_directory_uri(); ?>/images/gallery/tuong-da-luu-cot-full.png"><img src="<?php echo get_template_directory_uri(); ?>/images/gallery/img-tuongdaluucot-section-03.png" alt="" /></a>
								<h3><span>Tường đá lưu cốt</span></h3>
							</div>
						</div>
						<div class="featured-list-row">
							<div class="featured-item">
								<?php /* ?><a class="gallery cboxElement" href="<?php echo get_template_directory_uri(); ?>/images/gallery/img-dentrinh-section-03.png"><img src="<?php echo get_template_directory_uri(); ?>/images/gallery/img-dentrinh-section-03.png" alt="" /></a><?php */ ?>
								<a data-fancybox-group="thumb" class="fancybox-thumbs" href="<?php echo get_template_directory_uri(); ?>/images/gallery/den-trinh-full.png"><img src="<?php echo get_template_directory_uri(); ?>/images/gallery/img-dentrinh-section-03.png" alt="" /></a>
								<h3><span>Đền trình</span></h3>
							</div>
						</div>
					</div>
				</div>	
				<div class="featured-list-column">
					<div class="featured-item">				
						<?php /* ?><a class="gallery cboxElement" href="<?php echo get_template_directory_uri(); ?>/images/gallery/img-thienvien-section-03.png"><img src="<?php echo get_template_directory_uri(); ?>/images/gallery/img-thienvien-section-03.png" alt="" /></a><?php */ ?>
						<a data-fancybox-group="thumb" class="fancybox-thumbs" href="<?php echo get_template_directory_uri(); ?>/images/gallery/thu-vien-full.png"><img src="<?php echo get_template_directory_uri(); ?>/images/gallery/img-thienvien-section-03.png" alt="" /></a>
						<h3><span>Thiền viện</span></h3>
					</div>	
				</div>	
			</div>
		</div>
		<div class="show-on-mobile">
			<div class="featured-list">
				<div class="swiper-container gallery-featured">
					<div class="swiper-wrapper">
						<div class="swiper-slide">
							<div class="featured-item">				
								<img src="<?php echo get_template_directory_uri(); ?>/images/gallery/nha-dieu-hanh-full.png" alt="" />
								<h3><span>Nhà điều hành</span></h3>
							</div>
						</div>
						<div class="swiper-slide">
							<div class="featured-item">				
								<img src="<?php echo get_template_directory_uri(); ?>/images/gallery/nha-tang-le-full.png" alt="" />
								<h3><span>Nhà tang lễ</span></h3>
							</div>
						</div>
						<div class="swiper-slide">
							<div class="featured-item">				
								<img src="<?php echo get_template_directory_uri(); ?>/images/gallery/nha-hoa-tang-full.png" alt="" />
								<h3><span>Nhà hỏa táng</span></h3>
							</div>
						</div>
						<div class="swiper-slide">
							<div class="featured-item">				
								<img src="<?php echo get_template_directory_uri(); ?>/images/gallery/tuong-da-luu-cot-full.png" alt="" />
								<h3><span>Tường đá lưu cốt</span></h3>
							</div>
						</div>
						<div class="swiper-slide">
							<div class="featured-item">				
								<img src="<?php echo get_template_directory_uri(); ?>/images/gallery/den-trinh-full.png" alt="" />
								<h3><span>Đền trình</span></h3>
							</div>
						</div>
						<div class="swiper-slide">
							<div class="featured-item">				
								<img src="<?php echo get_template_directory_uri(); ?>/images/gallery/thu-vien-full.png" alt="" />
								<h3><span>Thiền viện</span></h3>
							</div>
						</div>
					</div>
					<div class="swiper-pagination swiper-pagination-featured"></div>
				</div>
			</div>
		</div>
	</section>
	<section id="Services" class="zparallax-section" data-name="services" data-autoscale="false" >
		<div class="wrapper container">
			<div class="col-left">
				<div class="title">
					<img src="<?php echo get_template_directory_uri(); ?>/images/title-section-04.png" alt="" />
				</div>
				<div class="swiper-pagination swiper-pagination-services clearfix"></div>
			</div>
			<div class="col-right">
				<div class="swiper-container gallery-services">
					<div class="swiper-wrapper">
					  <div class="swiper-slide" data-name="Tư vấn và tổ chức tang lễ">
						<img src="<?php echo get_template_directory_uri(); ?>/images/gallery/img01-right-section-04.jpg" alt="" />
					  </div>
					  <div class="swiper-slide" data-name="Hoả táng và lưu giữ tro cốt">
						<img src="<?php echo get_template_directory_uri(); ?>/images/gallery/img02-right-section-04.jpg" alt="" />
					  </div>
					  <div class="swiper-slide" data-name="Dịch vụ chăm sóc phần mộ">
						<img src="<?php echo get_template_directory_uri(); ?>/images/gallery/img03-right-section-04.jpg" alt="" />
					  </div>
					  <div class="swiper-slide" data-name="Tổ chức nghi lễ, sự kiện tâm linh">
						<img src="<?php echo get_template_directory_uri(); ?>/images/gallery/img04-right-section-04.jpg" alt="" />
					  </div>
					</div>
				</div>
			</div>
		</div>
	</section>
	<section id="Products" class="zparallax-section clearfix" data-name="products" data-autoscale="false" >
		<div class="ztabpanel">
			<div class="ztabpaneltabs">
				<div class="title">
					<img src="<?php echo get_template_directory_uri(); ?>/images/title-section-05.png" alt="" />
				</div>
				<ul>
					<li>Mộ gia tộc</li>
					<li>Mộ đơn - Mộ đôi</li>
				</ul>
			</div>	
			<div class="">
				<div class="col-left">
					<div class="swiper-container gallery-products-mogiatoc">
						<div class="swiper-wrapper">
						  <div class="swiper-slide">
							<img src="<?php echo get_template_directory_uri(); ?>/images/gallery/mogiatoc-01.jpg" alt="" />
						  </div>
						  <div class="swiper-slide">
							<img src="<?php echo get_template_directory_uri(); ?>/images/gallery/mogiatoc-02.jpg" alt="" />
						  </div>
						  <div class="swiper-slide">
							<img src="<?php echo get_template_directory_uri(); ?>/images/gallery/mogiatoc-03.jpg" alt="" />
						  </div>
						  <div class="swiper-slide">
							<img src="<?php echo get_template_directory_uri(); ?>/images/gallery/mogiatoc-04.jpg" alt="" />
						  </div>
						  <div class="swiper-slide">
							<img src="<?php echo get_template_directory_uri(); ?>/images/gallery/mogiatoc-05.jpg" alt="" />
						  </div>
						</div>
						<div class="swiper-pagination-mogiatoc"></div>
					</div>
				</div>
			</div>
			<div>
				<div class="col-left">
					<div class="swiper-container gallery-products-modon">
						<div class="swiper-wrapper">
						  <div class="swiper-slide">
							<img src="<?php echo get_template_directory_uri(); ?>/images/gallery/modon-01.jpg" alt="" />
						  </div>
						  <div class="swiper-slide">
							<img src="<?php echo get_template_directory_uri(); ?>/images/gallery/modon-02.jpg" alt="" />
						  </div>
						  <div class="swiper-slide">
							<img src="<?php echo get_template_directory_uri(); ?>/images/gallery/modon-03.jpg" alt="" />
						  </div>
						  <div class="swiper-slide">
							<img src="<?php echo get_template_directory_uri(); ?>/images/gallery/modon-04.jpg" alt="" />
						  </div>
						  <div class="swiper-slide">
							<img src="<?php echo get_template_directory_uri(); ?>/images/gallery/modon-05.jpg" alt="" />
						  </div>
						</div>
						</div>
						<div class="swiper-pagination-modon"></div>
					</div>
				</div>
			</div>
		</div>
		<?php /* ?><div class="col-left">
			<div class="swiper-container gallery-products">
				<div class="swiper-wrapper">
				  <div class="swiper-slide">
					<img src="<?php echo get_template_directory_uri(); ?>/images/gallery/img-modon-section-05.jpg" alt="" />
				  </div>
				  <div class="swiper-slide">
					<img src="<?php echo get_template_directory_uri(); ?>/images/gallery/img-modoi-section-05.jpg" alt="" />
				  </div>
				  <div class="swiper-slide">
					<img src="<?php echo get_template_directory_uri(); ?>/images/gallery/img-mogiatoc-section-05.jpg" alt="" />
				  </div>
				  
				</div>
			</div>
		</div>
		<div class="col-right">
			<div class="title">
				<img src="<?php echo get_template_directory_uri(); ?>/images/title-section-05.png" alt="" />
			</div>
			<div class="swiper-pagination swiper-pagination-products"></div>
		</div><?php */ ?>
	</section>
	<section id="contact" class="zparallax-section" data-name="contact" data-autoscale="false" >
		<div class="wrapper  container wow fadeInUp" data-wow-duration="1.5s">
			<div class="formInfor row">
				<div class="formContact col-md-12">
					<div class="row ">
						<?php echo do_shortcode('[contact-form-7 id="7" title="Conact Form"]'); ?>
					</div>
				</div>
				<div class="FirmInfo col-md-12">
					<div class="wrapper">
						<?php echo get_field('form_description'); ?>
					</div>
				</div>
			</div>
		</div>
	</section>

<?php
	/*
	=========================
	FOOTER
	=========================
	*/
?>
<?php get_footer(); ?>