export default function PageNotFound() {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <div className="text-center">
          <p className="text-6xl font-bold text-red-500">404</p>
          <h1 className="mt-4 text-3xl font-bold text-gray-900">Page Not Found</h1>
          <p className="mt-2 mb-8 text-gray-600">Esta pagina no existe</p>
          <a href="/" className="px-4 py-2 bg-amber-500 text-white rounded hover:bg-amber-600">
            Go back home
          </a>
        </div>
      </div>
    );
  }
  