<?php
/**
 * Plugin Name: Playbook Contact Form Handler
 * Description: REST endpoint for headless contact form submissions. Stores entries as a custom post type and sends email notifications.
 * Version: 1.0.0
 * Author: Playbook Advisory Group
 *
 * Installation: Upload this file to wp-content/mu-plugins/ on the WordPress instance.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// ---------------------------------------------------------------------------
// Custom Post Type: Form submissions
// ---------------------------------------------------------------------------

add_action( 'init', function () {
	register_post_type( 'pb_form_entry', [
		'labels'       => [
			'name'          => 'Form submissions',
			'singular_name' => 'Submission',
			'menu_name'     => 'Form submissions',
			'all_items'     => 'All submissions',
			'search_items'  => 'Search submissions',
			'not_found'     => 'No submissions found',
		],
		'public'       => false,
		'show_ui'      => true,
		'show_in_menu' => true,
		'menu_icon'    => 'dashicons-email-alt',
		'supports'     => [ 'title' ],
		'capabilities' => [
			'create_posts' => 'do_not_allow',
		],
		'map_meta_cap' => true,
	] );
} );

// ---------------------------------------------------------------------------
// REST endpoint: POST /wp-json/playbook/v1/contact
// ---------------------------------------------------------------------------

add_action( 'rest_api_init', function () {
	register_rest_route( 'playbook/v1', '/contact', [
		'methods'             => 'POST',
		'callback'            => 'pb_handle_contact_submission',
		'permission_callback' => '__return_true',
		'args'                => [
			'name'         => [
				'required'          => true,
				'sanitize_callback' => 'sanitize_text_field',
			],
			'email'        => [
				'required'          => true,
				'sanitize_callback' => 'sanitize_email',
				'validate_callback' => function ( $value ) {
					return is_email( $value );
				},
			],
			'organisation' => [
				'sanitize_callback' => 'sanitize_text_field',
			],
			'subject'      => [
				'sanitize_callback' => 'sanitize_text_field',
			],
			'message'      => [
				'required'          => true,
				'sanitize_callback' => 'sanitize_textarea_field',
			],
			'form_source'  => [
				'sanitize_callback' => 'sanitize_text_field',
			],
		],
	] );
} );

function pb_handle_contact_submission( WP_REST_Request $request ): WP_REST_Response {
	$name    = $request->get_param( 'name' );
	$email   = $request->get_param( 'email' );
	$org     = $request->get_param( 'organisation' ) ?: "\u{2014}";
	$subject = $request->get_param( 'subject' ) ?: 'No subject';
	$message = $request->get_param( 'message' );
	$source  = $request->get_param( 'form_source' ) ?: 'website';

	// Store as a private CPT entry
	$post_id = wp_insert_post( [
		'post_type'   => 'pb_form_entry',
		'post_title'  => sprintf( 'Enquiry from %s — %s', $name, $subject ),
		'post_status' => 'private',
		'meta_input'  => [
			'_pb_name'    => $name,
			'_pb_email'   => $email,
			'_pb_org'     => $org,
			'_pb_subject' => $subject,
			'_pb_message' => $message,
			'_pb_source'  => $source,
		],
	] );

	if ( is_wp_error( $post_id ) ) {
		return new WP_REST_Response( [
			'success' => false,
			'error'   => 'Failed to store submission.',
		], 500 );
	}

	// Send email notification
	$to = 'hello@playbook-group.co.uk';

	$body = sprintf(
		"New enquiry via the Playbook website\n\n" .
		"Name: %s\n" .
		"Organisation: %s\n" .
		"Email: %s\n\n" .
		"Subject: %s\n\n" .
		"Message:\n%s\n\n" .
		"---\n" .
		"Form source: %s\n" .
		"Submitted: %s",
		$name,
		$org,
		$email,
		$subject,
		$message,
		$source,
		current_time( 'Y-m-d H:i:s' )
	);

	$headers = [
		'From: Playbook Website <noreply@playbook-group.co.uk>',
		'Reply-To: ' . $name . ' <' . $email . '>',
	];

	wp_mail( $to, '[Playbook] New enquiry: ' . $subject, $body, $headers );

	return new WP_REST_Response( [
		'success' => true,
		'id'      => $post_id,
	], 201 );
}

// ---------------------------------------------------------------------------
// Admin: Show submission meta fields in the edit screen
// ---------------------------------------------------------------------------

add_action( 'add_meta_boxes', function () {
	add_meta_box(
		'pb_submission_details',
		'Submission details',
		'pb_render_submission_meta_box',
		'pb_form_entry',
		'normal',
		'high'
	);
} );

function pb_render_submission_meta_box( WP_Post $post ): void {
	$fields = [
		'Name'         => get_post_meta( $post->ID, '_pb_name', true ),
		'Email'        => get_post_meta( $post->ID, '_pb_email', true ),
		'Organisation' => get_post_meta( $post->ID, '_pb_org', true ),
		'Subject'      => get_post_meta( $post->ID, '_pb_subject', true ),
		'Source'       => get_post_meta( $post->ID, '_pb_source', true ),
	];
	$message = get_post_meta( $post->ID, '_pb_message', true );

	echo '<table class="form-table"><tbody>';
	foreach ( $fields as $label => $value ) {
		$escaped = esc_html( $value ?: "\u{2014}" );
		if ( $label === 'Email' && $value ) {
			$escaped = '<a href="mailto:' . esc_attr( $value ) . '">' . esc_html( $value ) . '</a>';
		}
		echo '<tr><th scope="row">' . esc_html( $label ) . '</th><td>' . $escaped . '</td></tr>';
	}
	echo '</tbody></table>';

	if ( $message ) {
		echo '<h4 style="margin-top:1.5em;">Message</h4>';
		echo '<div style="background:#f9f9f9;padding:1em;border:1px solid #ddd;white-space:pre-wrap;">';
		echo esc_html( $message );
		echo '</div>';
	}
}

// ---------------------------------------------------------------------------
// Admin: Custom columns for the submissions list
// ---------------------------------------------------------------------------

add_filter( 'manage_pb_form_entry_posts_columns', function ( array $columns ): array {
	$new = [];
	foreach ( $columns as $key => $label ) {
		$new[ $key ] = $label;
		if ( $key === 'title' ) {
			$new['pb_email']  = 'Email';
			$new['pb_org']    = 'Organisation';
			$new['pb_source'] = 'Source';
		}
	}
	return $new;
} );

add_action( 'manage_pb_form_entry_posts_custom_column', function ( string $column, int $post_id ): void {
	switch ( $column ) {
		case 'pb_email':
			$email = get_post_meta( $post_id, '_pb_email', true );
			echo $email ? '<a href="mailto:' . esc_attr( $email ) . '">' . esc_html( $email ) . '</a>' : "\u{2014}";
			break;
		case 'pb_org':
			echo esc_html( get_post_meta( $post_id, '_pb_org', true ) ?: "\u{2014}" );
			break;
		case 'pb_source':
			echo esc_html( get_post_meta( $post_id, '_pb_source', true ) ?: "\u{2014}" );
			break;
	}
}, 10, 2 );
