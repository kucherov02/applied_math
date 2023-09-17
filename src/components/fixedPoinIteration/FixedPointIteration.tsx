import React, {useState} from 'react';
import X0_input from "../../components/fixedPoinIteration/X0_array";
import Matrix from "../../components/fixedPoinIteration/Matrix"

const FixedPointIteration = () => {
    const [x0, setX0] = useState([]);

    return (
        <div>
            <X0_input size={5} setX0={setX0}/>
             <Matrix cols={5} rows={4} x0={x0} />
        </div>
    );
};

export default FixedPointIteration;
