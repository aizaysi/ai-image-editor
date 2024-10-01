"use client";

import { useRef } from "react";
import { FiUpload, FiDownload } from "react-icons/fi";

import IconButton from "@/components/icons/IconButton";
import GenerateImage from "./GenerateImage";

interface Props {
  onUpload?: (blob: string) => void;
  onDownload?: () => void;
  onCrop?: () => void;
  mode?: string;
  getImageData: () => Promise<unknown>;
  getMaskData: () => Promise<unknown>;
  onGenerate: (imageSrc: string, prompt: string) => void;
}

export default function Navigation({ onUpload, onDownload, onCrop, mode, getImageData, getMaskData, onGenerate: onGenerateImage }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const onUploadButtonClick = () => {
    inputRef.current?.click();
  };

  const onLoadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;

    if (files && files[0]) {
      if (onUpload) {
        onUpload(URL.createObjectURL(files[0]));
      }
    }

    event.target.value = "";
  };

  return (
    <div className="flex justify-between bg-slate-900 p-5">
      <IconButton title="Upload image" onClick={onUploadButtonClick}>
        <FiUpload />
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={onLoadImage}
          className="hidden"
        />
      </IconButton>
      <div className="flex grow items-center justify-center gap-2 mx-20">
        {mode === "crop" && <button onClick={onCrop}>Crop</button>}
        {mode === "generate" && (
          <GenerateImage
            getImageData={getImageData}
            getMaskData={getMaskData}
            onGenerate={onGenerateImage}
          />
        )}
      </div>
      <IconButton title="Download image" onClick={onDownload}>
        <FiDownload />
      </IconButton>
    </div>
  );
}