import app from './app';
import { env } from './config/env';
import { startTelegramBot } from './lib/telegram';

const startServer = () => {
  try {
    // Start Telegram bot
    startTelegramBot();

    app.listen(env.port, () => {
      console.log(`🚀 Server running on port ${env.port}`);
      console.log(`📦 Environment: ${env.nodeEnv}`);
      console.log(`🤖 Telegram bot: @${env.telegram.botUsername}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
