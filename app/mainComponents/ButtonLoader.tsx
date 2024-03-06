import PulseLoader from "react-spinners/PulseLoader";

type ButtonLoaderProps = {
  loading: boolean;
};
export default function ButtonLoader({ loading }: ButtonLoaderProps) {
  return (
    <PulseLoader size={6} loading={loading} className="pr-2" color="white" />
  );
}
