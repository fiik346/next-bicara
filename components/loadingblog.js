export default function LoadingBlog() {
  return (
    <div className="animate-pulse my-4">
      <div className="flex">
        <div className="h-10 mr-2 w-8/12 bg-gray-200"/>
        <div className="h-10 w-3/12 bg-gray-200"/>
      </div>
      <div className="flex flex-wrap my-4">
        <div className="h-6 w-24 mr-2 mb-2 bg-gray-200"/>
        <div className="h-6 w-32 mb-2 mr-2 bg-gray-200"/>
        <div className="h-6 w-16 mb-2 mr-2 bg-gray-200"/>
        <div className="h-6 w-32 mb-2 mr-2 bg-gray-200"/>
        <div className="h-6 w-40 mb-2 mr-2 bg-gray-200"/>

      </div>
      {<div className="flex">
        <div className="w-10 h-10 rounded-full bg-gray-200 mr-4"/>
        <div>
          <div className="h-4 w-32 bg-gray-200 mb-2"/>
          <div className="h-4 w-20 mr-2 bg-gray-200"/>
        </div>
      </div>}
      <div className="-mx-4 my-4">
        <div className="pb-[50%] my-4 bg-gray-200"/>
      </div>
      <div className="bg-gray-200 h-full"/>
    </div>
  )
}
