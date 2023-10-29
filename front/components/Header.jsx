import React from "react";
import { useGlobalState } from "../context/context";
import { useNavigate } from "react-router-dom";

function Header() {
  const { choice, setChoice } = useGlobalState();
  const navigate = useNavigate();

  //Navega hacia la ruta adecuada segun opcion seleccionada y define opcion(estilos)
  function handleClick(choice) {
    setChoice(choice);
    if (choice == "listaLocal") return navigate("/");
    if (choice == "listaServer") return navigate("/server");
    return;
  }

  return (
    <header>
      <h3>Trabajo Final Argentina Programa</h3>
      <div className="choice-div">
        <p
          onClick={() => handleClick("listaLocal")}
          className={choice == "listaLocal" ? "local-choice choice-menu" : "choice-menu"}
        >
          Local Storage
        </p>
        <p className="separator-p"></p>
        <p
          onClick={() => handleClick("listaServer")}
          className={choice == "listaServer" ? "server-choice choice-menu" : "choice-menu"}
        >
          Node Server
        </p>
      </div>
    </header>
  );
}

export default Header;
