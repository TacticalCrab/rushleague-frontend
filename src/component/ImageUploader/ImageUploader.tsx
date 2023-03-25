import './ImageUploader.css';
import React, {DragEvent, useEffect, useRef} from 'react';

type ImageUploaderProps = {
    currentImageURL?: string;
    onChangeImage?: (image: string) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({currentImageURL, onChangeImage}) => {
    const inputRef = useRef<HTMLInputElement | undefined>(undefined);

    useEffect(() => {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        inputRef.current = fileInput;

        fileInput.addEventListener('change', (event) => {
            let reader = new FileReader();
            reader.onload = function (event) {
                if (event.target && event.target.result) {
                    if (onChangeImage) {
                        onChangeImage(event.target.result.toString());
                    }
                }
            }
            if (event.target) {
                // @ts-ignore
                reader.readAsDataURL(event.target.files[0]);
            }
        });

    }, [])

    const backgroundImage = 'linear-gradient(0deg, rgb(25, 25, 25) 0%, rgba(25, 25, 25, 0.5) 129.04%), ' +
        (`url(${currentImageURL})` || 'url(../../assets/ex_teamlogo.svg)') ;

    const handleOnDragOver = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    }

    const handleOnDrop = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();

        let reader = new FileReader();
        reader.onload = function (event) {
            if (event.target && event.target.result) {
                if (onChangeImage) {
                    onChangeImage(event.target.result.toString());
                }
            }
        }

        reader.readAsDataURL(event.dataTransfer.files[0]);
    }


    return (
        <div
            onDragOver={handleOnDragOver}
            onDrop={handleOnDrop}
            onClick={() => {
                if (inputRef.current) {
                    inputRef.current.click();
                }
            }}

            style={{backgroundImage, color: 'white'}}
            className={'image-uploader'}>
            <div className={'image-uploader-text-container'}>
                <div className={'image-uploader-upload-text'}>
                    Upload the logo here
                </div>
                <div className={'image-uploader-select-text'}>
                    Or select from the files...
                </div>
            </div>
        </div>
    )

}