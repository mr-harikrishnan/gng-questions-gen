
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

function DragAndDrop({ formik }) {
    const [preview, setPreview] = useState(null);

    const onDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];
        formik.setFieldValue("image", file);
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
        <div className="w-full mt-4">

            {/* Show drag-drop only when no image */}
            {!preview && (
                <div
                    {...getRootProps()}
                    className={`flex flex-col items-center justify-center w-full px-4 py-6 border-2 border-dashed rounded-lg cursor-pointer transition ${isDragActive ? 'border-blue-400 bg-blue-50' : 'border-gray-400 bg-[#ebf8f8]'
                        }`}
                >
                    <input {...getInputProps()} />
                    <p className="text-sm text-gray-500">📂 Drag & Drop or Click to Upload</p>
                </div>
            )}

            {/* Show preview when image is uploaded */}
            {preview && (

                <div className="items-start mt-2 flex w-72 ">
                    <img src={preview} alt="Preview" className="w-full  object-cover rounded-md " />

                    <button
                     onClick={handleRemove}
                        type="button"
                        className="   text-white text-xs rounded-full px-2 py-1 ">

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="red" className="size-5 cursor-pointer hover:scale-120">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        

                    </button>
                </div>

            )}

            {/* Error */}
            {formik.touched.image && formik.errors.image && (
                <span className="text-red-500 text-sm">{formik.errors.image}</span>
            )}
        </div>
    );
}

export default DragAndDrop;

