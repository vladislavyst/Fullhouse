param(
    [Parameter(Mandatory=$true)]
    [string]$InputPath,
    [Parameter(Mandatory=$true)]
    [string]$OutputDir
)

$ErrorActionPreference = "Stop"

if (-not (Test-Path -LiteralPath $InputPath)) {
	Write-Error "Input file not found: $InputPath"
}

New-Item -ItemType Directory -Force -Path $OutputDir | Out-Null

$word = New-Object -ComObject Word.Application
$word.Visible = $false
try {
	$doc = $word.Documents.Open($InputPath)
	$baseName = [System.IO.Path]::GetFileNameWithoutExtension($InputPath)
	$htmlPath = Join-Path $OutputDir ($baseName + '.html')
	# 8 = wdFormatHTML
	$doc.SaveAs([ref]$htmlPath, [ref]8)
	$doc.Close()
	Write-Output $htmlPath
}
finally {
	$word.Quit()
}
