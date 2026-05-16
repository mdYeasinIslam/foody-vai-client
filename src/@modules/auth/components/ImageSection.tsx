import cn from "@/src/@libs/utils/_cn";
import Image from "next/image";
import { ClassNameValue } from "tailwind-merge";
interface IProps {
  className?: ClassNameValue;
}
const ImageSection: React.FC<IProps> = ({ className }) => {
  return (
    <div
      className={cn(
        className,
        " flex-1 h-full flex  mt-0 bg-[#F3EEE7] w-full justify-center items-center  ",
      )}
    >
      <div>
        <div className="flex  flex-col justify-center items-center gap-5">
          <figure className="flex items-center justify-center">
            <Image
              src={"/images/auth/logo.png"}
              alt="Login Illustration"
              width={500}
              height={500}
              className="w-24 h-24 object-cover rounded-lg shadow-md"
            />
          </figure>
          <h1 className="text-4xl pb-5 lg:text-7xl font-laila font-semibold">
            FoodyVai
          </h1>
        </div>
      </div>
    </div>
  );
};
export default ImageSection;
