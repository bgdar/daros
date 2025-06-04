interface TypeCard {
  // x: number;
  // y: number;
  wallpapers: string[];
}

const CardWalpapper = ({ Poss }: { Poss: TypeCard }) => {
  //cek poss x jika sudah sampai di windows
  // saat posisi x berada di unjung(-30) sebelah kiri
  // if (Poss.x <= window.innerWidth - 30) {
  //   Poss.x = 10;
  // }

  return (
    <div
      // style={{ top: Poss.y, left: Poss.x }}
      className="z-40 absolute  grid justify-around bg-gray-700 rounded-md w-[450px] h-[250px]"
    >
      <div className="grid grid-cols-2 gap-2">
        {Poss.wallpapers.slice(0, 4).map((wallpaper, index) => (
          <div
            key={index}
            className="w-20 h-20 bg-gray-500 rounded-md flex items-center justify-center"
          >
            <img
              src={wallpaper}
              alt={`Wallpaper ${index + 1}`}
              className="w-full h-full object-cover rounded-md"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardWalpapper;
