import React from "react";

export default function UserMenu({ page, setPage, submenuOpen, setSubmenuOpen }) {
  return (
    <nav className="menu-principal">
      <ul>
        <li className="submenu-contenedor">
          <span
            className="btn-submenu"
            onClick={() => setSubmenuOpen((o) => !o)}
          >
            Nuevo Usuarios
          </span>
          <ul className={`submenu ${submenuOpen ? "activo" : ""}`}>
            <li
              onClick={() => {
                setPage("administrativo");
                setSubmenuOpen(false);
              }}
            >
              Administrativo
            </li>
            <li
              onClick={() => {
                setPage("personal");
                setSubmenuOpen(false);
              }}
            >
              Personal
            </li>
            <li
              onClick={() => {
                setPage("estudiante");
                setSubmenuOpen(false);
              }}
            >
              Estudiante
            </li>
          </ul>
        </li>
        <li onClick={() => setPage("registrados")}>Usuarios registrados</li>
        <li onClick={() => setPage("invitado")}>Invitado</li>
      </ul>
    </nav>
  );
}
