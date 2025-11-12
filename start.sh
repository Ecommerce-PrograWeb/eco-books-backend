#!/bin/sh
set -e

echo "🚀 Starting eco-books-backend..."

echo "📦 Running database migrations..."
npm run migrate

echo "🌱 Running database seeders..."
npm run seed || echo "⚠️  Seeders already applied or failed (this is OK)"

echo "✅ Starting server..."
exec npm start
