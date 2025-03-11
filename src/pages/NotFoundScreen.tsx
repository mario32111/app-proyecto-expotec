import NotFoundGif from "../assets/404.gif"; // Ajusta la ruta según la ubicación del GIF

const NotFound = () => {
    return (
        <div
            style={{
                position: "relative",
                width: "100vw",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
            }}
        >
            {/* Imagen del GIF como fondo */}
            <img
                src={NotFoundGif}
                alt="Página no encontrada"
                style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    zIndex: -1,
                }}
            />

            {/* Texto superpuesto */}
            <h1
                style={{
                    position: "relative",
                    zIndex: 1,
                    color: "white",
                    fontSize: "clamp(2rem, 10vw, 5rem)", // Tamaño de fuente responsive
                    fontWeight: "bold",
                    textShadow: "2px 2px 8px rgba(0, 0, 0, 0.8)", // Sombra para mejorar la legibilidad
                }}
            >
                404 - Página no encontrada
            </h1>
        </div>
    );
};

export default NotFound;
