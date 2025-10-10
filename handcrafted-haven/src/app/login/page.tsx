'use client';

import { Header } from "../components/header";
import { Footer } from "../components/footer";
import LoginForm from "../components/login-form";
import React, { Suspense } from "react";

const Login = () => {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full items-end rounded-lg bg-slate-700 p-3 md-h-36">
          <div className="w-32 text-white md:w-36 m-auto">
            <Suspense fallback={<div>Loading...</div>}>
              <Header />
            </Suspense>

            <Suspense fallback={<div>Loading form...</div>}>
              <LoginForm />
            </Suspense>
            
            <Suspense fallback={<div>Loading...</div>}>
              <Footer />
            </Suspense>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;