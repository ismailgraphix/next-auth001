import { Poppins } from 'next/font/google'
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { LoginButton } from '@/components/auth/login-button';


const font = Poppins({
  subsets: ["latin"],
  weight: ["600"]
})
export default function Home() {
  return (
    <main className="flex h-full bg-sky-400 items-center justify-center">
      <div className="space-y-6">
        <h1 className={cn("text-6xl font-semibold text-white drop-shadow-md",
          font.className
        )}>🔒 Auth</h1>
        <p className="text-white text-lg">A Simple Authentication Service</p>
        <div>
          <LoginButton> 
          <Button size={"lg"} variant={"secondary"}>
            Sign in
          </Button>
          </LoginButton>
        </div>
      </div>
    </main>
  );
}
