import { supabase } from "@lib/supabase";
import React, { useState, type ChangeEvent } from "react";
import { v4 as uuidv4 } from "uuid";
import PrimaryButton from "./PrimaryButton";

interface ImageUploaderProps {
  propertyId: string; // The ID of the property to associate the image with
  onUploadSuccess?: (imageUrl: string) => void; // Callback after successful upload and DB update
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  propertyId,
  onUploadSuccess,
}) => {
  const bucketName = "property-images";
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    setFile(selectedFile);
    setError(null); // Clear previous error
    setMessage(null); // Clear previous message
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select an image file.");
      return;
    }

    if (!propertyId) {
      setError("Property ID is missing.");
      return;
    }

    setUploading(true);
    setError(null);
    setMessage(null);

    const fileExt = file.name.split(".").pop();
    const fileName = `${uuidv4()}.${fileExt}`;
    const filePath = `${propertyId}/${fileName}`;

    try {
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from(bucketName)
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        throw uploadError;
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from(bucketName).getPublicUrl(filePath);

      if (!publicUrl) {
        throw new Error("Could not get public URL after upload.");
      }

      const { error: insertError } = await supabase
        .from("property_image")
        .insert([{ image_url: publicUrl, property_id: propertyId }]);

      if (insertError) {
        throw insertError;
      }

      setMessage("Image uploaded and associated successfully!");
      setFile(null);
      if (onUploadSuccess) {
        onUploadSuccess(publicUrl);
      }
    } catch (err: any) {
      setError(`Upload failed: ${err.message}`);
      console.error("Upload Error:", err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="image-uploader-container">
      <h3>Agregar Image: {propertyId}</h3>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        disabled={uploading}
      />
      {file && <p>Selecionar imagen: {file.name}</p>}
      <PrimaryButton
        type="button"
        disabled={uploading || !file}
        onClick={handleUpload}
        label={uploading ? "Uploading..." : "Upload Image"}
      />
      {error && <p className="error-message">Error: {error}</p>}
      {message && <p className="success-message">Success: {message}</p>}

      {/* Optional: Display a preview of the selected file */}
      {file && !message && !error && (
        <img
          src={URL.createObjectURL(file)}
          alt="Selected file preview"
          style={{ maxWidth: "200px", marginTop: "10px" }}
        />
      )}
    </div>
  );
};

export default ImageUploader;
