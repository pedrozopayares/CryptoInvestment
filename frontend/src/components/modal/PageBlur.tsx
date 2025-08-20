import React from "react";

interface props {
    children: React.ReactNode;
}
const PageBlur: React.FC<props> = ({ children }) => {
    return (
        <div className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-[10000]'>
            <div>
                <div className="flex items-center justify-center">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-5xl">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PageBlur;