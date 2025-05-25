import React from "react";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white text-center py-4">
      <p className="text-sm">
        © {new Date().getFullYear()} MotoConnect. All rights reserved.
      </p>
    </footer>
  );
}
