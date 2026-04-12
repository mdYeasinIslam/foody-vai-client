import { Toaster } from "react-hot-toast";

interface IProps {
  className?: string;
  children: React.ReactNode;
}
const WrapperComp: React.FC<IProps> = ({ children }) => {
  return (
    <>
      {children}
      <Toaster />
    </>
  );
};

export default WrapperComp;
