import createGlobe from "cobe";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn, verificarAceleracionHardware } from "../lib/utils";

const GLOBE_CONFIG = {
  width: 1000,
  height: 1000,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 0, // 0 para modo claro
  diffuse: 0.4,
  mapSamples: 16000,
  mapBrightness: 1.2,
  // 1. Color del mundo y su brillo ajustado a #F7D449
  baseColor: [0.97, 0.83, 0.28], 
  glowColor: [0.97, 0.83, 0.28],
  markerColor: [251 / 255, 100 / 255, 21 / 255], // Este color ya no se usa, pero lo dejo
  markers: [], 
};

export function Globe({
  className = "",
  config = GLOBE_CONFIG,
}) {
  const [soporteHardware, setSoporteHardware] = useState(null);

  // useEffect para hacer la verificación.
  useEffect(() => {
    const tieneSoporte = verificarAceleracionHardware();
    // console.log("Soporte de Hardware:", tieneSoporte);
    setSoporteHardware(tieneSoporte);
  }, []);

  // Si aún no verificó, no muestra nada.
  if (soporteHardware === null) {
    return null;
  }

  // Si está DESACTIVADO el acelerador por hardware, no se muestra el globo.
  return soporteHardware ? (
    <GloboInteractivo className={className} config={config} />
  ) : null;
}

const GloboInteractivo = ({
  className = "",
  config = GLOBE_CONFIG,
}) => {
  let phi = 0;
  let width = 0;
  const canvasRef = useRef(null);
  const pointerInteracting = useRef(null);
  const pointerInteractionMovement = useRef(0);
  const [r, setR] = useState(0);

  const updatePointerInteraction = (value) => {
    pointerInteracting.current = value;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value ? "grabbing" : "grab";
    }
  };

  const updateMovement = (clientX) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current;
      pointerInteractionMovement.current = delta;
      setR(delta / 200);
    }
  };

  const onRender = useCallback(
    (state) => {
      if (!pointerInteracting.current) phi += 0.005;
      state.phi = phi + r;
      state.width = width * 2;
      state.height = width * 2;
    },
    [r],
  );

  const onResize = () => {
    if (canvasRef.current) {
      width = canvasRef.current.offsetWidth;
    }
  };

  useEffect(() => {
    window.addEventListener("resize", onResize);
    onResize();

    const globe = createGlobe(canvasRef.current, {
      ...config,
      width: width * 2,
      height: width * 2,
      onRender,
    });

    setTimeout(() => (canvasRef.current.style.opacity = "1"), 500);
    return () => globe.destroy();
  }, []);

  return (
    <div className={cn("aspect-square h-full w-full", className)}>
      <canvas
        className={cn(
          "size-full opacity-0 transition-opacity duration-500 [contain:layout_paint_size]",
        )}
        ref={canvasRef}
        onPointerDown={(e) =>
          updatePointerInteraction(
            e.clientX - pointerInteractionMovement.current,
          )
        }
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) =>
          e.touches[0] && updateMovement(e.touches[0].clientX)
        }
      />
    </div>
  );
}