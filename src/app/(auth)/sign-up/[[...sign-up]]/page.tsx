import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-cr-royal to-cr-royal-mid flex items-center justify-center p-4">
      <SignUp fallbackRedirectUrl="/dashboard" />
    </div>
  );
}
