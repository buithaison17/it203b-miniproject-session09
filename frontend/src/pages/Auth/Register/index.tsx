import { useState } from "react";
import logo from "../../../assets/icons/logo.png";
import brand from "../../../assets/images/character.png";

const RegisterScreen = () => {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");
const [message, setMessage] = useState("");

const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    if (!email || !password || !confirmPassword) {
        setMessage("Vui lòng điền đầy đủ thông tin");
        return;
    }

    if (password !== confirmPassword) {
        setMessage("Mật khẩu xác nhận không khớp");
        return;
    }

    if (password.length < 6) {
        setMessage("Mật khẩu phải có ít nhất 6 ký tự");
        return;
    }

    console.log("Đăng ký với:", { email, password });
;
};

return (
    <div className="flex h-screen w-full">

    <div className="w-full lg:w-1/2 flex flex-col justify-between">
        {/* Header */}
        <div className="h-24 px-8 py-8">
          <img src={logo} alt="VivuToday Logo" className="h-full w-fit object-cover" />
        </div>


        <main className="flex flex-col items-center justify-center flex-1">
        <div className="w-full max-w-lg">
            <h4 className="text-4xl font-semibold text-gray-900 leading-10 text-center mb-6">
            Đăng ký
            </h4>

            <form
            className="flex flex-col gap-6 w-full"
            onSubmit={handleSubmit}
            autoComplete="off"
            >
            {/* Email */}
            <div>
                <label htmlFor="email" className="block text-lg font-medium text-gray-700 mb-2">
                Email
                </label>
                <input
                id="email"
                type="email"
                placeholder="Nhập email của bạn"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-lg px-6 py-5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                required
                />
            </div>

            {/* Mật khẩu */}
            <div>
                <label htmlFor="password" className="block text-lg font-medium text-gray-700 mb-2">
                Mật khẩu
                </label>
                <input
                id="password"
                type="password"
                placeholder="Nhập mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full text-lg px-6 py-5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                required
                />
            </div>

            {/* Xác nhận mật khẩu */}
            <div>
                <label htmlFor="confirmPassword" className="block text-lg font-medium text-gray-700 mb-2">
                Xác nhận mật khẩu
                </label>
                <input
                id="confirmPassword"
                type="password"
                placeholder="Nhập lại mật khẩu"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full text-lg px-6 py-5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                required
                />
            </div>

            {/* Nút Đăng ký */}
            <button
                type="submit"
                className="w-full py-4 px-6 bg-orange-700 hover:bg-orange-800 text-white font-semibold text-lg rounded-lg shadow-md transition duration-200"
            >
                Đăng ký
            </button>

            {/* Thông báo lỗi */}
            {message && (
                <p className="text-red-600 text-center mt-2 text-base">{message}</p>
            )}
            </form>

            {/* Đã có tài khoản */}
            <p className="text-center text-gray-500 text-base mt-4">
            Đã có tài khoản?{" "}
            <a href="/login" className="text-orange-800 font-medium hover:opacity-70">
                Đăng nhập ngay
            </a>
            </p>
        </div>
        </main>

        {/* Footer */}
        <div className="h-24 px-8 py-8 text-gray-500 text-sm">
        &copy; VivuToday 2025
        </div>
    </div>


    <section className="hidden lg:block w-1/2 h-full p-6">
        <img
        src={brand}
        alt="Brand"
        className="w-150 h-full object-cover"
        />
    </section>
    </div>
);
};

export default RegisterScreen;