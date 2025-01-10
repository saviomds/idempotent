import React from "react";

interface HeaderProps {
  title: string;
  subtitle?: string;
}

function Header_A({ title, subtitle }: HeaderProps) {
  return (
    <header>
      <div className="text-2xl font-semibold text-blue-600 pb-2">
        {title}
        {subtitle && (
          <p className="text-xl font-normal text-gray-700 pb-6">{subtitle}</p>
        )}
      </div>
    </header>
  );
}

export default Header_A;
