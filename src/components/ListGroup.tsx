import React, { useEffect } from 'react';

function ListGroup() {

    const items = ["New York", "San Francisco", "Tokyo", "London", "Paris"];


    return (
        <>
        {items.length == 0 ? <p>No items found</p> : null}
        <ul className="list-group">
            {items.map(item => <li onClick={() => console.log(item)} className="list-group-item" key={item}>{item}</li>)}
        </ul>
        </>
    )
}

export default ListGroup;