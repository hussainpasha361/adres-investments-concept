# Zero-dependency static dev server (used until Node/Vite is installed).
param([int]$Port = 5173)

$Root = [IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..'))
$types = @{
  '.html' = 'text/html; charset=utf-8'; '.css' = 'text/css; charset=utf-8'
  '.js' = 'text/javascript; charset=utf-8'; '.json' = 'application/json'
  '.svg' = 'image/svg+xml'; '.png' = 'image/png'; '.jpg' = 'image/jpeg'
  '.jpeg' = 'image/jpeg'; '.webp' = 'image/webp'; '.ico' = 'image/x-icon'
  '.woff2' = 'font/woff2'; '.mp4' = 'video/mp4'
}

$listener = [System.Net.HttpListener]::new()
$listener.Prefixes.Add("http://localhost:$Port/")
$listener.Start()
Write-Host "Adres Investments dev server: http://localhost:$Port/  (root: $Root)"

while ($listener.IsListening) {
  $ctx = $listener.GetContext()
  $res = $ctx.Response
  try {
    $path = [Uri]::UnescapeDataString($ctx.Request.Url.AbsolutePath).TrimStart('/')
    if ($path -eq '') { $path = 'index.html' }
    $full = [IO.Path]::GetFullPath((Join-Path $Root $path))
    if (Test-Path $full -PathType Container) { $full = Join-Path $full 'index.html' }

    if ($full.StartsWith($Root) -and (Test-Path $full -PathType Leaf)) {
      $bytes = [IO.File]::ReadAllBytes($full)
      $ext = [IO.Path]::GetExtension($full).ToLower()
      $res.ContentType = if ($types.ContainsKey($ext)) { $types[$ext] } else { 'application/octet-stream' }
      $res.Headers.Add('Cache-Control', 'no-store')
      $res.ContentLength64 = $bytes.Length
      $res.OutputStream.Write($bytes, 0, $bytes.Length)
    } else {
      $res.StatusCode = 404
      $b = [Text.Encoding]::UTF8.GetBytes('Not found')
      $res.OutputStream.Write($b, 0, $b.Length)
    }
    Write-Host "$($res.StatusCode) /$path"
  } catch {
    Write-Host "Error: $_"
  } finally {
    $res.Close()
  }
}
