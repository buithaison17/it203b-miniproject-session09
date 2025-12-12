import { useState } from "react";
import logo from '../../../assets/icons/logo.png'
import brand from '../../../assets/images/character.png'

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setMessage("Vui lòng nhập đầy đủ email và mật khẩu");
      return;
    }
  };

  return (
    <div className="flex h-screen w-full">

      <div className="w-full lg:w-1/2 flex flex-col justify-between">
        <div className="h-24 px-8 py-8">
          <img src={logo} alt="VivuToday Logo" className="h-full w-fit object-cover" />
        </div>

        <main className="flex flex-col items-center justify-center flex-1">
  <div className="w-full max-w-lg">
    <h4 className="text-4xl font-semibold text-gray-900 leading-10 text-center mb-6">
      Đăng nhập
    </h4>

    <form
      className="flex flex-col gap-6"
      onSubmit={handleSubmit}
      autoComplete="off"
    >
      {/* Email */}
      <div>
        <label htmlFor="email" className="text-lg text-gray-700">
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="Nhập email của bạn"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-6 py-4 text-lg border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent"
        />
      </div>

      {/* Password */}
      <div>
        <label htmlFor="password" className="block text-lg font-medium text-gray-700 mb-2">
          Password
        </label>
        <input
          id="password"
          type="password"
          placeholder="Nhập mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-6 py-4 text-lg border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent"
        />
      </div>

      {/* Options */}
      <div className="flex justify-between items-center py-2">
        <label className="flex items-center text-base text-gray-600 cursor-pointer">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="w-5 h-5 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
          />
          <span className="ml-2">Nhớ thông tin đăng nhập</span>
        </label>
        <a href="/forget-password" className="text-base text-orange-800 hover:opacity-70">
          Quên mật khẩu
        </a>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-4 px-6 bg-orange-700 hover:bg-orange-800 text-white font-semibold text-lg rounded-lg shadow-md transition duration-200"
      >
        Đăng nhập
      </button>

      {message && <p className="text-red-600 text-center mt-2 text-base">{message}</p>}
    </form>

    <p className="text-center text-gray-500 text-base mt-4">
      Chưa có tài khoản?{" "}
      <a href="/register" className="text-orange-800 font-medium hover:opacity-70">
        Đăng ký ngay
      </a>
    </p>
  </div>
</main>


        <div className="h-24 px-8 py-8 text-gray-500 text-sm">
          &copy; VivuToday 2025
        </div>
      </div>
      <section className="hidden lg:block w-1/2 h-full p-6 object-left">
        <img src={brand} alt="Brand" className="w-150 h-full object-cover object-left" />
      </section>
    </div>
  );
};

export default LoginScreen;
