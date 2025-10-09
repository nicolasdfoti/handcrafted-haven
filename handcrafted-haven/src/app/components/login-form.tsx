"use client";

import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { Button } from "@/app/components/button";
import { signIn, getSession } from "next-auth/react";
import { useState, useEffect } from "react";
import styles from "@/app/ui/styles/loginForm.module.css";
import { useSearchParams } from "next/navigation";

type LoginFormProps = {
  callbackUrl?: string;
};

export default function LoginForm({ callbackUrl = "/" }: LoginFormProps) {
  const [error, setError] = useState<string>("");
  const [isPending, setIsPending] = useState(false);
  const searchParams = useSearchParams();

  // Get callback URL from URL parameters if available
  const urlCallbackUrl = searchParams.get("callbackUrl");
  const effectiveCallbackUrl = urlCallbackUrl || callbackUrl;

  // Set default values in development mode
  const isDevelopment = process.env.NODE_ENV === "development";
  const defaultEmail = isDevelopment ? "test@example.com" : "";
  const defaultPassword = isDevelopment ? "password123" : "";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    console.log("[LOGIN] Attempt", { email });

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: effectiveCallbackUrl,
      });

      console.log("[LOGIN] Result from signIn:", result);

      if (!result) {
        setError("No response from server.");
        return;
      }

      if (result.error) {
        const msg =
          result.error === "CredentialsSignin"
            ? "Invalid email or password."
            : "Authentication failed. Please try again.";
        console.warn("[LOGIN] Error from signIn:", result.error);
        setError(msg);
        return;
      }

      const session = await getSession();
      console.log("[LOGIN] Session:", session);

      // If we have a specific callback URL (like from middleware redirect), use it
      if (urlCallbackUrl) {
        window.location.href = urlCallbackUrl;
        return;
      }

      // Otherwise, redirect based on user type
      if (session?.user?.id) {
        if (session.user.accountType === "Seller") {
          window.location.href = `/sellers/${session.user.id}`;
        } else {
          window.location.href = `/profile/${session.user.id}`;
        }
      } else {
        window.location.href = effectiveCallbackUrl;
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("[LOGIN] Unexpected error:", err.message);
        setError("An unexpected error occurred.");
      } else {
        console.error("[LOGIN] Unknown error:", err);
        setError("An unknown error occurred.");
      }
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formContainer}>
        <h1>Please log in to continue</h1>

        <div className={styles.inputWrapper}>
          <label htmlFor="email">Email</label>
          <div className={styles.inputIcon}>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email address"
              defaultValue={defaultEmail}
              required
            />
            <AtSymbolIcon className={styles.icon} />
          </div>
        </div>

        <div className={styles.inputWrapper}>
          <label htmlFor="password">Password</label>
          <div className={styles.inputIcon}>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Enter your password"
              defaultValue={defaultPassword}
              required
              minLength={6}
            />
            <KeyIcon className={styles.icon} />
          </div>
        </div>

        <Button
          type="submit"
          className={styles.submitButton}
          disabled={isPending}
        >
          <span>{isPending ? "Logging in..." : "Log in"}</span>
          <ArrowRightIcon className={styles.iconRight} aria-hidden="true" />
        </Button>

        <div className={styles.errorBox} aria-live="polite" aria-atomic="true">
          {error && (
            <>
              <ExclamationCircleIcon className={styles.errorIcon} />
              <p>{error}</p>
            </>
          )}
        </div>
      </div>
    </form>
  );
}
