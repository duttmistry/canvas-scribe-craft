
import React, { useState, useRef, useCallback } from 'react';
import ReactCrop, { Crop, PixelCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { Button } from '@/components/ui/button';
import { Upload, X, Crop as CropIcon } from 'lucide-react';

interface ImageUploaderProps {
  onImageInsert: (imageUrl: string) => void;
  onClose: () => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageInsert, onClose }) => {
  const [imageSrc, setImageSrc] = useState<string>('');
  const [crop, setCrop] = useState<Crop>({
    unit: '%',
    width: 50,
    height: 50,
    x: 25,
    y: 25,
  });
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [showCropper, setShowCropper] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onSelectFile = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setImageSrc(reader.result?.toString() || '');
        setShowCropper(true);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  }, []);

  const onImageLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget;
    setCrop({
      unit: '%',
      width: 50,
      height: 50,
      x: 25,
      y: 25,
    });
  }, []);

  const getCroppedImg = useCallback(
    (image: HTMLImageElement, crop: PixelCrop): Promise<string> => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        throw new Error('No 2d context');
      }

      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;

      canvas.width = crop.width;
      canvas.height = crop.height;

      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height
      );

      // Convert to base64 instead of blob URL
      return Promise.resolve(canvas.toDataURL('image/jpeg', 0.9));
    },
    []
  );

  const handleCropComplete = useCallback(async () => {
    if (completedCrop && imgRef.current) {
      try {
        const croppedImageUrl = await getCroppedImg(imgRef.current, completedCrop);
        console.log('Cropped image data URL:', croppedImageUrl.substring(0, 50) + '...');
        onImageInsert(croppedImageUrl);
      } catch (error) {
        console.error('Error cropping image:', error);
      }
    }
  }, [completedCrop, getCroppedImg, onImageInsert]);

  const handleUseOriginal = () => {
    console.log('Using original image:', imageSrc.substring(0, 50) + '...');
    onImageInsert(imageSrc);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold">Upload & Crop Image</h3>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X size={16} />
          </Button>
        </div>

        <div className="p-6">
          {!imageSrc ? (
            <div className="text-center">
              <input
                type="file"
                accept="image/*"
                onChange={onSelectFile}
                ref={fileInputRef}
                className="hidden"
              />
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 cursor-pointer hover:border-gray-400 transition-colors"
              >
                <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-600 mb-2">Click to upload an image</p>
                <p className="text-sm text-gray-500">Supports: JPG, PNG, GIF</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {showCropper ? (
                <div className="space-y-4">
                  <div className="flex justify-center">
                    <ReactCrop
                      crop={crop}
                      onChange={(c) => setCrop(c)}
                      onComplete={(c) => setCompletedCrop(c)}
                      aspect={undefined}
                      minWidth={50}
                      minHeight={50}
                    >
                      <img
                        ref={imgRef}
                        alt="Crop preview"
                        src={imageSrc}
                        onLoad={onImageLoad}
                        className="max-w-full max-h-96 object-contain"
                      />
                    </ReactCrop>
                  </div>
                  <div className="flex justify-center gap-3">
                    <Button onClick={handleUseOriginal} variant="outline">
                      Use Original
                    </Button>
                    <Button onClick={handleCropComplete} className="flex items-center gap-2">
                      <CropIcon size={16} />
                      Apply Crop
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <img src={imageSrc} alt="Preview" className="max-w-full max-h-96 object-contain mx-auto" />
                  <div className="mt-4 flex justify-center gap-3">
                    <Button onClick={() => setShowCropper(true)} variant="outline">
                      Crop Image
                    </Button>
                    <Button onClick={handleUseOriginal}>
                      Use As Is
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
