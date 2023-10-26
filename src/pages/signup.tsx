import { useState } from "react";
import { useRouter } from "next/router";
import Layout from "~/components/Layout";

const SignUp = () => {
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
      const res = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(state),
      });
      const json = await res.json();
      console.log(json);
      if (res.ok) {
        alert("Sign up successful!");
        router.push("/login");
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <div>
        <h1>Sign Up</h1>
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

export default SignUp;
