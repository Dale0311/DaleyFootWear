import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import logo from "../../assets/imgs/logo.png";
import React, { useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { AiFillGoogleCircle } from "react-icons/ai";
import { auth } from "@/firebase";
import { useUserStore } from "../../store/userStore";
import { Separator } from "@/components/ui/separator";
function Login() {
  //   hooks
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ShowPass, setShowPass] = useState(false);
  // var
  const user = useUserStore((state) => state.user);
  //   fns
  useEffect(() => {
    if (user) {
      redir(redirectTo || "/");
    }
  }, [user]);
  // url que
  const [param, setParam] = useSearchParams();
  const redir = useNavigate();
  const [error, setError] = useState("");
  const redirectTo = param.get("redirectTo");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setError("");
    } catch (error) {
      if (error.code === "auth/invalid-login-credentials") {
        setError("Invalid credentials");
      }
    }
  };
  const handleGoogleAuth = async (e) => {
    e.preventDefault();
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      setError("");
    } catch (error) {
      setError(`Error: ${error.code}`);
    }
  };

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 flex flex-col items-center space-y-4">
      <div className="mx-auto max-w-lg text-center">
        <div className="flex justify-center">
          <img src={logo} alt="My Logo" className="w-4/6" />
        </div>

        <p className="mt-4 text-gray-500">Sign in to access your account</p>
      </div>

      <form
        className="mx-auto mb-0 mt-8 p-4 sm:p-0 w-full sm:w-1/2 lg:w-1/4 relative space-y-4"
        onSubmit={(e) => handleSubmit(e)}
      >
        {redirectTo && <p className="text-sm text-red-500">Sign in first</p>}
        <div>
          <label htmlFor="email" className="sr-only">
            Email
          </label>

          <div className="relative">
            <Input
              type="email"
              className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />

            <span
              className={
                "absolute inset-y-0 end-0 grid place-content-center px-4"
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
              </svg>
            </span>
          </div>
        </div>

        <div>
          <label htmlFor="password" className="sr-only">
            Password
          </label>

          <div className="relative">
            <Input
              type={ShowPass ? "text" : "password"}
              className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm "
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />

            <span
              className="absolute inset-y-0 end-0 grid place-content-center px-4 cursor-pointer"
              variant="outline"
              onClick={() => setShowPass((prev) => !prev)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </span>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
        <div className="flex items-center justify-between ">
          <p className="text-sm text-gray-500">
            No account?
            <Link className="underline" to="/signup">
              Sign up
            </Link>
          </p>

          <Button type="submit" disabled={!email || !password}>
            Sign in
          </Button>
        </div>
        {/* google auth */}
      </form>
      <div className="space-y-2 w-full sm:w-1/2 lg:w-1/4 p-4 sm:p-0 relative">
        <div className="flex items-center justify-center">
          <Separator className="w-20" />
          <p>Or</p>
          <Separator className="w-20" />
        </div>
        <Button className="w-full space-x-2" onClick={handleGoogleAuth}>
          <span>Continue with Google</span>{" "}
          <AiFillGoogleCircle className="text-lg" />
        </Button>
      </div>
    </div>
  );
}

export default Login;
