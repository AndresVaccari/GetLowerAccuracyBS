import Image from "next/image";

export function LoadingComponent({ loading }) {
  return (
    <>
      {loading && (
        <div className="absolute bg-black bg-opacity-50 h-screen w-screen flex flex-col justify-center items-center">
          <Image src="/loading2.gif" width={250} height={250} alt="loading" />
        </div>
      )}
    </>
  );
}
