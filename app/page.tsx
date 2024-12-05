import { LoginForm } from '@/components/auth/login-form';
import { Card } from '@/components/ui/card';

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <Card className="w-full max-w-md p-6 space-y-6 shadow-xl">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Welcome to HealthCare
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Sign in to access your dashboard
          </p>
        </div>
        <LoginForm />
      </Card>
    </main>
  );
}