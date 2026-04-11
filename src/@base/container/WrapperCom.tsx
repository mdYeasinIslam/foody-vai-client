import { Toaster } from "react-hot-toast";

interface IProps {
  className?: string;
  children: React.ReactNode;
}
const WrapperCom: React.FC<IProps> = ({ children }) => {
  return (
    <>
      {children}
      <Toaster />
    </>
  );
};

export default WrapperCom;
