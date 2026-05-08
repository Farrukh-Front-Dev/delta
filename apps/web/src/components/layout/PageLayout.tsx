import { ReactNode } from 'react';
import { Container } from './Container';

interface PageLayoutProps {
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'full';
}

export const PageLayout = ({ children, size = 'lg' }: PageLayoutProps) => {
  return (
    <div className="min-h-screen bg-black">
      <Container size={size} className="py-8">
        {children}
      </Container>
    </div>
  );
};
