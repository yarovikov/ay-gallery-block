<?php
/**
* Plugin Name: AY Gallery
* Description: Gutenberg Gallery Block with Fancybox
* Plugin URI:  https://yarovikov.com/
* Author URI:  https://yarovikov.com/
* Author:      Alexandr Yarovikov
* Text Domain: ay
* Domain Path: /languages
* License:     GPL2
* License URI: https://www.gnu.org/licenses/gpl-2.0.html
* Version:     1.0
*/


defined( 'ABSPATH' ) || exit;


function ay_gallery_block_load_textdomain() {
	load_plugin_textdomain( 'ay', false, dirname( plugin_basename( __FILE__ ) ) . '/languages' );	
}
add_action( 'init', 'ay_gallery_block_load_textdomain' );


function ay_gallery_block() {

	wp_register_script( 'ay-gallery-block', plugins_url( '/dist/blocks.build.js', __FILE__ ), array( 'wp-editor', 'wp-blocks', 'wp-element', 'wp-i18n' ) );
	wp_register_style( 'ay-gallery-block-style', plugins_url( '/dist/blocks.style.build.css', __FILE__ ), array() );
	wp_register_style( 'ay-gallery-block-edit-style', plugins_url( '/dist/blocks.editor.build.css', __FILE__ ), array( 'wp-edit-blocks' ) );
	
	wp_set_script_translations( 'ay-gallery-block', 'ay' );

	register_block_type( 'ay/gallery', array(
			'editor_script' => 'ay-gallery-block',
			'editor_style' => 'ay-gallery-block-edit-style',
			'style' => 'ay-gallery-block-style',
		) );

}
add_action( 'init', 'ay_gallery_block' );


function ay_gallery_scripts() {
	
	$post = get_post(); 
	
    $blocks = parse_blocks( $post->post_content );
	
	foreach ( $blocks as $block ) {
	    	
    	if ( $block['blockName'] == 'ay/gallery' ) {
			
			// check fancy toggle control and load lib
    	    if ( array_key_exists( 'fancy', $block['attrs'] ) ) {
    	    	wp_enqueue_style( 'fancybox', 'https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.5.7/jquery.fancybox.min.css', null, '3.5.7' );
				wp_enqueue_script( 'fancybox', 'https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.5.7/jquery.fancybox.min.js', array( 'jquery' ), '3.5.7', true );
				wp_enqueue_script( 'ay-gallery-fancybox', plugins_url( '/dist/js/ay-gallery-fancybox.js', __FILE__ ), array( 'jquery' ), '3.5.7', true );
    	    }
    	
    	}
    }
	
}
add_action( 'wp_enqueue_scripts', 'ay_gallery_scripts' );