<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Content-Type: application/json');

if (!isset($_GET['url'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing url']);
    exit;
}

$url = $_GET['url'];

// Security: only allow YouTube RSS
if (!str_starts_with($url, 'https://www.youtube.com/feeds/')) {
    http_response_code(403);
    echo json_encode(['error' => 'Only YouTube RSS allowed']);
    exit;
}

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 15);
curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (compatible; HekayatShab/1.0)'); // Important for YouTube

$xml = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($httpCode !== 200 || !$xml) {
    http_response_code(502);
    echo json_encode(['error' => 'Failed to fetch RSS from YouTube']);
    exit;
}

echo json_encode(['contents' => $xml]);
?>