import React from "react";

export const PicturesTitle = "Ajoutez des photos";
export const pictures: any[] = [];

export function PicturesForm() {
    const [photos, setPhotos] = React.useState<string[]>([]);
    const refPhotos = React.useRef<string[]>([]);
    React.useEffect(() => {
        if(pictures.length === 0) {
            setPhotos([]);
        } else {
            LoadImages();
        }
    }, []);

    function LoadImages() {
        for (let i = 0; i < pictures.length; i++) {
            const file = pictures[i];
            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target) {
                    const result = e.target.result;
                    if (result) {
                        refPhotos.current.push(result as string);
                    }
                }
            }
            reader.readAsDataURL(file);
        }
        setTimeout(() => {
            setPhotos(refPhotos.current);
        }, 500);
    }

    return (
        <div className="add__form__content" key="pictures">
            <div className="input__container">
                <label htmlFor="add__photos" className="input__photo__container">{photos.length > 0 ? photos.map((e, index) => <img src={e} alt={"Restaurant " + index} key={index}/>) : <span>Ajouter des photos</span>}</label>
                <input id="add__photos" type="file" accept="image/*" multiple onChange={(e) => {
                    e.preventDefault();
                    const files = e.target.files;
                    if (files) {
                        for (let i = 0; i < files.length; i++) {
                            const file = files[i];
                            pictures.push(file);
                        }
                        LoadImages();
                    }
                }}/>
            </div>
        </div>
    );
}

export function PicturesOnSubmit(e: React.FormEvent<HTMLFormElement>) {
    
}
