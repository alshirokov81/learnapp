import {FC} from 'react';

import { OnKlickVoid } from '../types/index';

type DataManagementProps = {
    loadFunc: OnKlickVoid,
    saveFunc: OnKlickVoid,
}

const DataManagement: FC<DataManagementProps> = ({loadFunc, saveFunc}) => {
    return (
        <div>
            <button
                type="button"
                onClick={loadFunc}
            >
                Upload new words
            </button>
            <button
                type="button"
                onClick={saveFunc}
            >
                Save words locally
            </button>
        </div>
    );
}

export default DataManagement
  