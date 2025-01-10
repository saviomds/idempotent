import Button_A from "@/app/Components/Auth_C/Button_A";
import Header_A from "@/app/Components/Auth_C/Header_A";
import Input_A from "@/app/Components/Auth_C/Input_A";
import Link_A from "@/app/Components/Auth_C/Link_A";

function Login() {
  return (
    <>
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pt-56 pb-3 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] mt-60">
        <form
          method="post"
          className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
          <Header_A title={"idempotent"} subtitle={"Login"} />
          <div className="mb-2">
            <Input_A
              label={"Email"}
              placeholder={"Enter your email"}
              type={"email"}
              name={"email"}
              htmlFor={"email"}
              required={true}
            />
          </div>
          <div className="mb-2">
            <Input_A
              label={"Password"}
              placeholder={"Enter your password"}
              type={"password"}
              name={"password"}
              htmlFor={"password"}
              required={true}
            />
          </div>
          <Link_A text_2={"Forget Password?"} href="/Auth/ForgetPwd" /> <br />
          <div className="flex justify-center">
            <Button_A type={"submit"} text={"Login"} />
          </div>
          <Link_A
            text={"Don't have an account?"}
            href="/Auth/Register"
            text_2={"Register"}
          />
        </form>
      </div>
    </>
  );
}

export default Login;
