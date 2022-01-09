const Loading = () => {
  return (
    <div className="w-full h-screen overflow-hidden flex items-center justify-center bg-gray-200">
      <div>
        <div className="bg-white p-5 rounded-full flex space-x-3 loader">
          <div className="w-4 h-4 bg-red-400 rounded-full animate-bounce"></div>
          <div className="w-4 h-4 bg-yellow-400 rounded-full animate-bounce"></div>
          <div className="w-4 h-4 bg-green-400 rounded-full animate-bounce"></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
