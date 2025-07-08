
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

function OptionsDragAndDrop({ formik }) {
    const [preview, setPreview] = useState(null);

    const onDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];
        formik.setFieldValue("image", URL.createObjectURL(file));
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
                    <p className="text-sm text-gray-500">Drag & Drop or Click to Upload</p>
                </div>
            )}

            {/* Show preview when image is uploaded */}
            {preview && (
                <div className="flex items-center gap-4 p-3 mt-3 rounded-lg bg-white shadow-md  border border-gray-200">
                    <img src={preview} alt="Preview" className="w-20 h-20 object-cover rounded-md" />

                    <div className="flex flex-col flex-1 overflow-hidden">
                        <p className="text-xs text-gray-600 max-w-[100px] truncate">{preview}</p>
                    </div>

                    <button
                        onClick={handleRemove}
                        type="button"
                        className="p-1 rounded-full hover:bg-red-100 transition"
                        title="Remove">

                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="red"
                            className="w-5 h-5 hover:scale-125 transition-transform">

                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
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

export default OptionsDragAndDrop;




