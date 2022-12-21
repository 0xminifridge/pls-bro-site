export default function PageNotFound() {
  return (
    <>
      <div class="h-[100vh] md:h-[100vh] bg-black">
        <div class="text-white flex justify-center flex-col w-full h-full">
          <div class="m-auto flex flex-col justify-center">
            <h1 class="text-3xl md:text-7xl m-auto p-2 font-bold">
              (404, 404)
            </h1>
            <p class="text-xl m-auto text-gray-600">Page not found</p>
          </div>
        </div>
      </div>
    </>
  );
}
