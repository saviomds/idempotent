import React from "react";

interface Link_AProps {
  text?: string;
  href?: string;
  text_2?: string;
}

function Link_A({ text, href, text_2 }: Link_AProps) {
  return (
    <p className="text-center mt-5 text-gray-700">
      {text}{" "}
      {text_2 && (
        <a href={href} className="text-blue-600 hover:underline">
          {text_2}
        </a>
      )}
    </p>
  );
}

export default Link_A;
