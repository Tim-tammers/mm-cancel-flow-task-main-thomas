

interface ButtonWrapperProps {
  children: React.ReactNode;
  className?: string;
}

const ButtonWrapper: React.FC<ButtonWrapperProps> = ({ children, className }) => {
  return (
    <div className={`pt-4 px-4 shadow-[0_-5px_10px_rgba(0,0,0,0.1)] sm:shadow-none -mx-4 mt-4 sm:m-0 sm:px-0 sm:pt-0 ${className}`}>
      {children}
    </div>
  );
};

export default ButtonWrapper;