import { useRouter } from "next/router";
import { useState } from "react";
import Layout from "~/components/Layout";

const SignIn = () => {
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(state),
      });
      const json = await res.json();
      console.log(json);
      if (res.ok) {
        alert("Sign in successful!");
        router.push("/");
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <div>
        <h1>Sign In</h1>
        <div>
          <input
            type="text"
            name="email"
            placeholder="email"
            value={state.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="password"
            value={state.password}
            onChange={handleChange}
          />
          <button type="submit" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default SignIn;
