/*
  Tailwind + React
    style={{ backgroundImage: `url(${category.coverImg})` }}
    className="bg-cover bg-center"  // 전체 이미지 + 중앙 정렬
 
  ================================================================
      
  React JSX - style 속성 따로 활용.
    style={{
      backgroundImage: `url('http://~')`,
      backgroundSize: "cover",
    }} 
  
  VanillaCSS
    background-image: url(~)
    background-size: cover
*/

<div className="flex justify-around max-w-screen-sm mx-auto">
  {data?.findAllCategories.categories?.map((category) => (
    <div className="flex flex-col items-center cursor-pointer w-24">
      <div
        style={{ backgroundImage: `url(${category.coverImg})` }}
        className="bg-cover w-20 h-20 rounded-full hover:shadow-2xl"
      ></div>
      <span className="text-base font-semibold text-center">
        {category.name}
      </span>
    </div>
  ))}
</div>;

<div className="grid grid-cols-3 gap-5 mt-5">
  {data?.findAllRestaurants.results?.map((restaurant) => (
    <div>
      <div
        style={{ backgroundImage: `url(${restaurant.coverImg})` }}
        className="bg-cover bg-center py-32"
      ></div>
      <h3>{restaurant.name}</h3>
      <span>{restaurant.category?.name}</span>
    </div>
  ))}
</div>;
