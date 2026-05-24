'use client';

import { motion } from 'framer-motion';
import { Send, CheckCircle, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { fadeInUp } from '@/lib/animations/variants';

interface TelegramVerificationProps {
  verificationLink: string;
  isVerified?: boolean;
}

export const TelegramVerification = ({
  verificationLink,
  isVerified = false,
}: TelegramVerificationProps) => {
  if (isVerified) {
    return (
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="rounded-lg border border-green-500/20 bg-green-500/10 p-6"
      >
        <div className="flex items-center gap-3">
          <CheckCircle className="h-6 w-6 text-green-400" />
          <div>
            <h3 className="font-medium text-green-400">Telegram Verified</h3>
            <p className="text-sm text-green-400/70">
              Your account is verified via Telegram
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      className="rounded-lg border border-purple-500/20 bg-purple-500/10 p-6"
    >
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <Send className="h-6 w-6 text-purple-400" />
          <div className="flex-1">
            <h3 className="font-medium text-purple-400">Verify with Telegram</h3>
            <p className="mt-1 text-sm text-zinc-400">
              Click the button below to verify your account via Telegram bot
            </p>
          </div>
        </div>

        <Button
          variant="primary"
          size="lg"
          className="w-full gap-2"
          onClick={() => window.open(verificationLink, '_blank')}
        >
          <Send className="h-5 w-5" />
          Open Telegram Bot
          <ExternalLink className="h-4 w-4" />
        </Button>

        <p className="text-center text-xs text-zinc-500">
          After verification, refresh this page
        </p>
      </div>
    </motion.div>
  );
};
