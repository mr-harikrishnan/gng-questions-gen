
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

function OptionsDragAndDrop({ formik, index }) {
    const [preview, setPreview] = useState(null);

    const onDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];
        formik.setFieldValue(`options[${index}].optionImageUrl`, URL.createObjectURL(file));
        setPreview(URL.createObjectURL(file));

    }, [formik]);



    const handleRemove = () => {
        formik.setFieldValue("image", null);
        setPreview(null);
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/*': [] },
        multiple: false
    });

    return (
        <div className=" w-full ">
            {/* Show drag-drop only when no image */}
            {!preview && (
                <div

                    {...getRootProps()}
                    className={`flex flex-col  items-center justify-center w-full px-4 h-12 border-2 border-dashed rounded-lg cursor-pointer transition ${isDragActive
                        ? 'border-blue-400 bg-blue-50'
                        : 'border-gray-400 bg-[#ebf8f8]'
                        }`}
                >
                    <input {...getInputProps()} />
                    <p className="text-[0.6rem] md:text-sm text-gray-500">Drag & Drop or Click to Upload</p>
                </div>
            )}

            {/* Show preview when image is uploaded */}
            {preview && (
                <div className="flex items-center w-70 sm:w-full p-2   rounded-lg bg-white shadow-md   border-gray-200">
                    <img src={preview} alt="Preview" className="w-20 h-20 object-cover rounded-md" />

                    <div className="flex flex-col flex-1 overflow-hidden">
                        <p className="text-xs text-gray-600 max-w-[280px] truncate">{preview}</p>
                    </div>

                    <button

                        type="button"
                        className="p-1 rounded-full hover:bg-red-100 transition"
                        title="Remove">

                        <svg
                            onClick={handleRemove}

                            className={` size-5 cursor-pointer hover:scale-120`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="red">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>

                    </button>
                </div>
            )}


        </div>

    );
}

export default OptionsDragAndDrop;




