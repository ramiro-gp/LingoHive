// Este componente ya no decide por sí mismo, obedece las props.
export default function InteractiveButton({ text, children, isExpanded, onInteraction }) {
  return (
    <div
      // 3. Cuando hay una interacción, solo avisa al componente padre.
      onMouseEnter={onInteraction}
      onFocus={onInteraction}
      tabIndex="0"
      role="button"
      aria-expanded={isExpanded}
      className="cursor-none flex items-center bg-neutral-900 rounded-full transition-all duration-300 ease-in-out text-[#F7D449] hover:shadow-lg hover:shadow-black/20 focus:outline-none"
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
    </div>
  );
}