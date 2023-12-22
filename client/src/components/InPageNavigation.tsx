import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  ReactNode,
  useCallback,
} from "react";

type InPageNavigationProps = {
  routes: string[];
  defaultActiveIndex?: number;
  defaultHidden?: string[];
  children: ReactNode;
};

export interface InPageNavigationRef {
  triggerButtonClick: () => void;
}

// eslint-disable-next-line react-refresh/only-export-components
const InPageNavigation = (
  props: InPageNavigationProps,
  ref: React.Ref<InPageNavigationRef>
) => {
  const {
    routes,
    defaultActiveIndex = 0,
    defaultHidden = [],
    children,
  } = props;

  const [inPageNavIndex, setInPageNavIndex] = useState(defaultActiveIndex);
  const activeTabLineRef = useRef<HTMLHRElement | null>(null);
  const activeTabRef = useRef<HTMLButtonElement | null>(null);

  const changePageState = useCallback((btn: HTMLButtonElement, i: number) => {
    const { offsetWidth, offsetLeft } = btn;

    activeTabLineRef.current!.style.width = offsetWidth + "px";
    activeTabLineRef.current!.style.left = offsetLeft + "px";

    setInPageNavIndex(i);
  }, []);

  const triggerButtonClick = useCallback(() => {
    if (activeTabRef.current) {
      activeTabRef.current.click();
    }
  }, [activeTabRef]);

  useImperativeHandle(
    ref,
    () => ({
      triggerButtonClick,
    }),
    [triggerButtonClick]
  );

  return (
    <>
      <div className="relative mb-8 bg-white border-b border-grey flex flex-nowrap overflow-x-auto">
        {routes.map((route, i) => {
          return (
            <button
              ref={i === defaultActiveIndex ? activeTabRef : null}
              key={i}
              onClick={(e) => changePageState(e.target as HTMLButtonElement, i)}
              className={`p-4 px-5 capitalize ${
                inPageNavIndex === i ? "text-black" : "text-dark-grey"
              }
              ${defaultHidden.includes(route) && "md:hidden"}
              `}
            >
              {route}
            </button>
          );
        })}

        <hr ref={activeTabLineRef} className="absolute bottom-0 duration-300" />
      </div>
      {Array.isArray(children) ? children[inPageNavIndex] : children}
    </>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default forwardRef(InPageNavigation);
