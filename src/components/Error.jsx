export default function Error({ error }) {
  return (
    <div className="h-screen flex items-center justify-center">
      <h2 className="text-3xl text-center text-red-900 font-bold">
        Error happened... {error?.message}
      </h2>
    </div>
  );
}
