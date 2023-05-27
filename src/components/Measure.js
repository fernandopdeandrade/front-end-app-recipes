import React from "react";

function Measure({
    setStrMeasure1,
    setStrMeasure2,
    setStrMeasure3,
    setStrMeasure4,
    setStrMeasure5,
    setStrMeasure6,
    setStrMeasure7,
    setStrMeasure8,
    setStrMeasure9,
    setStrMeasure10,
    setStrMeasure11,
    setStrMeasure12,
    setStrMeasure13,
    setStrMeasure14,
    setStrMeasure15,
    setStrMeasure16,
    setStrMeasure17,
    setStrMeasure18,
    setStrMeasure19,
    setStrMeasure20,
}) {
    return (<>
        <h2>Medidas dos ingredientes</h2>
        <input
            type="text"
            placeholder="Medida 1..."
            onChange={(event) => setStrMeasure1(event.target.value)}
        />
        <input
            type="text"
            placeholder="Medida 2..."
            onChange={(event) => setStrMeasure2(event.target.value)}
        />
        <input
            type="text"
            placeholder="Medida 3..."
            onChange={(event) => setStrMeasure3(event.target.value)}
        />
        <input
            type="text"
            placeholder="Medida 4..."
            onChange={(event) => setStrMeasure4(event.target.value)}
        />
        <input
            type="text"
            placeholder="Medida 5..."
            onChange={(event) => setStrMeasure5(event.target.value)}
        />
        <input
            type="text"
            placeholder="Medida 6..."
            onChange={(event) => setStrMeasure6(event.target.value)}
        />
        <input
            type="text"
            placeholder="Medida 7..."
            onChange={(event) => setStrMeasure7(event.target.value)}
        />
        <input
            type="text"
            placeholder="Medida 8..."
            onChange={(event) => setStrMeasure8(event.target.value)}
        />
        <input
            type="text"
            placeholder="Medida 9..."
            onChange={(event) => setStrMeasure9(event.target.value)}
        />
        <input
            type="text"
            placeholder="Medida 10..."
            onChange={(event) => setStrMeasure10(event.target.value)}
        />
        <input
            type="text"
            placeholder="Medida 11..."
            onChange={(event) => setStrMeasure11(event.target.value)}
        />
        <input
            type="text"
            placeholder="Medida 12..."
            onChange={(event) => setStrMeasure12(event.target.value)}
        />
        <input
            type="text"
            placeholder="Medida 13..."
            onChange={(event) => setStrMeasure13(event.target.value)}
        />
        <input
            type="text"
            placeholder="Medida 14..."
            onChange={(event) => setStrMeasure14(event.target.value)}
        />
        <input
            type="text"
            placeholder="Medida 15..."
            onChange={(event) => setStrMeasure15(event.target.value)}
        />
        <input
            type="text"
            placeholder="Medida 16..."
            onChange={(event) => setStrMeasure16(event.target.value)}
        />
        <input
            type="text"
            placeholder="Medida 17..."
            onChange={(event) => setStrMeasure17(event.target.value)}
        />
        <input
            type="text"
            placeholder="Medida 18..."
            onChange={(event) => setStrMeasure18(event.target.value)}
        />
        <input
            type="text"
            placeholder="Medida 19..."
            onChange={(event) => setStrMeasure19(event.target.value)}
        />
        <input
            type="text"
            placeholder="Medida 20..."
            onChange={(event) => setStrMeasure20(event.target.value)}
        />
    </>
    )
}

export default Measure;
