#!/usr/bin/env bash
set -e

HEADED_FLAG="--headed"
if [ -z "$DISPLAY" ] && [ -z "$WAYLAND_DISPLAY" ]; then
    echo "⚠️ [INFO] Sin pantalla gráfica detectada. Ejecutando en modo headless..."
    HEADED_FLAG=""
fi

echo "🚀 [1/2] Ejecutando Flujo Happy Path E2E..."
npx playwright test tests/e2e-happy-path.spec.ts $HEADED_FLAG

echo "🤖 [2/2] Ejecutando Demostración de IA..."
npx playwright test tests/ai-capability-demo.spec.ts $HEADED_FLAG
