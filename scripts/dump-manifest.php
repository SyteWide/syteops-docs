<?php
/**
 * Dump the SyteOps Manage API manifest to JSON. Requires the zero-WP manifest file
 * directly (per its own "MUST contain zero WordPress function calls" contract).
 *
 * Usage: php scripts/dump-manifest.php [output-path]
 */
$repo         = dirname( __DIR__, 2 ); // docs-site/scripts -> docs-site -> syteops repo root
$manifestFile = $repo . '/includes/core/manage/syteops-manage-manifest.php';
if ( ! is_file( $manifestFile ) ) {
	fwrite( STDERR, "Manifest file not found: $manifestFile\n" );
	exit( 1 );
}
require_once $manifestFile;
if ( ! function_exists( 'syteops_manage_get_manifest' ) ) {
	fwrite( STDERR, "syteops_manage_get_manifest() not defined\n" );
	exit( 1 );
}
// Stamp the SyteOps version from the plugin header.
$ver  = 'dev';
$main = @file_get_contents( $repo . '/syteops.php' );
if ( $main && preg_match( '/^\s*\*\s*Version:\s*(.+)$/mi', $main, $m ) ) {
	$ver = trim( $m[1] );
}
$out     = $argv[1] ?? ( __DIR__ . '/../data/syteops-manifest.json' );
$payload = array(
	'schema_version'  => 1,
	'syteops_version' => $ver,
	'operations'      => array_values( syteops_manage_get_manifest() ),
);
file_put_contents( $out, json_encode( $payload, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE ) . "\n" );
fwrite( STDERR, sprintf( "Wrote %d operations to %s\n", count( $payload['operations'] ), $out ) );
