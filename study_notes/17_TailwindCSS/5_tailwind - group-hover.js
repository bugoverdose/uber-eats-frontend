/*
  group 클래스가 적용된 요소 위에 마우스가 올려지면,
  group-hover:css 클래스가 적용된 요소의 css 속성이 적용됨.  
*/

<div className="flex justify-around max-w-screen-sm mx-auto">
  {data?.findAllCategories.categories?.map((category) => (
    <div className="flex flex-col items-center cursor-pointer w-24 group">
      <div
        style={{
          backgroundImage: `url(${category.coverImg})`,
          backgroundSize: "cover",
        }}
        className="w-20 h-20 rounded-full group-hover:shadow-2xl"
      ></div>
      <span className="text-base font-semibold text-center">
        {category.name}
      </span>
    </div>
  ))}
</div>;
