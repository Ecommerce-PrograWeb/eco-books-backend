#!/bin/sh
set -e

echo "Starting eco-books-backend..."

echo "Running database migrations..."
npm run migrate || echo "Migration failed, continuing anyway..."

echo "Running database seeders..."
npm run seed || echo "Seeders already applied or failed (this is OK)"

echo "Starting server..."
exec npm start
