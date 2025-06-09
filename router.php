<?php
$publicDir = __DIR__ . '/public';
$request = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

// Serve static files directly
if (file_exists($publicDir . $request) && !is_dir($publicDir . $request)) {
    return false;
}

// Clean URL: /about -> /public/about.php
// if (file_exists($publicDir . $request . '.php')) {
//     require $publicDir . $request . '.php';
//     return true;
// }

// If a directory is requested
// if (is_dir($publicDir . $request)) {
//     if (file_exists($publicDir . $request . '/select-file.php')) {
//         require $publicDir . $request . '/select-file.php';
//         return true;
//     }
//     // No index.php — redirect to home
//     header('Location: /');
//     exit;
// }

// Root request
// if ($request === '/' || $request === '') {
//     require $publicDir . '/index.php';
//     return true;
// }

// All else — redirect to home
// header('Location: /');
exit;