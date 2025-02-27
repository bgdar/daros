const MenuApp = () => {
  return (
    <div>
      <h2 className="text-lg border-l-zinc-700 size-10 font-semibold mb-4">
        Aplikasi
      </h2>
      <div className="grid grid-cols-5 gap-4 p-4 bg-black/20 rounded-lg">
        {/* Tambahkan aplikasi di sini */}
        <div className="flex flex-col items-center p-3 hover:bg-white/20 rounded-lg cursor-pointer">
          <div className="w-16 h-16 bg-gray-300 rounded-lg"></div>
          <p className="mt-2 text-sm text-white">Aplikasi 1</p>
        </div>
        <div className="flex flex-col items-center p-3 hover:bg-white/20 rounded-lg cursor-pointer">
          <div className="w-16 h-16 bg-gray-300 rounded-lg"></div>
          <p className="mt-2 text-sm text-white">Aplikasi 2</p>
        </div>
        <div className="flex flex-col items-center p-3 hover:bg-white/20 rounded-lg cursor-pointer">
          <div className="w-16 h-16 bg-gray-300 rounded-lg"></div>
          <p className="mt-2 text-sm text-white">Aplikasi 3</p>
        </div>
      </div>
    </div>
  );
};
export default MenuApp;
