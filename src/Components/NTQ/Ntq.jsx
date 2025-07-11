import React, { useEffect } from 'react'

function Ntq({ formik }) {

    const ntqValues = {
        min: "",
        max: ""
    }

    useEffect(() => {
        formik.setFieldValue("options", [ntqValues]);
    }, []);

    return (
        <div>
            <h1 className='text-sm text-gray-500 my-2'>NTQ type options</h1>

            <div className='grid md:grid-cols-2 gap-6'>

                <div>
                    <h1 className='text-sm text-gray-500 my-2'>Min</h1>
                    <input
                        name="options[0].min"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.options?.[0]?.min || ""}
                        type="number"
                        placeholder='Write min value'
                        className="appearance-none border w-full text-sm text-gray-500 px-4 my-2 py-3 bg-[#ebf8f8] border-gray-400 rounded-lg cursor-pointer hover:bg-[#d3f0f3] transition"
                    />
                    {formik.touched.options?.[0]?.min && formik.errors.options?.[0]?.min && (
                        <span className="text-red-500 text-sm">{formik.errors.options[0].min}</span>
                    )}
                </div>

                <div>
                    <h1 className='text-sm text-gray-500 my-2'>Max</h1>
                    <input
                        name="options[0].max"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.options?.[0]?.max || ""}
                        type="number"
                        placeholder='Write max value'
                        className="appearance-none border w-full text-sm text-gray-500 px-4 my-2 py-3 bg-[#ebf8f8] border-gray-400 rounded-lg cursor-pointer hover:bg-[#d3f0f3] transition"
                    />
                    {formik.touched.options?.[0]?.max && formik.errors.options?.[0]?.max && (
                        <span className="text-red-500 text-sm">{formik.errors.options[0].max}</span>
                    )}
                </div>

            </div>
        </div>
    );
}

export default Ntq;
