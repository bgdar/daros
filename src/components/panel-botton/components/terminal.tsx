import { deflateSync } from "zlib";

const Terminal = () => {
  return (
    <>
      {/* ini saat element ini di geser nantinya akan mnyesuaikan ukuran lembungkusnya */}
      <div className="w-full h-full bg-gray-800 text-white flex flex-col items-center justify-center">
        <header className="flex justify-between">
          <div></div>
          <h3>Terminal</h3>
        </header>
      </div>
    </>
  );
};

export default Terminal;
