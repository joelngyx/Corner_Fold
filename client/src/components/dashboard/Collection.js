import React, { useEffect, useState } from 'react';
import Add from '../../assets/Add.svg';
import { useDispatch } from 'react-redux';
import { addCollection, decrement } from '../../store/collectionsSlice';

const Collection = (props) => {
  const [add, setAdd] = useState(false);
  const [name, setName] = useState(props.name);
  const [description, setDescription] = useState(props.description);
  const dispatch = useDispatch();

  const handleName = (e) => {
    setName(e.target.value);
  }

  const handleDescription = (e) => {
    setDescription(e.target.value);
  }

  useEffect(() => {
    console.log(`${name}`);
  }, [name])

  if (props.type === 'default') {
    return (
      <div className='collection-item'>
        {(add === true) 
          ? <>
              <div>
                <input placeholder='Name' onChange={handleName} value={name}></input>
                <textarea placeholder='Description' onChange={handleDescription} value={description}></textarea>
                <button onClick={() => {
                  console.log(`added: ${name}, ${description}`);
                  dispatch(addCollection({name, description}));
                  }}>Add</button>
              </div>
              <button onClick={() => {setAdd(!add)}}>Cancel</button>
            </>
          : <>
              <div><img src={Add} /></div>
              <button onClick={() => {setAdd(!add)}}>New</button>
            </>}
      </div>
    );
  } else if (props.type === 'user-collection') {
    return (
      <div className='collection-item'>
        <>
          <div>
            <h1>{props.name}</h1>
            <p>{props.description}</p>
          </div>
          <button>Add Bookmarks</button>
        </>
      </div>
    )
  }
}

export default Collection;