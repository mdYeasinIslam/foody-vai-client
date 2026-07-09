import Image from "next/image";
import React, { useState } from "react";
interface IProps {
  value: string;
  onChange: (value: string) => void;
}
const IMGBB_API_KEY = "2652e01633554d3e4796cc1dbbd023e2";

const BaseImageUpload:React.FC<IProps>=({ value, onChange }) =>{
  const [uploading, setUploading] = useState(false);
const [imgUrl, setImgUrl] = useState(value || "");
  const uploadImage = async (file:any) => {
    try {
      setUploading(true);

      const formData = new FormData();

      formData.append("image", file);

      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,

        {
          method: "POST",

          body: formData,
        },
      );

      const data = await res.json();
        if (data.success) {
          setImgUrl(data.data.url);
        onChange(data.data.url);
      }
    } catch (error) {
      console.log("Image upload failed", error);
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e:any) => {
    const file = e.target.files[0];

    if (file) {
      uploadImage(file);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <div className="w-16 h-16 rounded-xl bg-gray-100 overflow-hidden shrink-0 border border-gray-200">
        {value ? (
          <Image
            src={value}
            alt="preview"
            width={64}
            height={64}
            className="w-full h-full object-cover"
          />
        ) : (
          <Image
            src={imgUrl}
            alt="preview"
            width={64}
            height={64}
            className="w-full h-full object-cover"
          />
        )}
      </div>

      <div className="flex-1">
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
          Image URL
        </label>

        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://..."
          className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-orange-500"
        />

        <label className="inline-block mt-3 cursor-pointer px-4 py-2 bg-orange-500 text-white rounded-lg text-sm">
          {uploading ? "Uploading..." : "Upload Image"}

          <input
            type="file"
            accept="image/*"
            hidden
            onChange={handleFileChange}
          />
        </label>
      </div>
    </div>
  );
}
export default BaseImageUpload;