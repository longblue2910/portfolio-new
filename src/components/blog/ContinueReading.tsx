"use client";

import Link from "next/link";

interface ContinueReadingProps {
  link: string;
}

const ContinueReading = ({ link = "#" }: ContinueReadingProps) => {
  return (
    <div className="mt-2">
      <Link href={link} className="continue-reading">
        Continue Reading
      </Link>
    </div>
  );
};

export default ContinueReading;
