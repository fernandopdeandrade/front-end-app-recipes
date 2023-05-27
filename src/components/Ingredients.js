import React from "react";

function Ingredients({
    setStr1,
    setStr2,
    setStr3,
    setStr4,
    setStr5,
    setStr6,
    setStr7,
    setStr8,
    setStr9,
    setStr10,
    setStr11,
    setStr12,
    setStr13,
    setStr14,
    setStr15,
    setStr16,
    setStr17,
    setStr18,
    setStr19,
    setStr20,
}) {
    return (<>
        <h2>Ingredients</h2>
        <input
            type="text"
            placeholder="Ingrediente 1..."
            onChange={(event) => setStr1(event.target.value)}
        />
        <input
            type="text"
            placeholder="Ingrediente 2..."
            onChange={(event) => setStr2(event.target.value)}
        />
        <input
            type="text"
            placeholder="Ingrediente 3..."
            onChange={(event) => setStr3(event.target.value)}
        />
        <input
            type="text"
            placeholder="Ingrediente 4..."
            onChange={(event) => setStr4(event.target.value)}
        />
        <input
            type="text"
            placeholder="Ingrediente 5..."
            onChange={(event) => setStr5(event.target.value)}
        />
        <input
            type="text"
            placeholder="Ingrediente 6..."
            onChange={(event) => setStr6(event.target.value)}
        />
        <input
            type="text"
            placeholder="Ingrediente 7..."
            onChange={(event) => setStr7(event.target.value)}
        />
        <input
            type="text"
            placeholder="Ingrediente 8..."
            onChange={(event) => setStr8(event.target.value)}
        />
        <input
            type="text"
            placeholder="Ingrediente 9..."
            onChange={(event) => setStr9(event.target.value)}
        />
        <input
            type="text"
            placeholder="Ingrediente 10..."
            onChange={(event) => setStr10(event.target.value)}
        />
        <input
            type="text"
            placeholder="Ingrediente 11..."
            onChange={(event) => setStr11(event.target.value)}
        />
        <input
            type="text"
            placeholder="Ingrediente 12..."
            onChange={(event) => setStr12(event.target.value)}
        />
        <input
            type="text"
            placeholder="Ingrediente 13..."
            onChange={(event) => setStr13(event.target.value)}
        />
        <input
            type="text"
            placeholder="Ingrediente 14..."
            onChange={(event) => setStr14(event.target.value)}
        />
        <input
            type="text"
            placeholder="Ingrediente 15..."
            onChange={(event) => setStr15(event.target.value)}
        />
        <input
            type="text"
            placeholder="Ingrediente 16..."
            onChange={(event) => setStr16(event.target.value)}
        />
        <input
            type="text"
            placeholder="Ingrediente 17..."
            onChange={(event) => setStr17(event.target.value)}
        />
        <input
            type="text"
            placeholder="Ingrediente 18..."
            onChange={(event) => setStr18(event.target.value)}
        />
        <input
            type="text"
            placeholder="Ingrediente 19..."
            onChange={(event) => setStr19(event.target.value)}
        />
        <input
            type="text"
            placeholder="Ingrediente 20..."
            onChange={(event) => setStr20(event.target.value)}
        />
    </>
    )
}

export default Ingredients;
