import sky from "../../assets/sky.png";
import IFCSLogo from "../../assets/logos/IFCSLogo.png";
import galleyLogo2 from "../../assets/logos/galleyLogo2.png";
import airTransat from "../../assets/logos/airTransat.png";
import Button from "../../components/Button";

const Login: React.FC = () => {
  return (
    <div
      className="relative flex min-h-screen w-full items-center justify-center bg-cover bg-center font-sans"
      style={{ backgroundImage: `url(${sky})` }}
    >
      <div className="flex flex-col justify-between bg-white/40 backdrop-blur-sm rounded-xl p-4 sm:p-6 lg:p-8 w-[calc(100vw-20px)] h-[calc(100vh-20px)]">
        <main className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-20 flex-1">
          <div className="flex flex-col items-center text-white drop-shadow-md space-y-6">
            <div className="text-center">
              <img
                src={IFCSLogo}
                alt="IFCS Logo"
                className="rounded-xl w-40 sm:w-52 lg:w-60"
              />
            </div>
            <div className="text-center">
              <img
                src={airTransat}
                alt="Air Transat Logo"
                className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 object-contain"
              />
            </div>
          </div>

          <div className="w-full max-w-sm rounded-xl bg-white/70 backdrop-blur-sm p-6 sm:p-8 shadow-2xl">
            <form className="space-y-5">
              <div>
                <label
                  htmlFor="login-name"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Login Name
                </label>
                <input
                  type="text"
                  id="login-name"
                  className="w-full h-11 rounded-md border border-gray-300 bg-[var(--backgroundLight)] p-3 focus:border-blue-500 focus:ring focus:ring-blue-200 transition"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="w-full h-11 rounded-md border border-gray-300 bg-[var(--backgroundLight)] p-3 focus:border-blue-500 focus:ring focus:ring-blue-200 transition"
                />
              </div>
              <a
                href="#"
                className="block text-right text-xs text-gray-600 hover:text-blue-600 hover:underline"
              >
                Forgot Password?
              </a>
              <div className="flex items-center justify-between gap-4">
                <Button className="w-1/2">Exit</Button>
                <Button to="/dashboard" className="w-1/2 text-center">
                  Sign In
                </Button>
              </div>
            </form>
          </div>
        </main>

        <footer className="flex justify-center lg:justify-end text-white drop-shadow-md mt-6">
          <img
            src={galleyLogo2}
            alt="Galley Logo"
            className="rounded-xl w-16 sm:w-20 h-auto"
          />
        </footer>
      </div>
    </div>
  );
};

export default Login;
