import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getTemperaments } from "../redux/actions/actions";
import { createDog } from "../redux/actions/actions";
import s from "./styles/Form.module.css";
import { Link } from "react-router-dom";
import left from "../img/left.png";
import { v4 as uuid } from 'uuid';

function Form(props) {
  const unique_id = uuid();
  const small_id = unique_id.slice(0,8)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [error, setError] = useState({});
  const [image, setImage] = useState();

  useEffect(() => {
    dispatch(getTemperaments());
    props.funcNav(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);
  const temperaments = useSelector((state) => state.temperaments);

  const [newDog, setNewDog] = useState({
    name: "",
    image: "",
    temperament: '',
    maxWeight: "",
    minWeight: "",
    maxHeight: "",
    minHeight: "",
    minLife: "",
    maxLife: "",
  });

  //----------------------------  H A N D L E R S
  const createBtn = () => { 
    let test = Object.keys(newDog).map( (key) => {return newDog[key]})
    let complete = test.some(e => e.length !== 0);
    /* console.log(error); */
    
    return complete;
}

  const handleChange = (e) => {
    setNewDog({
      ...newDog,
      [e.target.name]: e.target.value,
    });
    setError(
      validate({
        ...newDog,
        [e.target.name]: e.target.value,
      })
    );
  };
  const handleTemperamentChange = (e) => {
    if (newDog.temperament.includes(e.target.value)) return;
    setNewDog({
      ...newDog,
      temperament: [...newDog.temperament, e.target.value],
    });
  };
  const handleTemperamentDelete = (e) => {
    let array = newDog.temperament.filter(
      (temperament) => temperament !== e.target.innerHTML
    );
    setNewDog({
      ...newDog,
      temperament: array,
    });
  };
  const handleNewDog = (e) => {
    e.preventDefault();
    if (Object.keys(error).length > 0) {
      alert("Complete the fields correctly");
    } else {
      
      const definitiveDog = {
        ...newDog,
        weight: `${newDog.minWeight} - ${newDog.maxWeight}`,
        height: `${newDog.minHeight} - ${newDog.maxHeight}`,
        life_span: `${newDog.minLife} - ${newDog.maxLife} years`,
      };
      dispatch(createDog(definitiveDog));
      alert("Your dog has been added successfully!");
      setTimeout(() => {
        navigate("/home");
      }, 500);
    }
  };
  const changePicture = (e) => {
    e.preventDefault(e);
    setImage(!image);
  };
  //---------------------------- V A L I D A T I O N S
  function validate(newDog) {
    let error = {};

    //--------------------------- name
    if (!newDog.name.length) error.name = "*";
    if (newDog.name.length < 3) error.name = "*3 characters min.";
    if (newDog.name.length > 20) error.name = "*20 characters max.";
    if (!newDog.name) error.name = "*Your dog needs a name";
    
    //---------------------------- temperament  
    if (!newDog.temperament.length) error.temperament = "*Add at least one temperament";
    //--------------------------- height
    if (Number(newDog.minHeight) < 20)
      error.minHeight = "*20 is the min. value";
    if (Number(newDog.minHeight) > Number(newDog.maxHeight))
      error.minHeight = "*Error: min. height is higher than the max. height";
    if (Number(newDog.maxHeight) > 146)
      error.maxHeight = "*The tallest dog in the world is 1.046 meters";
    if (Number(newDog.height) > 5) error.height = "*5 is the max. height";
    //--------------------------- weight
    if (Number(newDog.minWeight) < 8)
      error.minWeight = "*Valor min a partir de 8";
    if (Number(newDog.minWeight) > Number(newDog.maxWeight))
      error.minWeight = "*Error: min. weight is higher than max. weight.";
    if (Number(newDog.maxWeight) > 100)
      error.maxWeight = "*Does your dog really weight 100kg?";

    //---------------------------- life_span
    if (Number(newDog.minLife) <= 1) error.minLife = "*2 is the min. value";
    if (Number(newDog.maxLife) > 20) error.maxLife = "*20 is the max. value";
    if (Number(newDog.minLife) > Number(newDog.maxLife))
      error.minLife = "*Error: min. value higher than max. value0";


    //---------------------------- image
    if (newDog.image.length < 1) error.image = "*Please, add an image";
    if (!newDog.image.includes("https://"))
      error.image = "*It must begin with 'https://'";

    return error;
  }
  return (
    <>
      <Link to="/home">
        <div className={s.goBackBody}>
          <img className={s.left} src={left} alt="left" />
        </div>
      </Link>
      <form onSubmit={(e) => handleNewDog(e)} className={s.holdPlace}>
        <div className={s.body}>
          <div className={s.cardBody}>
            <div className={s.card}>
              <div className={s.name}>
                <input
                  className={s.nameInput}
                  onChange={(e) => handleChange(e)}
                  type="string"
                  autoComplete="off"
                  value={newDog.name}
                  placeholder="Doggo Exampler"
                  name="name"
                />
                {error.name && <p className={s.nameAlert}>{error.name}</p>}
              </div>

              <div className={s.dogImage}>
                <div className={s.imageInput}>
                  <div>
                    {image === true ? (
                      <div>
                        <img
                          className={s.newDogImg}
                          src={newDog.image}
                          alt="newDog"
                        />
                        <button
                          className={s.changePicture}
                          onClick={changePicture}
                        >
                          Change image
                        </button>
                      </div>
                    ) : (
                      <div className={s.imageUrl}>
                        <input
                          className={s.inputBorder}
                          onChange={(e) => handleChange(e)}
                          type="string"
                          value={newDog.image}
                          placeholder="http://doggo.com/happydoggo.jpg"
                          name="image"
                        />
                        <button
                          className={s.previewBtn}
                          onClick={changePicture}
                        >
                          Preview
                        </button>
                        {error.image && (
                          <p className={s.imgAlert}>{error.image}</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className={s.order}>
                <div className={s.bodyTemperaments}>
                  <select
                  /* multiple={false} */
                    className={s.inputTemperaments}
                    onChange={(e) => handleTemperamentChange(e)}
                    type="string"
                    value={newDog.temperament}
                    name="temperament"
                  >
                    <option className={s.tempOption} value="DEFAULT">
                      Temperaments
                    </option>
                    {temperaments &&
                      temperaments.map((p) => {
                        return (
                          <option key={small_id + Math.random()} value={p.name}>
                            {p.name}
                          </option>
                        );
                      })}
                  </select >
                  {error.temperament && (
                    <p className={s.temperamentAlert}>{error.temperament}</p>
                  )}
                  <div className={s.tempList}>
                    {newDog.temperament.length > 0 &&
                      newDog.temperament.map((p) => (
                        <div key={p}>
                          <p
                            className={s.tempUnit}
                            
                            onClick={(e) => handleTemperamentDelete(e)}
                          >
                            {p}
                          </p>
                        </div>
                      ))}
                  </div>
                </div>

                <div className={s.bodyWeight}>
                  <h3 className={s.h3}>Weight</h3>
                  <div className={s.weightBody}>
                    <div className={s.inputPosition}>
                      <input
                        type="number"
                        className={s.inputWeight}
                        value={newDog.minWeight}
                        onChange={(e) => handleChange(e)}
                        placeholder="Min"
                        name="minWeight"
                      />
                      -
                      <input
                        type="number"
                        className={s.inputWeight}
                        value={newDog.maxWeight}
                        onChange={(e) => handleChange(e)}
                        placeholder="Max"
                        name="maxWeight"
                      />
                    </div>
                  </div>
                  {error.minWeight && (
                    <p className={s.weightAlert}>{error.minWeight}</p>
                  )}
                  {error.maxWeight && (
                    <p className={s.weightAlert}>{error.maxWeight}</p>
                  )}
                  <p className={s.weight}></p>
                </div>

                <div className={s.bodyHeight}>
                  <h3 className={s.h3}>Height</h3>
                  <div className={s.heightBody}>
                    <input
                      type="number"
                      className={s.inputWeight}
                      value={newDog.minHeight}
                      onChange={(e) => handleChange(e)}
                      placeholder="Min"
                      name="minHeight"
                    />
                    -
                    <input
                      type="number"
                      className={s.inputWeight}
                      value={newDog.maxHeight}
                      onChange={(e) => handleChange(e)}
                      placeholder="Max"
                      name="maxHeight"
                    />
                  </div>
                  {error.minHeight && (
                    <p className={s.heightAlert}>{error.minHeight}</p>
                  )}
                  {error.maxHeight && (
                    <p className={s.heightAlert}>{error.maxHeight}</p>
                  )}
                  <p className={s.height}></p>
                </div>
                <div className={s.bodyLifeSpan}>
                  <h3 className={s.h3}>Lifespan</h3>
                  <div className={s.heightBody}>
                    <input
                      type="number"
                      className={s.inputWeight}
                      value={newDog.minLife}
                      onChange={(e) => handleChange(e)}
                      placeholder="Min"
                      name="minLife"
                    />
                    -
                    <input
                      type="number"
                      className={s.inputWeight}
                      value={newDog.maxLife}
                      onChange={(e) => handleChange(e)}
                      placeholder="Max"
                      name="maxLife"
                    />
                    {error.life_span && (
                      <p className={s.alert}>{error.life_span}</p>
                    )}
                  </div>
                  {error.minLife && (
                    <p className={s.lifeAlert}>{error.minLife}</p>
                  )}
                  {error.maxLife && (
                    <p className={s.lifeAlert}>{error.maxLife}</p>
                  )}
                  <p className={s.lifeSpan}></p>
                </div>
              </div>
              <div className={s.createWrapper}>
              {createBtn() ?  (<button className={s.createBtn} type="submit" value="Submit">
                  Add dog
                </button>) : (<button className={s.createBtn} type="submit" value="Submit" disabled>
                  Add dog
                </button>)}
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
export default Form;
