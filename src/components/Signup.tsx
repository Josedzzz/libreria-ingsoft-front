export default function Signup() {
  return (
    <div className="flex-1 bg-custom-blue flex justify-center items-center p-4">
      <div className="w-full max-w-lg bg-custom-white p-8 rounded-xl border-t-2 border-l-2 border-b-4 border-r-4 border-current animate-fadeIn">
        <h1 className="text-2xl font-bold text-custom-dark mb-6">Signup</h1>
        <form className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-lg font-semibold text-custom-dark"
            >
              <i className="fa-solid fa-envelope mr-2"></i> Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="mt-1 block w-full px-3 py-2 border-t-2 border-l-2 border-b-4 border-r-4 border-custom-dark rounded-xl focus:outline-none focus:ring-2 focus:ring-custom-blue focus:border-custom-blue transition-all duration-300"
            />
          </div>
          <div>
            <label
              htmlFor="username"
              className="block text-lg font-semibold text-custom-dark"
            >
              <i className="fa-solid fa-user mr-2"></i> Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              className="mt-1 block w-full px-3 py-2 border-t-2 border-l-2 border-b-4 border-r-4 border-custom-dark rounded-xl focus:outline-none focus:ring-2 focus:ring-custom-blue focus:border-custom-blue transition-all duration-300"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-lg font-semibold text-custom-dark"
            >
              <i className="fa-solid fa-lock mr-2"></i> Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="mt-1 block w-full px-3 py-2 border-t-2 border-l-2 border-b-4 border-r-4 border-custom-dark rounded-xl focus:outline-none focus:ring-2 focus:ring-custom-blue focus:border-custom-blue transition-all duration-300"
            />
          </div>
          <button
            type="submit"
            className="w-full text-lg font-semibold text-custom-dark p-2 bg-custom-blue border-t-2 border-l-2 border-b-4 border-r-4 border-current hover:bg-custom-blue-dark rounded-xl focus:outline-none hover:border-b-2 hover:border-r-2"
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  );
}
