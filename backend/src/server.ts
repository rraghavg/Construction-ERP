import app from './app.js';
import { env } from './config/env.js';
import { connectDatabase } from './config/database.js';
import { autoSeedDevelopmentData } from './shared/seed/autoSeeder.js';

const PORT = parseInt(env.PORT, 10);

async function startServer() {
  try {
    await connectDatabase();
    await autoSeedDevelopmentData();
    
    const server = app.listen(PORT, () => {
      console.log(`\n==================================================`);
      console.log(`🚀 Apex Construction ERP Backend Monolith Running!`);
      console.log(`📡 Server Address: http://localhost:${PORT}`);
      console.log(`🏥 Health Check:   http://localhost:${PORT}/api/v1/health`);
      console.log(`==================================================\n`);
    });

    const shutdown = async (signal: string) => {
      console.log(`\n⚠️  Received ${signal}. Shutting down gracefully...`);
      server.close(() => {
        console.log('🛑 HTTP server closed.');
        process.exit(0);
      });
    };

    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
