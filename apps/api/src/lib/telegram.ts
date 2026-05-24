import TelegramBot from 'node-telegram-bot-api';
import { env } from '../config/env';
import { prisma } from './prisma';
import crypto from 'crypto';

// Initialize Telegram Bot
const bot = new TelegramBot(env.telegram.botToken, { polling: true });

/**
 * Generate verification token
 */
export const generateVerificationToken = (): string => {
  return crypto.randomBytes(32).toString('hex');
};

/**
 * Start Telegram bot and handle commands
 */
export const startTelegramBot = () => {
  console.log('🤖 Telegram bot started');

  // Handle /start command with verification token
  bot.onText(/\/start (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const token = match?.[1];

    if (!token) {
      bot.sendMessage(chatId, '❌ Invalid verification link. Please try again.');
      return;
    }

    try {
      // Find user by verification token
      const user = await prisma.user.findFirst({
        where: {
          verificationToken: token,
          verificationExpiry: {
            gte: new Date(), // Token not expired
          },
        },
      });

      if (!user) {
        bot.sendMessage(
          chatId,
          '❌ Verification link expired or invalid. Please request a new one.'
        );
        return;
      }

      // Update user with Telegram info
      await prisma.user.update({
        where: { id: user.id },
        data: {
          telegramId: chatId.toString(),
          telegramUsername: msg.from?.username,
          telegramVerified: true,
          verificationToken: null,
          verificationExpiry: null,
        },
      });

      bot.sendMessage(
        chatId,
        `✅ Account verified successfully!\n\n` +
          `Welcome to Dopamine, ${user.name || user.email}!\n\n` +
          `You can now close this chat and return to the website.`
      );

      console.log(`✅ User verified: ${user.email}`);
    } catch (error) {
      console.error('Telegram verification error:', error);
      bot.sendMessage(
        chatId,
        '❌ Verification failed. Please try again or contact support.'
      );
    }
  });

  // Handle /start without token
  bot.onText(/\/start$/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(
      chatId,
      '👋 Welcome to Dopamine!\n\n' +
        'To verify your account, please use the verification link from the website.'
    );
  });

  // Handle /help command
  bot.onText(/\/help/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(
      chatId,
      '📖 Help\n\n' +
        '/start <token> - Verify your account\n' +
        '/help - Show this help message'
    );
  });
};

/**
 * Send notification to user
 */
export const sendTelegramNotification = async (
  telegramId: string,
  message: string
) => {
  try {
    await bot.sendMessage(telegramId, message);
  } catch (error) {
    console.error('Failed to send Telegram notification:', error);
  }
};

/**
 * Get verification link for user
 */
export const getVerificationLink = (token: string): string => {
  return `https://t.me/${env.telegram.botUsername}?start=${token}`;
};
