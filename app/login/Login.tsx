"use client";
import * as React from "react";
import { HeroBanner } from "./HeroBanner";
import { LoginForm } from "./LoginForm";

function Login() {
  return (
    <main className="flex h-screen w-full overflow-hidden flex-col bg-amber-50 md:overflow-hidden md:px-20 max-md:h-full max-md:overflow-auto">
      <div className="self-center w-full max-w-[1201px] px-4 py-6">
        <div className="flex gap-5 max-md:flex-col">
          <section className="w-6/12 max-md:w-full">
            <HeroBanner />
          </section>
          <section className="w-6/12 max-md:w-full">
            <LoginForm />
          </section>
        </div>
      </div>
    </main>
  );
}

export default Login;