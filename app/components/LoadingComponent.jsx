import Image from "next/image";

export function LoadingComponent({ loading }) {
  return (
    <>
      {loading && (
        <div className="absolute bg-black bg-opacity-50 h-screen w-screen flex flex-col justify-center items-center">
          <Image src="/loading.gif" width={100} height={100} alt="loading" />
        </div>
      )}
    </>
  );
}
