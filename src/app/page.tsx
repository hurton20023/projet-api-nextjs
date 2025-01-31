"use client";

import { signIn, useSession } from "next-auth/react";
import * as React from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Button,
} from "@/components/ui/";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isRegistering, setIsRegistering] = React.useState<boolean>(false);
  const { data: session } = useSession();
  const router = useRouter();

  React.useEffect(() => {
    if (session) {
      router.push("/admin/ads");
    }
  }, [session, router]);

  async function handleSubmitGoogleLogin() {
    setIsLoading(true);
    try {
      await signIn("google");
      router.push("/admin/ads");
    } catch (error) {
      console.error("Failed to sign in:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSubmitGithubLogin() {
    setIsLoading(true);
    try {
      await signIn("github");
      router.push("/admin/ads");
    } catch (error) {
      console.error("Failed to sign in:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSubmitTwitterLogin() {
    setIsLoading(true);
    try {
      await signIn("twitter");
      router.push("/admin/ads");
    } catch (error) {
      console.error("Failed to sign in:", error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleRegisterClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsRegistering(true);
  };

  const handleBackToLogin = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsRegistering(false);
  };

  const handleRegisterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const userData = {
      firstname: formData.get("firstname") as string,
      lastname: formData.get("firstname") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error("Failed to register user");
      }

      const result = await response.json();
      console.log("User registered:", result.data);
      setIsRegistering(false);
    } catch (error) {
      console.error("Error registering user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitCredentialsLogin = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const credentials = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: credentials.email,
        password: credentials.password,
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      console.log("Login successful:", result);
      router.push("/admin/ads");
    } catch (error) {
      console.error("Error during login:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className={cn("flex flex-col gap-6")}>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">
              {isRegistering ? "Inscription" : "Connexion"}
            </CardTitle>
            <CardDescription>
              {isRegistering
                ? "Créez un compte en remplissant les champs ci-dessous"
                : "Entrez votre email ci-dessous pour vous connecter à votre compte"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isRegistering ? (
              <form onSubmit={handleRegisterSubmit}>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="firstname">Prénom</Label>
                    <Input
                      id="firstname"
                      name="firstname"
                      type="text"
                      placeholder="Votre prénom"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="lastname">Nom de famille</Label>
                    <Input
                      id="lastname"
                      name="lastname"
                      type="text"
                      placeholder="Votre nom de famille"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="m@example.com"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password">Mot de passe</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="confirmPassword">
                      Confirmez le mot de passe
                    </Label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Inscription en cours..." : "S'inscrire"}
                  </Button>
                  <div className="mt-4 text-center text-sm">
                    Vous avez déjà un compte ?{" "}
                    <a
                      href="#"
                      className="underline underline-offset-4"
                      onClick={handleBackToLogin}
                    >
                      Connectez-vous
                    </a>
                  </div>
                </div>
              </form>
            ) : (
              <form onSubmit={handleSubmitCredentialsLogin}>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="m@example.com"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">Mot de passe</Label>
                    </div>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Connexion en cours..." : "Se connecter"}
                  </Button>
                  <Button
                    onClick={handleSubmitGoogleLogin}
                    variant="outline"
                    className="w-full"
                  >
                    Connexion avec Google
                  </Button>
                  <Button
                    onClick={handleSubmitGithubLogin}
                    variant="outline"
                    className="w-full"
                  >
                    Connexion avec GitHub
                  </Button>
                  <Button
                    onClick={handleSubmitTwitterLogin}
                    variant="outline"
                    className="w-full"
                  >
                    Connexion avec Twitter
                  </Button>
                  <div className="mt-4 text-center text-sm">
                    Vous n&apos;avez pas de compte ?{" "}
                    <a
                      href="#"
                      className="underline underline-offset-4"
                      onClick={handleRegisterClick}
                    >
                      Inscrivez-vous
                    </a>
                  </div>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
