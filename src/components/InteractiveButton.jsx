// Este componente ya no decide por sí mismo, obedece las props.
export default function InteractiveButton({ text, children, isExpanded, onInteraction }) {
  return (
    <button
      type="button"
      // 3. Cuando hay una interacción, solo avisa al componente padre.
      onMouseEnter={onInteraction}
      onFocus={onInteraction}
      onClick={onInteraction}
      aria-label={text}
      aria-expanded={isExpanded}
      className="flex items-center bg-neutral-900 rounded-full transition-all duration-300 ease-in-out text-[#F7D449] hover:shadow-lg hover:shadow-black/20"
    >
      <div className="h-14 w-14 flex-shrink-0 flex items-center justify-center">
        {children}
      </div>
      <div
        // 1. Su apariencia (abierto/cerrado) depende de la prop "isExpanded".
        className={`transition-[max-width] duration-500 ease-in-out overflow-hidden ${
          isExpanded ? 'max-w-xs' : 'max-w-0'
        }`}
        aria-hidden={!isExpanded}
      >
        <span className="pl-2 pr-5 font-semibold whitespace-nowrap text-base">
          {text}
        </span>
      </div>
    </button>
  );
}
