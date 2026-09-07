import { LoginForm } from "@/components/auth/login-form";
import { signIn } from "@/lib/auth";

export default function Login() {
  return (
    <>
      <div className="justify-center mb-2">
        <LoginForm
          signIn={async (req: { email: string; password: string }) => {
            "use server";
            return await signIn("credentials", req, {
              redirectTo: "/admin/dashboard",
            });
          }}
        />
      </div>
    </>
  );
}
