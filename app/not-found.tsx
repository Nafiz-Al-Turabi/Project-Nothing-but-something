"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const NotFound = () => {
  const router = useRouter();
  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="flex flex-col justify-center items-center min-h-[90vh]">
        <Image src="/404.svg" alt="Page Not Found" width={600} height={600} />
        <h1 className="text-4xl font-bold mt-6">Page Not Found</h1>
        <p className="text-gray-600 mt-2 text-center">Sorry, the page you are looking for does not exist.</p>
        <button
          className="border px-12 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-900 mt-4 cursor-pointer"
          onClick={() => router.back()}
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default NotFound;
