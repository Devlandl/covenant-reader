import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-cr-royal to-cr-royal-mid flex items-center justify-center p-4">
      <SignIn fallbackRedirectUrl="/dashboard" />
    </div>
  );
}
