export default function PrimaryButton({
  label,
  isLoading,
}: {
  label: string;
  isLoading: boolean;
}) {
  return (
    <button
      disabled={isLoading}
      type="submit"
      className="text-white font-semibold disabled:border-gray-100 disabled:bg-gray-100 inline-block py-3 px-10 text-sm bg-cyan-500 hover:bg-cyan-400 transition-colors duration-500 rounded-lg"
    >
      {label}
    </button>
  );
}
