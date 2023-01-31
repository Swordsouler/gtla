import React from "react";

export const PicturesTitle = "Ajoutez des photos";

export function PicturesForm() {
    const [photos, setPhotos] = React.useState<string[]>([]);
    return (
        <div className="add__form__content" key="pictures">
            <div className="input__container">
                <label htmlFor="add__photos" className="input__photo__container">{photos.length > 0 ? photos.map((e, index) => <img src={e} alt={"Restaurant" + index}/>) : <span>Ajouter des photos</span>}</label>
                <input id="add__photos" type="file" multiple onChange={(e) => {
                    e.preventDefault();
                    const files = e.target.files;
                    if (files) {
                        for (let i = 0; i < files.length; i++) {
                            const file = files[i];
                            const reader = new FileReader();
                            reader.onload = (e) => {
                                if (e.target) {
                                    const result = e.target.result;
                                    if (result) {
                                        setPhotos([...photos, result as string]);
                                    }
                                }
                            }
                            reader.readAsDataURL(file);
                        }
                    }
                }}/>
            </div>
        </div>
    );
}

export function PicturesOnSubmit(e: React.FormEvent<HTMLFormElement>) {
    
}