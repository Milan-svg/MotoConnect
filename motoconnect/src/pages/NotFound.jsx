import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
      <h1 className="text-5xl font-bold mb-4 text-red-600">404</h1>
      <p className="text-xl mb-6">Page not found :/</p>
      <Link className="btn btn-primary" to="/">
        Go Back Home
      </Link>
    </div>
  );
}
