import './ImageForm.css'

interface ImageFormProps {
    setImagePosition: React.Dispatch<React.SetStateAction<{ top: number; left: number; bottom: number; right: number; }>>;
    inputValue: string,
    setInputValue: React.Dispatch<React.SetStateAction<string>>;
}

const ImageForm: React.FC<ImageFormProps> = (props) => {

    //Call api with image url
    function handleInput(){
        console.log(props.inputValue)
        const PAT = '1560b6cd9e6e4b48ad49a739f55f09c6';
        const USER_ID = 'borgesgabriel';
        const APP_ID = 'SmartBrain';
        const MODEL_ID = 'face-detection';
        const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';
        const IMAGE_URL = props.inputValue;

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

                regions.forEach((region: { region_info: { bounding_box: BoundingBox; }; data: { concepts: { name: number; value: number; }[]; }; }) => {
                    const boundingBox = region.region_info.bounding_box;
                    const topRow = boundingBox.top_row.toFixed(3);
                    const leftCol = boundingBox.left_col.toFixed(3);
                    const bottomRow = boundingBox.bottom_row.toFixed(3);
                    const rightCol = boundingBox.right_col.toFixed(3);

                    props.setImagePosition(createImageBox(Number(topRow), Number(leftCol), Number(bottomRow), Number(rightCol)))

                    //Console das Posições
                    /*region.data.concepts.forEach((concept: { name: number; value: number; }) => {
                        const name = concept.name;
                        const value = concept.value.toFixed(4);
                        //console.log(`${name}: ${value} BBox: ${topRow}, ${leftCol}, ${bottomRow}, ${rightCol}`);
                        props.setImagePosition(createImageBox(Number(topRow), Number(leftCol), Number(bottomRow), Number(rightCol)))
                    });*/
                });

            })
            .catch(error => console.log('error', error));
    }

    //Criar objeto com as posicoes 
    function createImageBox(top: number, left: number, bottom: number, right: number){
        const image = document.getElementById('image');
        const width = image?.clientWidth || 0
        const height = image?.clientHeight || 0
        console.log(top)
        return {
            top: top * height,
            left: left * width,
            bottom: height - (bottom * height), 
            right: width - (right * width)
        }
    }

    return (
        <div className="flex flex-col items-center gap-3">
            <h3 className="text-base">Please insert your image URL here:</h3>
            <div className=" flex justify-center w-screen items-center">
                <input id="inputUrl" className="w-2/5 min-w-96 h-14 p-6  border-2 text-center" type="text" onChange={(event)=>{props.setInputValue(event.target.value)}}/>
                <button id="buttonDetectUrl" className="bg-orange-500 py-4 px-10 text-white font-semibold" onClick={handleInput}>Detect</button>
            </div>
        </div>
    )
};

export default ImageForm;