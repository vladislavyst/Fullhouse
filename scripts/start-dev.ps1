# Starts the Vite dev server from the project root
$ErrorActionPreference = "Stop"

$scriptDir = Split-Path -Path $MyInvocation.MyCommand.Definition -Parent
$projectDir = Split-Path -Path $scriptDir -Parent
Set-Location $projectDir

# Ensure npm is available
if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
  Write-Error "npm is not available in PATH. Please install Node.js and npm."
}

# Start dev server
npm run dev

