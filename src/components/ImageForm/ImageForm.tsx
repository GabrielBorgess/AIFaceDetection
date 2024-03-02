import { useState } from "react";

const ImageForm = () => {
    const [inputValue, setInputValue] = useState<string>('');

    //Call api with image url
    function handleInput(){
        console.log(inputValue)
        const PAT = '1560b6cd9e6e4b48ad49a739f55f09c6';
        const USER_ID = 'borgesgabriel';
        const APP_ID = 'SmartBrain';
        const MODEL_ID = 'face-detection';
        const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';
        const IMAGE_URL = inputValue;

        const raw = JSON.stringify({
            "user_app_id": {
                "user_id": USER_ID,
                "app_id": APP_ID
            },
            "inputs": [
                {
                    "data": {
                        "image": {
                            "url": IMAGE_URL
                            // "base64": IMAGE_BYTES_STRING
                        }
                    }
                }
            ]
        });

        const requestOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Key ' + PAT
            },
            body: raw
        };
        
        interface BoundingBox {
            top_row: number;
            left_col: number;
            bottom_row: number;
            right_col: number;
        }

        fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)
            .then(response => response.json())
            .then(result => {

                const regions = result.outputs[0].data.regions;

                regions.forEach((region: { region_info: { bounding_box: BoundingBox; }; data: { concepts: { name: string; value: number; }[]; }; }) => {
                    // Accessing and rounding the bounding box values
                    const boundingBox = region.region_info.bounding_box;
                    const topRow = boundingBox.top_row.toFixed(3);
                    const leftCol = boundingBox.left_col.toFixed(3);
                    const bottomRow = boundingBox.bottom_row.toFixed(3);
                    const rightCol = boundingBox.right_col.toFixed(3);

                    region.data.concepts.forEach((concept: { name: string; value: number; }) => {
                        const name = concept.name;
                        const value = concept.value.toFixed(4);
                        console.log(`${name}: ${value} BBox: ${topRow}, ${leftCol}, ${bottomRow}, ${rightCol}`);
                    });
                });

            })
            .catch(error => console.log('error', error));
    }

    return (
        <div>
            <h3>Image Detection Aplication</h3>
            <div>
                <input type="text" onChange={(event)=>{setInputValue(event.target.value)}}/>
                <button onClick={handleInput}>Detect</button>
            </div>
        </div>
    )
};

export default ImageForm;